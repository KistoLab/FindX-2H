import { Model, Schema } from "mongoose";
type OrganizerSchemaType = {
    id: string;
    organizationName: string;
    email: string;
    Olympiads: Schema.Types.ObjectId[];
};
export declare const OrganizerModel: Model<OrganizerSchemaType>;
export {};
//# sourceMappingURL=Organizer.model.d.ts.map