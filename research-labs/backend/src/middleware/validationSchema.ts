import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const registrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be 3-30 characters")
    .max(30, "Username must be 3-30 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
  email: z
    .string()
    .email("Invalid email address"),
  password_hash: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name cannot exceed 50 characters"),
  last_name: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  role: z
    .string()
    .default('GUEST'),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
    .optional(),
  affiliation: z
    .string()
    .optional(),
  bio: z
    .string()
    .optional(),
  profileImage: z.any().optional(),
  photo_url: z.any().optional(),
  document: z.any().optional(),
});

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "email address or username required"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be 3-30 characters")
    .max(30, "Username must be 3-30 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
  email: z
    .string()
    .email("Invalid email address"),
  password_hash: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  role: z
    .string()
    .default('GUEST'),
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
    .optional(),
  affiliation: z
    .string()
    .optional(),
  bio: z
    .string()
    .optional(),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be 3-30 characters")
    .max(30, "Username must be 3-30 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric")
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .optional(),
  password_hash: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .optional(),
  role: z
    .string()
    .optional(),
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters")
    .optional(),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters")
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format")
    .optional(),
  affiliation: z
    .string()
    .optional(),
  bio: z
    .string()
    .optional(),

  photo_url: z
    .string()
    .optional(),
});

export type CreateGroupInput = z.infer<typeof createGroupSchema>;
export type UpdateGroupInput = z.infer<typeof updateGroupSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;

export const createGroupSchema = z.object({
  title: z
    .string()
    .min(3, "Group title must be at least 3 characters")
    .max(100, "Group title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Group description must be at least 10 characters")
    .max(500, "Group description cannot exceed 500 characters"),
});

export const updateGroupSchema = z.object({
  title: z
    .string()
    .min(3, "Group title must be at least 3 characters")
    .max(100, "Group title cannot exceed 100 characters")
    .optional(),
  description: z
    .string()
    .min(10, "Group description must be at least 10 characters")
    .max(500, "Group description cannot exceed 500 characters")
    .optional(),
  status: z
    .string()
    .refine(
      (val) => ['ONGOINING', 'SUSPENDED', 'FINISHED', 'DELETED'].includes(val),
      "Invalid status value"
    )
    .optional(),
});

export const addMemberSchema = z.object({
  userId: z
    .string()
    .uuid("Invalid user ID format"),
});

export const uuidParamSchema = z.object({
  id: z
    .string()
    .uuid("Invalid UUID format"),
});

export const validate =
  <T extends z.ZodTypeAny>(schema: T) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body) as z.infer<T>;
        next();
      } catch (err) {
        if (err instanceof z.ZodError) {
          const detailedErrors = err.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
            code: e.code,
            expected: (e as any).expected,
            received: (e as any).received,
          }));

          console.error(
            "Validation failed:",
            JSON.stringify(detailedErrors, null, 2),
          );

          return next(
            new errorHandler.ValidationError(
              "Request body validation failed.",
              detailedErrors,
            ),
          );
        }
      }
    };
