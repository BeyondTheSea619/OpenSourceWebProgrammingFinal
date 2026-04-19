import { register, login } from "../../presentation/controllers/authController";
import { Request, Response } from "express";

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../../infrastructure/repositories/CustomerRepository", () => ({
  CustomerRepository: jest.fn().mockImplementation(() => ({
    findByEmail: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      id: "1",
      name: "Test",
      email: "test@gmail.com",
      password: "hashed",
      role: "user",
    }),
  })),
}));

process.env.JWT_SECRET = "testsecret";

describe("Auth Controller", () => {
  it("should register a user successfully", async () => {
    const req = {
      body: {
        name: "Test",
        email: "test@gmail.com",
        password: "password123",
        role: "user",
      },
    } as Request;
    const res = mockRes();
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should return 400 if registration fails", async () => {
    const req = {
      body: { name: "Test", email: "test@gmail.com", password: "password123" },
    } as Request;
    const res = mockRes();
    jest
      .spyOn(
        require("../../application/use-cases/registerUser"),
        "registerUser",
      )
      .mockRejectedValueOnce(new Error("Email already in use"));
    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 401 if login fails", async () => {
    const req = {
      body: { email: "wrong@gmail.com", password: "wrongpass" },
    } as Request;
    const res = mockRes();
    jest
      .spyOn(require("../../application/use-cases/loginUser"), "loginUser")
      .mockRejectedValueOnce(new Error("Invalid email or password"));
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
