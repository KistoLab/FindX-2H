export interface TaskTemplate {
    title: string;
    description: string;
    problemStatement: string;
}
export interface TopicTemplates {
    [key: string]: {
        [key: string]: TaskTemplate;
    };
}
export declare const allTemplates: Record<string, TopicTemplates>;
export declare const getRandomTemplate: (topic: string, difficulty: string) => TaskTemplate;
export declare const getAvailableTopics: () => string[];
export declare const getAvailableDifficulties: (topic: string) => string[];
//# sourceMappingURL=index.d.ts.map