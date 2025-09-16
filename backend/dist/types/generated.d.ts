import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '@/types/context';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {
    [key: string]: unknown;
}, K extends keyof T> = {
    [_ in K]?: never;
};
export type Incremental<T> = T | {
    [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: {
        input: string;
        output: string;
    };
    String: {
        input: string;
        output: string;
    };
    Boolean: {
        input: boolean;
        output: boolean;
    };
    Int: {
        input: number;
        output: number;
    };
    Float: {
        input: number;
        output: number;
    };
    DateTime: {
        input: any;
        output: any;
    };
};
export type Answer = {
    __typename?: 'Answer';
    aiGenerated: Scalars['Boolean']['output'];
    answer: Scalars['String']['output'];
    answerValidation: AnswerValidation;
    createdAt: Scalars['DateTime']['output'];
    generatedAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    solution: Scalars['String']['output'];
    taskId: Scalars['ID']['output'];
    testCases?: Maybe<Array<TestCase>>;
    updatedAt: Scalars['DateTime']['output'];
};
export declare enum AnswerFormat {
    CodeSolution = "CODE_SOLUTION",
    Drawing = "DRAWING",
    LongText = "LONG_TEXT",
    MultipleChoice = "MULTIPLE_CHOICE",
    ShortText = "SHORT_TEXT",
    SingleNumber = "SINGLE_NUMBER",
    SingleWord = "SINGLE_WORD",
    TrueFalse = "TRUE_FALSE"
}
export type AnswerFormatDistribution = {
    easy?: InputMaybe<ChallengeAnswerFormat>;
    hard?: InputMaybe<ChallengeAnswerFormat>;
    medium?: InputMaybe<ChallengeAnswerFormat>;
};
export type AnswerValidation = {
    __typename?: 'AnswerValidation';
    correctAnswers: Array<Scalars['String']['output']>;
    format: AnswerFormat;
    multipleChoiceOptions?: Maybe<Array<MultipleChoiceOption>>;
    partialCreditAnswers?: Maybe<Array<Scalars['String']['output']>>;
    validationRules?: Maybe<Scalars['String']['output']>;
};
export type ApproveOlympiadInput = {
    scoreOfAward: Scalars['Int']['input'];
};
export type AssignTasksToChallengeInput = {
    challengeId: Scalars['ID']['input'];
    taskIds: Array<Scalars['ID']['input']>;
};
export type Challenge = {
    __typename?: 'Challenge';
    challenger: Scalars['ID']['output'];
    classType?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['DateTime']['output'];
    difficulty: Difficulty;
    id: Scalars['ID']['output'];
    opponent: Scalars['ID']['output'];
    participants: Array<Scalars['ID']['output']>;
    piPoints: Scalars['Int']['output'];
    status: Status;
    tasks: Array<Task>;
    topic: Scalars['String']['output'];
    updatedAt: Scalars['DateTime']['output'];
    winner?: Maybe<Scalars['ID']['output']>;
};
export declare enum ChallengeAnswerFormat {
    MultipleChoice = "MULTIPLE_CHOICE",
    ShortText = "SHORT_TEXT"
}
export type ChallengeInput = {
    answerFormatDistribution?: InputMaybe<AnswerFormatDistribution>;
    challenger: Scalars['ID']['input'];
    classType: Scalars['String']['input'];
    difficulty: Difficulty;
    opponent: Scalars['ID']['input'];
    piPoints?: InputMaybe<Scalars['Int']['input']>;
    taskCount: Scalars['Int']['input'];
    taskDifficultyDistribution?: InputMaybe<AnswerFormatDistribution>;
    topic: Scalars['String']['input'];
};
export type ChallengeRoom = {
    __typename?: 'ChallengeRoom';
    challengeId: Scalars['ID']['output'];
    challengerId: Scalars['ID']['output'];
    challengerScore: Scalars['Int']['output'];
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    opponentId: Scalars['ID']['output'];
    opponentScore: Scalars['Int']['output'];
    status: Status;
    updatedAt: Scalars['DateTime']['output'];
    winnerId?: Maybe<Scalars['ID']['output']>;
};
export type ChallengeRoomInput = {
    challengeId: Scalars['ID']['input'];
    challengerId: Scalars['ID']['input'];
    opponentId: Scalars['ID']['input'];
};
export type ChallengeRoomResponse = {
    __typename?: 'ChallengeRoomResponse';
    challengeRoomId: Scalars['ID']['output'];
    createdAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    isCorrect: Scalars['Boolean']['output'];
    points: Scalars['Int']['output'];
    studentId: Scalars['ID']['output'];
    submittedAnswer: Scalars['String']['output'];
    submittedAt: Scalars['DateTime']['output'];
    updatedAt: Scalars['DateTime']['output'];
};
export type ChallengeRoomResponseInput = {
    challengeRoomId: Scalars['ID']['input'];
    studentId: Scalars['ID']['input'];
    submittedAnswer: Scalars['String']['input'];
};
export type ClassType = {
    __typename?: 'ClassType';
    classYear: ClassYear;
    id: Scalars['ID']['output'];
    maxScore: Scalars['Int']['output'];
    medalists: Scalars['Int']['output'];
    olympiadId?: Maybe<Scalars['ID']['output']>;
    participants: Array<Scalars['ID']['output']>;
    questions: Array<Question>;
    studentsResults: Array<Scalars['ID']['output']>;
};
export declare enum ClassYear {
    Grade_1 = "GRADE_1",
    Grade_2 = "GRADE_2",
    Grade_3 = "GRADE_3",
    Grade_4 = "GRADE_4",
    Grade_5 = "GRADE_5",
    Grade_6 = "GRADE_6",
    Grade_7 = "GRADE_7",
    Grade_8 = "GRADE_8",
    Grade_9 = "GRADE_9",
    Grade_10 = "GRADE_10",
    Grade_11 = "GRADE_11",
    Grade_12 = "GRADE_12"
}
export type CreateClassTypeInput = {
    classYear: ClassYear;
    maxScore: Scalars['Int']['input'];
    medalists: Scalars['Int']['input'];
    questions: Array<CreateQuestionInput>;
};
export type CreateOlympiadRequestInput = {
    classtypes: Array<CreateClassTypeInput>;
    date: Scalars['String']['input'];
    description: Scalars['String']['input'];
    location: Scalars['String']['input'];
    name: Scalars['String']['input'];
    organizerId: Scalars['ID']['input'];
};
export type CreateOrganizerInput = {
    email: Scalars['String']['input'];
    organizationName: Scalars['String']['input'];
};
export type CreateQuestionInput = {
    maxScore: Scalars['Int']['input'];
    questionName: Scalars['String']['input'];
};
export type CreateStudentAnswerInput = {
    answers: Array<StudentAnswerItemInput>;
    classTypeId: Scalars['ID']['input'];
    studentId: Scalars['ID']['input'];
};
export type CreateStudentInput = {
    class: Scalars['String']['input'];
    email: Scalars['String']['input'];
    location: Scalars['String']['input'];
    name: Scalars['String']['input'];
    profilePicture: Scalars['String']['input'];
    school: Scalars['String']['input'];
};
export declare enum Difficulty {
    Easy = "EASY",
    Medium = "MEDIUM",
    Hard = "HARD"
}
export type DifficultyDistribution = {
    easy?: InputMaybe<Scalars['Int']['input']>;
    medium?: InputMaybe<Scalars['Int']['input']>;
    hard?: InputMaybe<Scalars['Int']['input']>;
};
export type GenerateMultipleTasksInput = {
    answerFormat?: InputMaybe<AnswerFormat>;
    classType: TaskClassType;
    difficultyDistribution?: InputMaybe<DifficultyDistribution>;
    piPoints: Scalars['Int']['input'];
    taskCount: Scalars['Int']['input'];
    topic: Topic;
    type: TaskType;
};
export type GenerateTaskInput = {
    answerFormat?: InputMaybe<AnswerFormat>;
    classType: TaskClassType;
    difficulty: Difficulty;
    piPoints: Scalars['Int']['input'];
    taskCount?: InputMaybe<Scalars['Int']['input']>;
    topic: Topic;
    type: TaskType;
};
export type MultipleChoiceOption = {
    __typename?: 'MultipleChoiceOption';
    isCorrect: Scalars['Boolean']['output'];
    letter: Scalars['String']['output'];
    text: Scalars['String']['output'];
};
export type Mutation = {
    __typename?: 'Mutation';
    addOlympiad: Student;
    approveOlympiad: Olympiad;
    assignTasksToChallenge: Challenge;
    createChallenge: Scalars['ID']['output'];
    createChallengeRoom: ChallengeRoom;
    createChallengeRoomResponse: ChallengeRoomResponse;
    createClassType: ClassType;
    createOrganizer: Organizer;
    createQuestion: Question;
    createStudent: Student;
    createStudentAnswer: StudentAnswer;
    createTestStudent: Student;
    deleteClassType: Scalars['Boolean']['output'];
    deleteOlympiad: Scalars['Boolean']['output'];
    deleteQuestion: Scalars['Boolean']['output'];
    deleteStudent: Scalars['Boolean']['output'];
    deleteStudentAnswer: Scalars['Boolean']['output'];
    generateMultipleTasks: Array<Task>;
    generateTask: Task;
    generateTaskAnswer: Answer;
    registerForOlympiad: Scalars['Boolean']['output'];
    requestOlympiad: Olympiad;
    updateChallengeRoom: ChallengeRoom;
    updateClassType: ClassType;
    updateOlympiad: Olympiad;
    updateOrganizer: Organizer;
    updatePiPoints: Student;
    updateQuestion: Question;
    updateStudent: Student;
    updateStudentAnswer: StudentAnswer;
    updateStudentAnswerScore: StudentAnswer;
    updateTotalScore: Student;
};
export type MutationAddOlympiadArgs = {
    id: Scalars['ID']['input'];
    olympiadId: Scalars['ID']['input'];
};
export type MutationApproveOlympiadArgs = {
    id: Scalars['ID']['input'];
    input: ApproveOlympiadInput;
};
export type MutationAssignTasksToChallengeArgs = {
    input: AssignTasksToChallengeInput;
};
export type MutationCreateChallengeArgs = {
    input: ChallengeInput;
};
export type MutationCreateChallengeRoomArgs = {
    input: ChallengeRoomInput;
};
export type MutationCreateChallengeRoomResponseArgs = {
    input: ChallengeRoomResponseInput;
};
export type MutationCreateClassTypeArgs = {
    input: CreateClassTypeInput;
};
export type MutationCreateOrganizerArgs = {
    input: CreateOrganizerInput;
};
export type MutationCreateQuestionArgs = {
    input: CreateQuestionInput;
};
export type MutationCreateStudentArgs = {
    input: CreateStudentInput;
};
export type MutationCreateStudentAnswerArgs = {
    input: CreateStudentAnswerInput;
};
export type MutationDeleteClassTypeArgs = {
    id: Scalars['ID']['input'];
};
export type MutationDeleteOlympiadArgs = {
    id: Scalars['ID']['input'];
};
export type MutationDeleteQuestionArgs = {
    id: Scalars['ID']['input'];
};
export type MutationDeleteStudentArgs = {
    id: Scalars['ID']['input'];
};
export type MutationDeleteStudentAnswerArgs = {
    id: Scalars['ID']['input'];
};
export type MutationGenerateMultipleTasksArgs = {
    input: GenerateMultipleTasksInput;
};
export type MutationGenerateTaskArgs = {
    input: GenerateTaskInput;
};
export type MutationGenerateTaskAnswerArgs = {
    taskId: Scalars['ID']['input'];
};
export type MutationRegisterForOlympiadArgs = {
    input: RegisterForOlympiadInput;
};
export type MutationRequestOlympiadArgs = {
    input: CreateOlympiadRequestInput;
};
export type MutationUpdateChallengeRoomArgs = {
    input: UpdateChallengeRoomInput;
};
export type MutationUpdateClassTypeArgs = {
    id: Scalars['ID']['input'];
    input: UpdateClassTypeInput;
};
export type MutationUpdateOlympiadArgs = {
    id: Scalars['ID']['input'];
    input: UpdateOlympiadInput;
};
export type MutationUpdateOrganizerArgs = {
    id: Scalars['ID']['input'];
    input: CreateOrganizerInput;
};
export type MutationUpdatePiPointsArgs = {
    id: Scalars['ID']['input'];
    piPoints: Scalars['Int']['input'];
};
export type MutationUpdateQuestionArgs = {
    id: Scalars['ID']['input'];
    input: UpdateQuestionInput;
};
export type MutationUpdateStudentArgs = {
    id: Scalars['ID']['input'];
    input: UpdateStudentInput;
};
export type MutationUpdateStudentAnswerArgs = {
    id: Scalars['ID']['input'];
    input: UpdateStudentAnswerInput;
};
export type MutationUpdateStudentAnswerScoreArgs = {
    questionId: Scalars['ID']['input'];
    score: Scalars['Int']['input'];
    studentAnswerId: Scalars['ID']['input'];
};
export type MutationUpdateTotalScoreArgs = {
    id: Scalars['ID']['input'];
    totalScore: Scalars['Int']['input'];
};
export type Olympiad = {
    __typename?: 'Olympiad';
    classtypes: Array<ClassType>;
    date: Scalars['String']['output'];
    description: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    location: Scalars['String']['output'];
    name: Scalars['String']['output'];
    organizer?: Maybe<Organizer>;
    scoreOfAward?: Maybe<Scalars['Int']['output']>;
    status: Scalars['String']['output'];
};
export type Organizer = {
    __typename?: 'Organizer';
    Olympiads?: Maybe<Array<Olympiad>>;
    email: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    organizationName: Scalars['String']['output'];
};
export type Query = {
    __typename?: 'Query';
    allClassTypes: Array<ClassType>;
    allOlympiads: Array<Olympiad>;
    allStudentAnswers: Array<StudentAnswer>;
    answer?: Maybe<Answer>;
    classType: ClassType;
    classTypesByClassYear: Array<ClassType>;
    classTypesByOlympiad: Array<ClassType>;
    debugOlympiadData: Scalars['String']['output'];
    getAllApprovedOlympiads: Array<Olympiad>;
    getAllOrganizers: Array<Organizer>;
    getAllStudent: Array<Student>;
    getChallenge?: Maybe<Challenge>;
    getChallengeRoom: ChallengeRoom;
    getChallengeRoomResponse?: Maybe<ChallengeRoomResponse>;
    getOlympiadByClassYear: Array<Olympiad>;
    getOrganizer: Organizer;
    getPendingOlympiads: Array<Olympiad>;
    getStudent?: Maybe<Student>;
    getStudentsByOlympiadId: Array<StudentAnswer>;
    listChallengeRoomResponses: Array<ChallengeRoomResponse>;
    listChallengeRoomsByStudent: Array<ChallengeRoom>;
    listChallenges: Array<Challenge>;
    listStudentChallengeResponses: Array<ChallengeRoomResponse>;
    olympiad: Olympiad;
    participantsByClassType: Array<Scalars['ID']['output']>;
    question: Question;
    questionsByClassType: Array<Question>;
    studentAnswer?: Maybe<StudentAnswer>;
    studentAnswersByClassType: Array<StudentAnswer>;
    studentsByClass: Array<Student>;
    studentsByClassType: Array<Student>;
    studentsByLocation: Array<Student>;
    studentsByOlympiad: Array<Student>;
    studentsBySchool: Array<Student>;
    studentsResultsByClassType: Array<Scalars['ID']['output']>;
    task?: Maybe<Task>;
    tasks: Array<Task>;
    tasksByDifficulty: Array<Task>;
    tasksByTopic: Array<Task>;
};
export type QueryAnswerArgs = {
    taskId: Scalars['ID']['input'];
};
export type QueryClassTypeArgs = {
    id: Scalars['ID']['input'];
};
export type QueryClassTypesByClassYearArgs = {
    classYear: ClassYear;
};
export type QueryClassTypesByOlympiadArgs = {
    olympiadId: Scalars['ID']['input'];
};
export type QueryDebugOlympiadDataArgs = {
    olympiadId: Scalars['ID']['input'];
};
export type QueryGetChallengeArgs = {
    id: Scalars['ID']['input'];
};
export type QueryGetChallengeRoomArgs = {
    id: Scalars['ID']['input'];
};
export type QueryGetChallengeRoomResponseArgs = {
    id: Scalars['ID']['input'];
};
export type QueryGetOlympiadByClassYearArgs = {
    classYear: ClassYear;
};
export type QueryGetOrganizerArgs = {
    id: Scalars['ID']['input'];
};
export type QueryGetStudentArgs = {
    id: Scalars['ID']['input'];
};
export type QueryGetStudentsByOlympiadIdArgs = {
    olympiadId: Scalars['ID']['input'];
};
export type QueryListChallengeRoomResponsesArgs = {
    roomId: Scalars['ID']['input'];
};
export type QueryListChallengeRoomsByStudentArgs = {
    studentId: Scalars['ID']['input'];
};
export type QueryListChallengesArgs = {
    studentId: Scalars['ID']['input'];
};
export type QueryListStudentChallengeResponsesArgs = {
    studentId: Scalars['ID']['input'];
};
export type QueryOlympiadArgs = {
    id: Scalars['ID']['input'];
};
export type QueryParticipantsByClassTypeArgs = {
    classTypeId: Scalars['ID']['input'];
};
export type QueryQuestionArgs = {
    id: Scalars['ID']['input'];
};
export type QueryQuestionsByClassTypeArgs = {
    classTypeId: Scalars['ID']['input'];
};
export type QueryStudentAnswerArgs = {
    id: Scalars['ID']['input'];
};
export type QueryStudentAnswersByClassTypeArgs = {
    classTypeId: Scalars['ID']['input'];
};
export type QueryStudentsByClassArgs = {
    class: Scalars['String']['input'];
};
export type QueryStudentsByClassTypeArgs = {
    classTypeId: Scalars['ID']['input'];
};
export type QueryStudentsByLocationArgs = {
    location: Scalars['String']['input'];
};
export type QueryStudentsByOlympiadArgs = {
    olympiadId: Scalars['ID']['input'];
};
export type QueryStudentsBySchoolArgs = {
    school: Scalars['String']['input'];
};
export type QueryStudentsResultsByClassTypeArgs = {
    classTypeId: Scalars['ID']['input'];
};
export type QueryTaskArgs = {
    id: Scalars['ID']['input'];
};
export type QueryTasksByDifficultyArgs = {
    difficulty: Difficulty;
};
export type QueryTasksByTopicArgs = {
    topic: Topic;
};
export type Question = {
    __typename?: 'Question';
    classTypeId: Scalars['ID']['output'];
    id: Scalars['ID']['output'];
    maxScore: Scalars['Int']['output'];
    questionName: Scalars['String']['output'];
};
export type RegisterForOlympiadInput = {
    classTypeId: Scalars['ID']['input'];
    studentId: Scalars['ID']['input'];
};
export declare enum Response {
    NotFound = "NOT_FOUND",
    Success = "Success"
}
export declare enum Status {
    Active = "ACTIVE",
    Cancelled = "CANCELLED",
    Completed = "COMPLETED",
    Finished = "FINISHED",
    Pending = "PENDING",
    Waiting = "WAITING"
}
export type Student = {
    __typename?: 'Student';
    class: Scalars['String']['output'];
    createdAt: Scalars['String']['output'];
    email: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    location: Scalars['String']['output'];
    name: Scalars['String']['output'];
    participatedOlympiads: Array<Scalars['ID']['output']>;
    piPoints: Scalars['Int']['output'];
    profilePicture: Scalars['String']['output'];
    school: Scalars['String']['output'];
    totalScore: Scalars['Int']['output'];
    updatedAt: Scalars['String']['output'];
};
export type StudentAnswer = {
    __typename?: 'StudentAnswer';
    answers: Array<StudentAnswerItem>;
    classTypeId: Scalars['ID']['output'];
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    studentId: Scalars['ID']['output'];
    totalScoreofOlympiad: Scalars['Int']['output'];
    updatedAt: Scalars['String']['output'];
};
export type StudentAnswerItem = {
    __typename?: 'StudentAnswerItem';
    questionId: Scalars['ID']['output'];
    score: Scalars['Int']['output'];
};
export type StudentAnswerItemInput = {
    questionId: Scalars['ID']['input'];
    score: Scalars['Int']['input'];
};
export type Task = {
    __typename?: 'Task';
    aiGenerated: Scalars['Boolean']['output'];
    classType: TaskClassType;
    createdAt: Scalars['DateTime']['output'];
    description: Scalars['String']['output'];
    difficulty: Difficulty;
    generatedAt: Scalars['DateTime']['output'];
    id: Scalars['ID']['output'];
    piPoints: Scalars['Int']['output'];
    problemStatement: Scalars['String']['output'];
    title: Scalars['String']['output'];
    topic: Topic;
    type: TaskType;
    updatedAt: Scalars['DateTime']['output'];
    usageCount: Scalars['Int']['output'];
};
export declare enum TaskClassType {
    Grade_1 = "GRADE_1",
    Grade_2 = "GRADE_2",
    Grade_3 = "GRADE_3",
    Grade_4 = "GRADE_4",
    Grade_5 = "GRADE_5",
    Grade_6 = "GRADE_6",
    Grade_7 = "GRADE_7",
    Grade_8 = "GRADE_8",
    Grade_9 = "GRADE_9",
    Grade_10 = "GRADE_10",
    Grade_11 = "GRADE_11",
    Grade_12 = "GRADE_12"
}
export declare enum TaskType {
    Challenge = "CHALLENGE",
    Tournament = "TOURNAMENT"
}
export type TestCase = {
    __typename?: 'TestCase';
    expectedOutput: Scalars['String']['output'];
    explanation?: Maybe<Scalars['String']['output']>;
    input: Scalars['String']['output'];
};
export declare enum Topic {
    Biology = "BIOLOGY",
    Chemistry = "CHEMISTRY",
    English = "ENGLISH",
    History = "HISTORY",
    Linguistics = "LINGUISTICS",
    Math = "MATH",
    Physics = "PHYSICS"
}
export type UpdateChallengeRoomInput = {
    challengerScore?: InputMaybe<Scalars['Int']['input']>;
    opponentScore?: InputMaybe<Scalars['Int']['input']>;
    roomId: Scalars['ID']['input'];
    status?: InputMaybe<Status>;
    winnerId?: InputMaybe<Scalars['ID']['input']>;
};
export type UpdateClassTypeInput = {
    classYear: ClassYear;
    maxScore: Scalars['Int']['input'];
    medalists: Scalars['Int']['input'];
};
export type UpdateOlympiadInput = {
    date?: InputMaybe<Scalars['String']['input']>;
    description?: InputMaybe<Scalars['String']['input']>;
    location?: InputMaybe<Scalars['String']['input']>;
};
export type UpdateQuestionInput = {
    maxScore: Scalars['Int']['input'];
    questionName: Scalars['String']['input'];
};
export type UpdateStudentAnswerInput = {
    answers?: InputMaybe<Array<StudentAnswerItemInput>>;
    classTypeId?: InputMaybe<Scalars['ID']['input']>;
    id: Scalars['ID']['input'];
    studentId?: InputMaybe<Scalars['ID']['input']>;
};
export type UpdateStudentInput = {
    class?: InputMaybe<Scalars['String']['input']>;
    email?: InputMaybe<Scalars['String']['input']>;
    location?: InputMaybe<Scalars['String']['input']>;
    profilePicture?: InputMaybe<Scalars['String']['input']>;
    school?: InputMaybe<Scalars['String']['input']>;
};
export type ResolverTypeWrapper<T> = Promise<T> | T;
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs>;
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export type NextResolverFn<T> = () => Promise<T>;
export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    Answer: ResolverTypeWrapper<Answer>;
    AnswerFormat: AnswerFormat;
    AnswerFormatDistribution: AnswerFormatDistribution;
    AnswerValidation: ResolverTypeWrapper<AnswerValidation>;
    ApproveOlympiadInput: ApproveOlympiadInput;
    AssignTasksToChallengeInput: AssignTasksToChallengeInput;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
    Challenge: ResolverTypeWrapper<Challenge>;
    ChallengeAnswerFormat: ChallengeAnswerFormat;
    ChallengeInput: ChallengeInput;
    ChallengeRoom: ResolverTypeWrapper<ChallengeRoom>;
    ChallengeRoomInput: ChallengeRoomInput;
    ChallengeRoomResponse: ResolverTypeWrapper<ChallengeRoomResponse>;
    ChallengeRoomResponseInput: ChallengeRoomResponseInput;
    ClassType: ResolverTypeWrapper<ClassType>;
    ClassYear: ClassYear;
    CreateClassTypeInput: CreateClassTypeInput;
    CreateOlympiadRequestInput: CreateOlympiadRequestInput;
    CreateOrganizerInput: CreateOrganizerInput;
    CreateQuestionInput: CreateQuestionInput;
    CreateStudentAnswerInput: CreateStudentAnswerInput;
    CreateStudentInput: CreateStudentInput;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
    Difficulty: Difficulty;
    DifficultyDistribution: DifficultyDistribution;
    GenerateMultipleTasksInput: GenerateMultipleTasksInput;
    GenerateTaskInput: GenerateTaskInput;
    ID: ResolverTypeWrapper<Scalars['ID']['output']>;
    Int: ResolverTypeWrapper<Scalars['Int']['output']>;
    MultipleChoiceOption: ResolverTypeWrapper<MultipleChoiceOption>;
    Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
    Olympiad: ResolverTypeWrapper<Olympiad>;
    Organizer: ResolverTypeWrapper<Organizer>;
    Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
    Question: ResolverTypeWrapper<Question>;
    RegisterForOlympiadInput: RegisterForOlympiadInput;
    Response: Response;
    Status: Status;
    String: ResolverTypeWrapper<Scalars['String']['output']>;
    Student: ResolverTypeWrapper<Student>;
    StudentAnswer: ResolverTypeWrapper<StudentAnswer>;
    StudentAnswerItem: ResolverTypeWrapper<StudentAnswerItem>;
    StudentAnswerItemInput: StudentAnswerItemInput;
    Task: ResolverTypeWrapper<Task>;
    TaskClassType: TaskClassType;
    TaskType: TaskType;
    TestCase: ResolverTypeWrapper<TestCase>;
    Topic: Topic;
    UpdateChallengeRoomInput: UpdateChallengeRoomInput;
    UpdateClassTypeInput: UpdateClassTypeInput;
    UpdateOlympiadInput: UpdateOlympiadInput;
    UpdateQuestionInput: UpdateQuestionInput;
    UpdateStudentAnswerInput: UpdateStudentAnswerInput;
    UpdateStudentInput: UpdateStudentInput;
};
/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Answer: Answer;
    AnswerFormatDistribution: AnswerFormatDistribution;
    AnswerValidation: AnswerValidation;
    ApproveOlympiadInput: ApproveOlympiadInput;
    AssignTasksToChallengeInput: AssignTasksToChallengeInput;
    Boolean: Scalars['Boolean']['output'];
    Challenge: Challenge;
    ChallengeInput: ChallengeInput;
    ChallengeRoom: ChallengeRoom;
    ChallengeRoomInput: ChallengeRoomInput;
    ChallengeRoomResponse: ChallengeRoomResponse;
    ChallengeRoomResponseInput: ChallengeRoomResponseInput;
    ClassType: ClassType;
    CreateClassTypeInput: CreateClassTypeInput;
    CreateOlympiadRequestInput: CreateOlympiadRequestInput;
    CreateOrganizerInput: CreateOrganizerInput;
    CreateQuestionInput: CreateQuestionInput;
    CreateStudentAnswerInput: CreateStudentAnswerInput;
    CreateStudentInput: CreateStudentInput;
    DateTime: Scalars['DateTime']['output'];
    DifficultyDistribution: DifficultyDistribution;
    GenerateMultipleTasksInput: GenerateMultipleTasksInput;
    GenerateTaskInput: GenerateTaskInput;
    ID: Scalars['ID']['output'];
    Int: Scalars['Int']['output'];
    MultipleChoiceOption: MultipleChoiceOption;
    Mutation: Record<PropertyKey, never>;
    Olympiad: Olympiad;
    Organizer: Organizer;
    Query: Record<PropertyKey, never>;
    Question: Question;
    RegisterForOlympiadInput: RegisterForOlympiadInput;
    String: Scalars['String']['output'];
    Student: Student;
    StudentAnswer: StudentAnswer;
    StudentAnswerItem: StudentAnswerItem;
    StudentAnswerItemInput: StudentAnswerItemInput;
    Task: Task;
    TestCase: TestCase;
    UpdateChallengeRoomInput: UpdateChallengeRoomInput;
    UpdateClassTypeInput: UpdateClassTypeInput;
    UpdateOlympiadInput: UpdateOlympiadInput;
    UpdateQuestionInput: UpdateQuestionInput;
    UpdateStudentAnswerInput: UpdateStudentAnswerInput;
    UpdateStudentInput: UpdateStudentInput;
};
export type AnswerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
    aiGenerated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    answerValidation?: Resolver<ResolversTypes['AnswerValidation'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    generatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    solution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    taskId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    testCases?: Resolver<Maybe<Array<ResolversTypes['TestCase']>>, ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};
export type AnswerValidationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AnswerValidation'] = ResolversParentTypes['AnswerValidation']> = {
    correctAnswers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
    format?: Resolver<ResolversTypes['AnswerFormat'], ParentType, ContextType>;
    multipleChoiceOptions?: Resolver<Maybe<Array<ResolversTypes['MultipleChoiceOption']>>, ParentType, ContextType>;
    partialCreditAnswers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    validationRules?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};
export type ChallengeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge']> = {
    challenger?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    classType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    difficulty?: Resolver<ResolversTypes['Difficulty'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    opponent?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    participants?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
    piPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
    tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
    topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    winner?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
};
export type ChallengeRoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChallengeRoom'] = ResolversParentTypes['ChallengeRoom']> = {
    challengeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    challengerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    challengerScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    opponentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    opponentScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    winnerId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
};
export type ChallengeRoomResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChallengeRoomResponse'] = ResolversParentTypes['ChallengeRoomResponse']> = {
    challengeRoomId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    isCorrect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    studentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    submittedAnswer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    submittedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};
export type ClassTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ClassType'] = ResolversParentTypes['ClassType']> = {
    classYear?: Resolver<ResolversTypes['ClassYear'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    maxScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    medalists?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    olympiadId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
    participants?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
    questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
    studentsResults?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
};
export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}
export type MultipleChoiceOptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MultipleChoiceOption'] = ResolversParentTypes['MultipleChoiceOption']> = {
    isCorrect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    letter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};
export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    addOlympiad?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationAddOlympiadArgs, 'id' | 'olympiadId'>>;
    approveOlympiad?: Resolver<ResolversTypes['Olympiad'], ParentType, ContextType, RequireFields<MutationApproveOlympiadArgs, 'id' | 'input'>>;
    assignTasksToChallenge?: Resolver<ResolversTypes['Challenge'], ParentType, ContextType, RequireFields<MutationAssignTasksToChallengeArgs, 'input'>>;
    createChallenge?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationCreateChallengeArgs, 'input'>>;
    createChallengeRoom?: Resolver<ResolversTypes['ChallengeRoom'], ParentType, ContextType, RequireFields<MutationCreateChallengeRoomArgs, 'input'>>;
    createChallengeRoomResponse?: Resolver<ResolversTypes['ChallengeRoomResponse'], ParentType, ContextType, RequireFields<MutationCreateChallengeRoomResponseArgs, 'input'>>;
    createClassType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType, RequireFields<MutationCreateClassTypeArgs, 'input'>>;
    createOrganizer?: Resolver<ResolversTypes['Organizer'], ParentType, ContextType, RequireFields<MutationCreateOrganizerArgs, 'input'>>;
    createQuestion?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<MutationCreateQuestionArgs, 'input'>>;
    createStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationCreateStudentArgs, 'input'>>;
    createStudentAnswer?: Resolver<ResolversTypes['StudentAnswer'], ParentType, ContextType, RequireFields<MutationCreateStudentAnswerArgs, 'input'>>;
    createTestStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType>;
    deleteClassType?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteClassTypeArgs, 'id'>>;
    deleteOlympiad?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteOlympiadArgs, 'id'>>;
    deleteQuestion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteQuestionArgs, 'id'>>;
    deleteStudent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteStudentArgs, 'id'>>;
    deleteStudentAnswer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteStudentAnswerArgs, 'id'>>;
    generateMultipleTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationGenerateMultipleTasksArgs, 'input'>>;
    generateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationGenerateTaskArgs, 'input'>>;
    generateTaskAnswer?: Resolver<ResolversTypes['Answer'], ParentType, ContextType, RequireFields<MutationGenerateTaskAnswerArgs, 'taskId'>>;
    registerForOlympiad?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRegisterForOlympiadArgs, 'input'>>;
    requestOlympiad?: Resolver<ResolversTypes['Olympiad'], ParentType, ContextType, RequireFields<MutationRequestOlympiadArgs, 'input'>>;
    updateChallengeRoom?: Resolver<ResolversTypes['ChallengeRoom'], ParentType, ContextType, RequireFields<MutationUpdateChallengeRoomArgs, 'input'>>;
    updateClassType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType, RequireFields<MutationUpdateClassTypeArgs, 'id' | 'input'>>;
    updateOlympiad?: Resolver<ResolversTypes['Olympiad'], ParentType, ContextType, RequireFields<MutationUpdateOlympiadArgs, 'id' | 'input'>>;
    updateOrganizer?: Resolver<ResolversTypes['Organizer'], ParentType, ContextType, RequireFields<MutationUpdateOrganizerArgs, 'id' | 'input'>>;
    updatePiPoints?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationUpdatePiPointsArgs, 'id' | 'piPoints'>>;
    updateQuestion?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<MutationUpdateQuestionArgs, 'id' | 'input'>>;
    updateStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationUpdateStudentArgs, 'id' | 'input'>>;
    updateStudentAnswer?: Resolver<ResolversTypes['StudentAnswer'], ParentType, ContextType, RequireFields<MutationUpdateStudentAnswerArgs, 'id' | 'input'>>;
    updateStudentAnswerScore?: Resolver<ResolversTypes['StudentAnswer'], ParentType, ContextType, RequireFields<MutationUpdateStudentAnswerScoreArgs, 'questionId' | 'score' | 'studentAnswerId'>>;
    updateTotalScore?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationUpdateTotalScoreArgs, 'id' | 'totalScore'>>;
};
export type OlympiadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Olympiad'] = ResolversParentTypes['Olympiad']> = {
    classtypes?: Resolver<Array<ResolversTypes['ClassType']>, ParentType, ContextType>;
    date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    organizer?: Resolver<Maybe<ResolversTypes['Organizer']>, ParentType, ContextType>;
    scoreOfAward?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};
export type OrganizerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Organizer'] = ResolversParentTypes['Organizer']> = {
    Olympiads?: Resolver<Maybe<Array<ResolversTypes['Olympiad']>>, ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    organizationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};
export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    allClassTypes?: Resolver<Array<ResolversTypes['ClassType']>, ParentType, ContextType>;
    allOlympiads?: Resolver<Array<ResolversTypes['Olympiad']>, ParentType, ContextType>;
    allStudentAnswers?: Resolver<Array<ResolversTypes['StudentAnswer']>, ParentType, ContextType>;
    answer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<QueryAnswerArgs, 'taskId'>>;
    classType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType, RequireFields<QueryClassTypeArgs, 'id'>>;
    classTypesByClassYear?: Resolver<Array<ResolversTypes['ClassType']>, ParentType, ContextType, RequireFields<QueryClassTypesByClassYearArgs, 'classYear'>>;
    classTypesByOlympiad?: Resolver<Array<ResolversTypes['ClassType']>, ParentType, ContextType, RequireFields<QueryClassTypesByOlympiadArgs, 'olympiadId'>>;
    debugOlympiadData?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryDebugOlympiadDataArgs, 'olympiadId'>>;
    getAllApprovedOlympiads?: Resolver<Array<ResolversTypes['Olympiad']>, ParentType, ContextType>;
    getAllOrganizers?: Resolver<Array<ResolversTypes['Organizer']>, ParentType, ContextType>;
    getAllStudent?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType>;
    getChallenge?: Resolver<Maybe<ResolversTypes['Challenge']>, ParentType, ContextType, RequireFields<QueryGetChallengeArgs, 'id'>>;
    getChallengeRoom?: Resolver<ResolversTypes['ChallengeRoom'], ParentType, ContextType, RequireFields<QueryGetChallengeRoomArgs, 'id'>>;
    getChallengeRoomResponse?: Resolver<Maybe<ResolversTypes['ChallengeRoomResponse']>, ParentType, ContextType, RequireFields<QueryGetChallengeRoomResponseArgs, 'id'>>;
    getOlympiadByClassYear?: Resolver<Array<ResolversTypes['Olympiad']>, ParentType, ContextType, RequireFields<QueryGetOlympiadByClassYearArgs, 'classYear'>>;
    getOrganizer?: Resolver<ResolversTypes['Organizer'], ParentType, ContextType, RequireFields<QueryGetOrganizerArgs, 'id'>>;
    getPendingOlympiads?: Resolver<Array<ResolversTypes['Olympiad']>, ParentType, ContextType>;
    getStudent?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryGetStudentArgs, 'id'>>;
    getStudentsByOlympiadId?: Resolver<Array<ResolversTypes['StudentAnswer']>, ParentType, ContextType, RequireFields<QueryGetStudentsByOlympiadIdArgs, 'olympiadId'>>;
    listChallengeRoomResponses?: Resolver<Array<ResolversTypes['ChallengeRoomResponse']>, ParentType, ContextType, RequireFields<QueryListChallengeRoomResponsesArgs, 'roomId'>>;
    listChallengeRoomsByStudent?: Resolver<Array<ResolversTypes['ChallengeRoom']>, ParentType, ContextType, RequireFields<QueryListChallengeRoomsByStudentArgs, 'studentId'>>;
    listChallenges?: Resolver<Array<ResolversTypes['Challenge']>, ParentType, ContextType, RequireFields<QueryListChallengesArgs, 'studentId'>>;
    listStudentChallengeResponses?: Resolver<Array<ResolversTypes['ChallengeRoomResponse']>, ParentType, ContextType, RequireFields<QueryListStudentChallengeResponsesArgs, 'studentId'>>;
    olympiad?: Resolver<ResolversTypes['Olympiad'], ParentType, ContextType, RequireFields<QueryOlympiadArgs, 'id'>>;
    participantsByClassType?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<QueryParticipantsByClassTypeArgs, 'classTypeId'>>;
    question?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<QueryQuestionArgs, 'id'>>;
    questionsByClassType?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryQuestionsByClassTypeArgs, 'classTypeId'>>;
    studentAnswer?: Resolver<Maybe<ResolversTypes['StudentAnswer']>, ParentType, ContextType, RequireFields<QueryStudentAnswerArgs, 'id'>>;
    studentAnswersByClassType?: Resolver<Array<ResolversTypes['StudentAnswer']>, ParentType, ContextType, RequireFields<QueryStudentAnswersByClassTypeArgs, 'classTypeId'>>;
    studentsByClass?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsByClassArgs, 'class'>>;
    studentsByClassType?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsByClassTypeArgs, 'classTypeId'>>;
    studentsByLocation?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsByLocationArgs, 'location'>>;
    studentsByOlympiad?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsByOlympiadArgs, 'olympiadId'>>;
    studentsBySchool?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsBySchoolArgs, 'school'>>;
    studentsResultsByClassType?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<QueryStudentsResultsByClassTypeArgs, 'classTypeId'>>;
    task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
    tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
    tasksByDifficulty?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTasksByDifficultyArgs, 'difficulty'>>;
    tasksByTopic?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTasksByTopicArgs, 'topic'>>;
};
export type QuestionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
    classTypeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    maxScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    questionName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};
export type StudentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
    class?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    participatedOlympiads?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
    piPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    profilePicture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    school?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    totalScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};
export type StudentAnswerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StudentAnswer'] = ResolversParentTypes['StudentAnswer']> = {
    answers?: Resolver<Array<ResolversTypes['StudentAnswerItem']>, ParentType, ContextType>;
    classTypeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    studentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    totalScoreofOlympiad?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};
export type StudentAnswerItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StudentAnswerItem'] = ResolversParentTypes['StudentAnswerItem']> = {
    questionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};
export type TaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
    aiGenerated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    classType?: Resolver<ResolversTypes['TaskClassType'], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    difficulty?: Resolver<ResolversTypes['Difficulty'], ParentType, ContextType>;
    generatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    piPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    problemStatement?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    topic?: Resolver<ResolversTypes['Topic'], ParentType, ContextType>;
    type?: Resolver<ResolversTypes['TaskType'], ParentType, ContextType>;
    updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    usageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};
export type TestCaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestCase'] = ResolversParentTypes['TestCase']> = {
    expectedOutput?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    explanation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    input?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};
export type Resolvers<ContextType = Context> = {
    Answer?: AnswerResolvers<ContextType>;
    AnswerValidation?: AnswerValidationResolvers<ContextType>;
    Challenge?: ChallengeResolvers<ContextType>;
    ChallengeRoom?: ChallengeRoomResolvers<ContextType>;
    ChallengeRoomResponse?: ChallengeRoomResponseResolvers<ContextType>;
    ClassType?: ClassTypeResolvers<ContextType>;
    DateTime?: GraphQLScalarType;
    MultipleChoiceOption?: MultipleChoiceOptionResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Olympiad?: OlympiadResolvers<ContextType>;
    Organizer?: OrganizerResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Question?: QuestionResolvers<ContextType>;
    Student?: StudentResolvers<ContextType>;
    StudentAnswer?: StudentAnswerResolvers<ContextType>;
    StudentAnswerItem?: StudentAnswerItemResolvers<ContextType>;
    Task?: TaskResolvers<ContextType>;
    TestCase?: TestCaseResolvers<ContextType>;
};
//# sourceMappingURL=generated.d.ts.map