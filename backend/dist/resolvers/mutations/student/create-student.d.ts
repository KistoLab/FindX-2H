import { CreateStudentInput } from "@/types/generated";
export declare const createStudent: (_: unknown, { input }: {
    input: CreateStudentInput;
}) => Promise<import("mongoose").Document<unknown, {}, {
    id: string;
    school: string;
    class: string;
    location: string;
    name: string;
    profilePicture: string;
    email: string;
    totalScore: number;
    piPoints: number;
    participatedOlympiads: import("mongoose").Schema.Types.ObjectId[];
}, {}, {}> & {
    id: string;
    school: string;
    class: string;
    location: string;
    name: string;
    profilePicture: string;
    email: string;
    totalScore: number;
    piPoints: number;
    participatedOlympiads: import("mongoose").Schema.Types.ObjectId[];
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=create-student.d.ts.map