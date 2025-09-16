"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizerModel = void 0;
const mongoose_1 = require("mongoose");
const organizerSchema = new mongoose_1.Schema({
    organizationName: { type: String, required: true },
    email: { type: String, required: true },
    Olympiads: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Olympiad" }]
}, { timestamps: true });
exports.OrganizerModel = mongoose_1.models["Organizer"] || (0, mongoose_1.model)("Organizer", organizerSchema);
//# sourceMappingURL=Organizer.model.js.map