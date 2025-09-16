"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOlympiad = void 0;
const models_1 = require("@/models");
const models_2 = require("@/models");
const models_3 = require("@/models");
const models_4 = require("@/models");
const deleteOlympiad = async (_, { id }) => {
    try {
        const olympiad = await models_1.OlympiadModel.findById(id);
        if (!olympiad) {
            return false;
        }
        // Remove the olympiad ID from the organizer's Olympiads array
        await models_4.OrganizerModel.findByIdAndUpdate(olympiad.organizer, { $pull: { Olympiads: id } }, { new: true });
        const classTypes = await models_2.ClassTypeModel.find({ olympiadId: id });
        const questionIds = classTypes.flatMap(classType => classType.questions);
        if (questionIds.length > 0) {
            await models_3.QuestionModel.deleteMany({ _id: { $in: questionIds } });
        }
        await models_2.ClassTypeModel.deleteMany({ olympiadId: id });
        const result = await models_1.OlympiadModel.findByIdAndDelete(id);
        return !!result;
    }
    catch (error) {
        console.error("Error deleting olympiad:", error);
        throw new Error("Failed to delete olympiad and its associated data");
    }
};
exports.deleteOlympiad = deleteOlympiad;
//# sourceMappingURL=delete-olympiad.js.map