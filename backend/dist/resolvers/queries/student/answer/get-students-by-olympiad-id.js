"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentsByOlympiadId = void 0;
const models_1 = require("../../../../models");
const graphql_1 = require("graphql");
const mongoose_1 = require("mongoose");
const getStudentsByOlympiadId = async (_, { olympiadId }) => {
    try {
        console.log("🔍 getStudentsByOlympiadId called with olympiadId:", olympiadId);
        const olympiadObjectId = new mongoose_1.Types.ObjectId(olympiadId);
        console.log("📦 Converted to ObjectId:", olympiadObjectId);
        // First, let's check if there are any ClassTypes for this olympiad
        const classTypes = await models_1.ClassTypeModel.find({
            olympiadId: olympiadObjectId,
        });
        console.log("📊 Found ClassTypes:", classTypes.length);
        if (classTypes.length > 0) {
            console.log("📋 ClassType IDs:", classTypes.map((ct) => ct._id));
        }
        // Check if there are any StudentAnswers for these ClassTypes
        const classTypeIds = classTypes.map((ct) => ct._id);
        const studentAnswers = await models_1.StudentAnswerModel.find({
            classTypeId: { $in: classTypeIds },
        });
        console.log("📝 Found StudentAnswers:", studentAnswers.length);
        // Use aggregation to join ClassType -> StudentAnswer on classTypeId
        const pipeline = [
            { $match: { olympiadId: olympiadObjectId } },
            { $project: { _id: 1 } },
            {
                $lookup: {
                    from: "studentanswers",
                    localField: "_id",
                    foreignField: "classTypeId",
                    as: "answers",
                },
            },
            { $unwind: "$answers" },
            { $replaceRoot: { newRoot: "$answers" } },
        ];
        const joined = await models_1.ClassTypeModel.aggregate(pipeline);
        console.log("🔗 Aggregation result:", joined.length, "documents");
        if (!joined || joined.length === 0) {
            console.log("❌ No results from aggregation");
            return [];
        }
        const result = joined.map((doc) => {
            const { _id, ...rest } = doc;
            return { id: String(_id), ...rest };
        });
        console.log("✅ Returning", result.length, "student answers");
        return result;
    }
    catch (error) {
        console.error("❌ Error in getStudentsByOlympiadId:", error);
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.getStudentsByOlympiadId = getStudentsByOlympiadId;
//# sourceMappingURL=get-students-by-olympiad-id.js.map