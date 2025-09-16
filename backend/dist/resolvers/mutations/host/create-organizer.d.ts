import { CreateOrganizerInput } from "@/types/generated";
export declare const createOrganizer: (_: unknown, { input }: {
    input: CreateOrganizerInput;
}) => Promise<import("mongoose").Document<unknown, {}, {
    id: string;
    organizationName: string;
    email: string;
    Olympiads: import("mongoose").Schema.Types.ObjectId[];
}, {}, {}> & {
    id: string;
    organizationName: string;
    email: string;
    Olympiads: import("mongoose").Schema.Types.ObjectId[];
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=create-organizer.d.ts.map