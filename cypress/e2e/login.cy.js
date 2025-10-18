describe("Login Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı form doldurulduğunda success sayfasına yönlendirir", () => {
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("Password1");
    cy.get('input[type="checkbox"]').check();
    cy.get("button").should("not.be.disabled").click();

    cy.url().should("include", "/success");
  });
  it("Yanlış email girildiğinde 1 hata mesajı gösterilir ve buton disabled kalır", () => {
    cy.get('input[type="email"]').type("yanlisemail");
    cy.get('input[type="password"]').type("Password1");
    cy.get('input[type="checkbox"]').check();

    cy.get("form").submit();

    cy.contains("Geçerli bir email girin.").should("be.visible");
    cy.get("button").should("be.disabled");
  });

  it("Email ve password yanlış girildiğinde 2 hata mesajı görünür ve buton disabled kalır", () => {
    cy.get('input[type="email"]').type("yanlis");
    cy.get('input[type="password"]').type("kisa");
    cy.get('input[type="checkbox"]').check();

    cy.get("form").submit();

    cy.contains("Geçerli bir email girin.").should("be.visible");
    cy.contains("Şifre en az 8 karakter, 1 büyük harf ve 1 sayı içermelidir.").should("be.visible");
    cy.get("button").should("be.disabled");
  });

  it("Email ve password doğru ama şartlar kabul edilmemişse buton disabled olur", () => {
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("Password1");

    cy.get("button").should("be.disabled");
  });
});
