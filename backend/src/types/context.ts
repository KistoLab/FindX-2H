import { Request } from "express";

export interface Context {
  req: Request;
  studentId?: string;
  organizerId?: string;
}

export async function buildContext(req: Request): Promise<Context> {
  try {
    // Express headers access
    const studentId = req.headers["x-student-id"] as string;
    const organizerId = req.headers["x-organizer-id"] as string;

    return {
      req,
      studentId: studentId || undefined,
      organizerId: organizerId || undefined,
    };
  } catch (error) {
    console.error("Error building context:", error);
    return {
      req,
    };
  }
}
