"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContext = buildContext;
async function buildContext(req) {
    try {
        // Express headers access
        const studentId = req.headers["x-student-id"];
        const organizerId = req.headers["x-organizer-id"];
        return {
            req,
            studentId: studentId || undefined,
            organizerId: organizerId || undefined,
        };
    }
    catch (error) {
        console.error("Error building context:", error);
        return {
            req,
        };
    }
}
//# sourceMappingURL=context.js.map