"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = exports.TaskType = exports.TaskClassType = exports.Status = exports.Response = exports.Difficulty = exports.ClassYear = exports.ChallengeAnswerFormat = exports.AnswerFormat = void 0;
var AnswerFormat;
(function (AnswerFormat) {
    AnswerFormat["CodeSolution"] = "CODE_SOLUTION";
    AnswerFormat["Drawing"] = "DRAWING";
    AnswerFormat["LongText"] = "LONG_TEXT";
    AnswerFormat["MultipleChoice"] = "MULTIPLE_CHOICE";
    AnswerFormat["ShortText"] = "SHORT_TEXT";
    AnswerFormat["SingleNumber"] = "SINGLE_NUMBER";
    AnswerFormat["SingleWord"] = "SINGLE_WORD";
    AnswerFormat["TrueFalse"] = "TRUE_FALSE";
})(AnswerFormat || (exports.AnswerFormat = AnswerFormat = {}));
var ChallengeAnswerFormat;
(function (ChallengeAnswerFormat) {
    ChallengeAnswerFormat["MultipleChoice"] = "MULTIPLE_CHOICE";
    ChallengeAnswerFormat["ShortText"] = "SHORT_TEXT";
})(ChallengeAnswerFormat || (exports.ChallengeAnswerFormat = ChallengeAnswerFormat = {}));
var ClassYear;
(function (ClassYear) {
    ClassYear["Grade_1"] = "GRADE_1";
    ClassYear["Grade_2"] = "GRADE_2";
    ClassYear["Grade_3"] = "GRADE_3";
    ClassYear["Grade_4"] = "GRADE_4";
    ClassYear["Grade_5"] = "GRADE_5";
    ClassYear["Grade_6"] = "GRADE_6";
    ClassYear["Grade_7"] = "GRADE_7";
    ClassYear["Grade_8"] = "GRADE_8";
    ClassYear["Grade_9"] = "GRADE_9";
    ClassYear["Grade_10"] = "GRADE_10";
    ClassYear["Grade_11"] = "GRADE_11";
    ClassYear["Grade_12"] = "GRADE_12";
})(ClassYear || (exports.ClassYear = ClassYear = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty["Easy"] = "EASY";
    Difficulty["Medium"] = "MEDIUM";
    Difficulty["Hard"] = "HARD";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
var Response;
(function (Response) {
    Response["NotFound"] = "NOT_FOUND";
    Response["Success"] = "Success";
})(Response || (exports.Response = Response = {}));
var Status;
(function (Status) {
    Status["Active"] = "ACTIVE";
    Status["Cancelled"] = "CANCELLED";
    Status["Completed"] = "COMPLETED";
    Status["Finished"] = "FINISHED";
    Status["Pending"] = "PENDING";
    Status["Waiting"] = "WAITING";
})(Status || (exports.Status = Status = {}));
var TaskClassType;
(function (TaskClassType) {
    TaskClassType["Grade_1"] = "GRADE_1";
    TaskClassType["Grade_2"] = "GRADE_2";
    TaskClassType["Grade_3"] = "GRADE_3";
    TaskClassType["Grade_4"] = "GRADE_4";
    TaskClassType["Grade_5"] = "GRADE_5";
    TaskClassType["Grade_6"] = "GRADE_6";
    TaskClassType["Grade_7"] = "GRADE_7";
    TaskClassType["Grade_8"] = "GRADE_8";
    TaskClassType["Grade_9"] = "GRADE_9";
    TaskClassType["Grade_10"] = "GRADE_10";
    TaskClassType["Grade_11"] = "GRADE_11";
    TaskClassType["Grade_12"] = "GRADE_12";
})(TaskClassType || (exports.TaskClassType = TaskClassType = {}));
var TaskType;
(function (TaskType) {
    TaskType["Challenge"] = "CHALLENGE";
    TaskType["Tournament"] = "TOURNAMENT";
})(TaskType || (exports.TaskType = TaskType = {}));
var Topic;
(function (Topic) {
    Topic["Biology"] = "BIOLOGY";
    Topic["Chemistry"] = "CHEMISTRY";
    Topic["English"] = "ENGLISH";
    Topic["History"] = "HISTORY";
    Topic["Linguistics"] = "LINGUISTICS";
    Topic["Math"] = "MATH";
    Topic["Physics"] = "PHYSICS";
})(Topic || (exports.Topic = Topic = {}));
//# sourceMappingURL=generated.js.map