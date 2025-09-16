"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrganizer = void 0;
const models_1 = require("@/models");
const getOrganizer = async (_, { id }) => {
    const host = await models_1.OrganizerModel.findById(id).populate({
        path: "Olympiads",
        populate: {
            path: "classtypes",
            populate: {
                path: "questions",
                model: "Question"
            }
        }
    });
    if (!host) {
        throw new Error("Organizer not found");
    }
    return {
        ...host.toObject(),
        id: host._id.toString(),
        Olympiads: host.Olympiads.map((olympiad) => ({
            id: olympiad._id.toString(),
            name: olympiad.name,
            date: olympiad.date,
            description: olympiad.description,
            location: olympiad.location,
            status: olympiad.status,
            scoreOfAward: olympiad.scoreOfAward,
            classtypes: olympiad.classtypes.map((classType) => ({
                id: classType._id.toString(),
                classYear: classType.classYear,
                maxScore: classType.maxScore,
                medalists: classType.medalists,
                questions: classType.questions.map((question) => ({
                    id: question._id.toString(),
                    questionName: question.questionName,
                    maxScore: question.maxScore
                }))
            }))
        }))
    };
};
exports.getOrganizer = getOrganizer;
//# sourceMappingURL=host-with-olympiads.js.map