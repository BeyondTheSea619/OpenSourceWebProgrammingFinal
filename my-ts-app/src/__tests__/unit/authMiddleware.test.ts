import {
  authenticateToken,
  authorizeAdmin,
} from "../../presentation/middleware/authMiddleware";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

process.env.JWT_SECRET = "testsecret";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

describe("Auth Middleware", () => {
  it("should return 401 if no token provided", () => {
    const req = { headers: {} } as Request;
    const res = mockResponse();
    authenticateToken(req as any, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Access token required" });
  });

  it("should return 403 if token is invalid", () => {
    const req = {
      headers: { authorization: "Bearer invalidtoken" },
    } as Request;
    const res = mockResponse();
    authenticateToken(req as any, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("should call next if token is valid", () => {
    const token = jwt.sign({ id: "1", role: "user" }, "testsecret");
    const req = { headers: { authorization: `Bearer ${token}` } } as Request;
    const res = mockResponse();
    const next = jest.fn();
    authenticateToken(req as any, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return 403 if user is not admin", () => {
    const req = { user: { id: "1", role: "user" } } as any;
    const res = mockResponse();
    authorizeAdmin(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Admin access required" });
  });

  it("should call next if user is admin", () => {
    const req = { user: { id: "1", role: "admin" } } as any;
    const res = mockResponse();
    const next = jest.fn();
    authorizeAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
