export declare const approveOlympiad: (_: unknown, { id, input }: any) => Promise<{
    id: string;
    organizer: any;
    classtypes: any[];
    name: string;
    description: string;
    date: Date;
    location: string;
    scoreOfAward?: number;
    status: "PENDING" | "APPROVED";
    _id: import("mongoose").Types.ObjectId;
    __v: number;
}>;
//# sourceMappingURL=approve-olympiad.d.ts.map