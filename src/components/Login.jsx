import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) newErrors.email = "Geçerli bir email girin.";
    if (!validatePassword(password)) newErrors.password = "Şifre en az 8 karakter, 1 büyük harf ve 1 sayı içermelidir.";
    if (!agree) newErrors.agree = "Şartları kabul etmelisiniz.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/success");
    }
  };

  const isFormValid = validateEmail(email) && validatePassword(password) && agree;

  return (
    <div className="login-container">
      <h2>Login Sayfası</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          Şartları kabul ediyorum
        </label>
        {errors.agree && <p className="error">{errors.agree}</p>}

        <button type="submit" disabled={!isFormValid}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default Login;
