"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOlympiadByClassYear = void 0;
const models_1 = require("@/models");
const models_2 = require("@/models");
// Mapping from GraphQL enum to actual string values
const mapClassYear = (graphqlEnum) => {
    const mapping = {
        'GRADE_1': '1р анги',
        'GRADE_2': '2р анги',
        'GRADE_3': '3р анги',
        'GRADE_4': '4р анги',
        'GRADE_5': '5р анги',
        'GRADE_6': '6р анги',
        'GRADE_7': '7р анги',
        'GRADE_8': '8р анги',
        'GRADE_9': '9р анги',
        'GRADE_10': '10р анги',
        'GRADE_11': '11р анги',
        'GRADE_12': '12р анги',
    };
    return mapping[graphqlEnum] || graphqlEnum;
};
// Reverse mapping from database values back to GraphQL enum values
const mapClassYearToGraphQL = (dbValue) => {
    const reverseMapping = {
        '1р анги': 'GRADE_1',
        '2р анги': 'GRADE_2',
        '3р анги': 'GRADE_3',
        '4р анги': 'GRADE_4',
        '5р анги': 'GRADE_5',
        '6р анги': 'GRADE_6',
        '7р анги': 'GRADE_7',
        '8р анги': 'GRADE_8',
        '9р анги': 'GRADE_9',
        '10р анги': 'GRADE_10',
        '11р анги': 'GRADE_11',
        '12р анги': 'GRADE_12',
    };
    return reverseMapping[dbValue] || dbValue;
};
const getOlympiadByClassYear = async (_, { classYear }) => {
    // Convert GraphQL enum to database value
    const dbClassYear = mapClassYear(classYear);
    // Find all class types with the specified class year
    const classTypes = await models_2.ClassTypeModel.find({ classYear: dbClassYear });
    // Get all olympiad IDs from these class types
    const olympiadIds = classTypes.map(classType => classType.olympiadId);
    // Find all olympiads that have these class types
    const olympiads = await models_1.OlympiadModel.find({ _id: { $in: olympiadIds } }).populate({
        path: "classtypes",
        populate: {
            path: "questions",
            model: "Question"
        }
    }).populate("organizer");
    // Transform the data to convert database values back to GraphQL enum values
    return olympiads.map(olympiad => ({
        ...olympiad.toObject(),
        id: olympiad._id.toString(),
        organizer: olympiad.organizer && typeof olympiad.organizer === 'object' && 'toObject' in olympiad.organizer ? {
            ...olympiad.organizer.toObject(),
            id: olympiad.organizer._id.toString()
        } : null,
        classtypes: olympiad.classtypes.map((classType) => ({
            ...classType.toObject(),
            id: classType._id.toString(),
            classYear: mapClassYearToGraphQL(classType.classYear),
            questions: classType.questions.map((question) => ({
                ...question.toObject(),
                id: question._id.toString()
            }))
        }))
    }));
};
exports.getOlympiadByClassYear = getOlympiadByClassYear;
//# sourceMappingURL=olympiads-by-class-year.js.map