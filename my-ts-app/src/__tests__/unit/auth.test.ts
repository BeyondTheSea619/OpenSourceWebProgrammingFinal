import { registerUser } from "../../application/use-cases/registerUser";
import { loginUser } from "../../application/use-cases/loginUser";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { Customer } from "../../domain/entities/Customer";
import bcrypt from "bcryptjs";

const hashedPassword = bcrypt.hashSync("password123", 10);

const mockCustomer: Customer = {
  id: "1",
  name: "Test User",
  email: "test@gmail.com",
  password: hashedPassword,
  role: "user",
};

const mockRepository: ICustomerRepository = {
  findAll: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue(mockCustomer),
  findByEmail: jest.fn().mockResolvedValue(null),
  create: jest.fn().mockResolvedValue(mockCustomer),
  update: jest.fn().mockResolvedValue(mockCustomer),
  delete: jest.fn().mockResolvedValue(true),
};

process.env.JWT_SECRET = "testsecret";

describe("Auth Use Cases", () => {
  it("should register a new user", async () => {
    const result = await registerUser(
      mockRepository,
      "Test User",
      "test@gmail.com",
      "password123",
    );
    expect(result).toEqual(mockCustomer);
    expect(mockRepository.create).toHaveBeenCalled();
  });

  it("should throw error if email already in use", async () => {
    (mockRepository.findByEmail as jest.Mock).mockResolvedValueOnce(
      mockCustomer,
    );
    await expect(
      registerUser(
        mockRepository,
        "Test User",
        "test@gmail.com",
        "password123",
      ),
    ).rejects.toThrow("Email already in use");
  });

  it("should login and return a token", async () => {
    (mockRepository.findByEmail as jest.Mock).mockResolvedValueOnce(
      mockCustomer,
    );
    const token = await loginUser(
      mockRepository,
      "test@gmail.com",
      "password123",
    );
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  it("should throw error for invalid email", async () => {
    (mockRepository.findByEmail as jest.Mock).mockResolvedValueOnce(null);
    await expect(
      loginUser(mockRepository, "wrong@gmail.com", "password123"),
    ).rejects.toThrow("Invalid email or password");
  });

  it("should throw error for wrong password", async () => {
    (mockRepository.findByEmail as jest.Mock).mockResolvedValueOnce(
      mockCustomer,
    );
    await expect(
      loginUser(mockRepository, "test@gmail.com", "wrongpassword"),
    ).rejects.toThrow("Invalid email or password");
  });
});
