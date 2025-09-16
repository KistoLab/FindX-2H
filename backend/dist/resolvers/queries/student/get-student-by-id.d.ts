export declare const getStudent: (_: any, { id }: {
    id: string;
}) => Promise<{
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
    _id: import("mongoose").Types.ObjectId;
    __v: number;
} | null>;
//# sourceMappingURL=get-student-by-id.d.ts.map