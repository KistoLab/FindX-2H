export declare const requestOlympiad: (_: unknown, { input }: any) => Promise<{
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
//# sourceMappingURL=request-olympiad.d.ts.map