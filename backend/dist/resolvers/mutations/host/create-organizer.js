"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrganizer = void 0;
const models_1 = require("../../../models");
const graphql_1 = require("graphql");
const createOrganizer = async (_, { input }) => {
    try {
        const { organizationName, email } = input;
        const existingOrganizer = await models_1.OrganizerModel.findOne({ email });
        if (existingOrganizer) {
            throw new graphql_1.GraphQLError("Organizer with this email already exists");
        }
        const organizer = new models_1.OrganizerModel({ organizationName, email });
        await organizer.save();
        return organizer;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.createOrganizer = createOrganizer;
//# sourceMappingURL=create-organizer.js.map