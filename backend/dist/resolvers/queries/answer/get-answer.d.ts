export declare const answer: (_: unknown, { taskId }: {
    taskId: string;
}) => Promise<{
    id: string;
    taskId: string;
    answer: string;
    solution: string;
    testCases: any;
    aiGenerated: boolean;
    generatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
} | null>;
//# sourceMappingURL=get-answer.d.ts.map