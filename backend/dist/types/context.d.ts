import { Request } from "express";
export interface Context {
    req: Request;
    studentId?: string;
    organizerId?: string;
}
export declare function buildContext(req: Request): Promise<Context>;
//# sourceMappingURL=context.d.ts.map