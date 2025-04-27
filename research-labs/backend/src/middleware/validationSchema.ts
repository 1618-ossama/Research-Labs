import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//export type UpdateInput = z.infer<typeof updateSchema>;

export const registrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be 3-30 characters")
    .max(30, "Username must be 3-30 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  role: z.string().optional(),
});

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "email address or username required"),
  password: z
    .string()
    .min(1, "Password is required"),
});

/*
export const updateSchema = z.object({
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
});
*/

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
          expected: (e as any).expected, // Zod error details
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

      console.error("Unexpected validation error:", err);
      return next(
        new errorHandler.ValidationError("Unexpected schema validation error"),
      );
    }
  };
