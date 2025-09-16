"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDataBase = void 0;
const mongoose_1 = require("mongoose");
const environment_1 = require("@/config/environment");
const connectDataBase = async () => {
    try {
        if (!environment_1.config.database.mongodbUri) {
            throw new Error("MongoDB URI environment variable is not set");
        }
        console.log("🔌 Attempting to connect to MongoDB...");
        await (0, mongoose_1.connect)(environment_1.config.database.mongodbUri);
        console.log("✅ Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
        throw error;
    }
};
exports.connectDataBase = connectDataBase;
//# sourceMappingURL=index.js.map