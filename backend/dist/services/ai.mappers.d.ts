import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskClassType as GraphQLClassType } from "@/types/generated";
export declare class AIMappers {
    static mapTopicToString(topic: GraphQLTopic): string;
    static mapDifficultyToString(difficulty: GraphQLDifficulty): string;
    static mapClassTypeToString(classType: GraphQLClassType): string;
    /**
     * Get topic-specific content descriptions for different grade levels
     */
    static getTopicContentByGrade(topic: GraphQLTopic, gradeRange: string): string;
    /**
     * Get allowed topics for each grade range
     */
    static getAllowedTopicsByGrade(gradeRange: string): GraphQLTopic[];
    /**
     * Get a default appropriate topic for a grade range
     */
    static getDefaultTopicForGrade(gradeRange: string): GraphQLTopic;
    /**
     * Validate if a topic is appropriate for a grade level
     */
    static validateTopicForGrade(topic: GraphQLTopic, classType: GraphQLClassType): boolean;
    /**
     * Get grade number from class type
     */
    static getGradeNumber(classType: GraphQLClassType): number;
    /**
     * Get grade range from grade number
     */
    static getGradeRange(gradeNumber: number): string;
    /**
     * Validate topic for grade and return appropriate topic
     */
    static getValidatedTopic(topic: GraphQLTopic, classType: GraphQLClassType): GraphQLTopic;
    /**
     * Map task type to string
     */
    static mapTaskTypeToString(type: any): string;
    /**
     * Get age-appropriate topic description
     */
    static getAgeAppropriateTopic(topic: GraphQLTopic, classType: GraphQLClassType): string;
}
//# sourceMappingURL=ai.mappers.d.ts.map