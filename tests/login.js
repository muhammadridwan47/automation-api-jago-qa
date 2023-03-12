const url = "http://barru.pythonanywhere.com";
const domain = require("supertest")(url);
const validasi = require("chai").expect;

describe("Scenario Login Feature", () => {
  it("Verify Success Login with valid email and password", async () => { 
    const response = await domain 
      .post("/login")
      .send({ email: "jokotampan900@gmail.com", password: "jokotampan900" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('SUCCESS_LOGIN');
    validasi(response.body.message).to.eql('Anda Berhasil Login');
    validasi(response.body).to.include.keys("data", "message", "status", "credentials"); 
  });

  it("Verify Failed Login with valid email and wrong password", async () => { 
    const response = await domain 
      .post("/login")
      .send({ email: "jokotampan900@gmail.com", password: "wrong password" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Email atau Password Anda Salah');
    validasi(response.body).to.include.keys("data", "message", "status"); 
  });

  it("Verify Failed Login with invalid email and valid password", async () => { 
    const response = await domain 
      .post("/login")
      .send({ email: "jokotampan900", password: "jokotampan900" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(response.body).to.include.keys("data", "message", "status"); 
  });

  it("Verify Failed Login with valid email and empty password", async () => { 
    const response = await domain 
      .post("/login")
      .send({ email: "jokotampan900@gmail.com", password: "" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Email atau Password Anda Salah');
    validasi(response.body.data).to.eql("User's not found"); 
  });

  it("Verify Failed Login with empty email and valid password", async () => { 
    const response = await domain 
      .post("/login")
      .send({ email: "", password: "jokotampan900" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(response.body.data).to.eql("Email tidak valid"); 
  });

  it("Verify Failed Login with empty email and empty password", async () => { 
    const response = await domain 
      .post("/login")
      .send({ email: "", password: "" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(response.body.data).to.eql("Email tidak valid"); 
  });

  it("Verify Failed Login with Account is not registered", async () => { 
    const response = await domain 
      .post("/login")
      .send({ email: "dummy@gmail.com", password: "dummy123" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql("FAILED_LOGIN");
    validasi(response.body.message).to.eql('Email atau Password Anda Salah');
    validasi(response.body.data).to.eql("User's not found"); 
  });
});