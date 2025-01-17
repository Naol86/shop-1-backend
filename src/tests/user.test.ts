import request from "supertest";
import app from "../app";
import { User } from "../models/user.model";
import { sequelize } from "../config/database";

beforeAll(async () => {
  // Sync database before running tests
  await sequelize.sync({ force: true });
  console.log("synced database");
});

afterAll(async () => {
  // Close the database connection after tests
  await sequelize.close();
  console.log("closed database");
});

describe("User API - TDD Example", () => {
  it("should create a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const response = await request(app).post("/api/users").send(userData);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.name).toBe(userData.name);
    expect(response.body.data.email).toBe(userData.email);
    expect(response.body.data).not.toHaveProperty("password");
  });

  it("should return 400 if email is missing", async () => {
    const userData = {
      name: "John Doe",
      password: "password123",
    };

    const response = await request(app).post("/api/users").send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email is required");
  });
});
