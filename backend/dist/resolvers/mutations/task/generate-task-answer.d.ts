export declare const generateTaskAnswer: (_: unknown, { taskId }: {
    taskId: string;
}) => Promise<{
    id: string;
    taskId: string;
    answer: string;
    solution: string;
    testCases: {
        input: string;
        expectedOutput: string;
        explanation: string | undefined;
    }[] | undefined;
    answerValidation: {
        format: import("@/models/Answer.model").AnswerFormat;
        correctAnswers: string[];
        multipleChoiceOptions: {
            letter: string;
            text: string;
            isCorrect: boolean;
        }[] | undefined;
        partialCreditAnswers: string[] | undefined;
        validationRules: string | undefined;
    };
    aiGenerated: boolean;
    generatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=generate-task-answer.d.ts.map