export declare const getOlympiadByClassYear: (_: any, { classYear }: any) => Promise<{
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
}[]>;
//# sourceMappingURL=olympiads-by-class-year.d.ts.map