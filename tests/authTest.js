// tests/auth.test.js
const request = require("supertest");
const app = require("../app");
const User = require("../model/userSchema");

describe("User Authentication", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  test("Register user", async () => {
    const response = await request(app).post("/api/user/register").send({
      name: "try",
      email: "try@gmail.com",
      phone: "1234567890",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
