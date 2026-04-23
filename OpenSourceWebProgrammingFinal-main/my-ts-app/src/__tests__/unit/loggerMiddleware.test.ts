import { loggerMiddleware } from "../../presentation/middleware/loggerMiddleware";
import { Request, Response, NextFunction } from "express";

describe("Logger Middleware", () => {
  it("should log the request and call next", () => {
    const req = { method: "GET", url: "/equipment" } as Request;
    const res = {} as Response;
    const next: NextFunction = jest.fn();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    loggerMiddleware(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
