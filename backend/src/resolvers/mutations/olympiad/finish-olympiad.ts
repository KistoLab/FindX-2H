import { OlympiadModel } from "@/models";
import { GraphQLError } from "graphql";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";
import { RankingService } from "@/services/rankingService";
import { sendOlympiadFinishedNotification } from "@/utils/email-services";

export const finishOlympiad = async (_: unknown, { id }: { id: string }) => {
  try {
    // Update Olympiad status to FINISHED (this will trigger automatic ranking processing)
    const updatedOlympiad = await OlympiadModel.findByIdAndUpdate(
      id,
      { $set: { status: "FINISHED" } },
      { new: true }
    )
      .populate({
        path: "classtypes",
        populate: {
          path: "questions",
          model: "Question",
          options: { strictPopulate: false },
        },
      })
      .populate({
        path: "organizer",
        select: "organizationName email",
      });

    if (!updatedOlympiad) {
      throw new GraphQLError("Olympiad not found");
    }

    // Manually trigger ranking processing to ensure it happens
    console.log(
      `🏆 Manually processing rankings for Olympiad: ${updatedOlympiad.name}`
    );
    try {
      const rankingResult = await RankingService.processOlympiadRankings(id);
      console.log(
        `✅ Manual rankings processed: ${rankingResult.classTypesProcessed} class types, ${rankingResult.totalStudentsProcessed} students`
      );
    } catch (rankingError) {
      console.error("❌ Error in manual ranking processing:", rankingError);
      // Don't throw error to avoid breaking the finish operation
    }

    // Send thank you emails to all participants
    console.log(
      `📧 Sending thank you emails to participants of Olympiad: ${updatedOlympiad.name}`
    );
    try {
      const emailResult = await sendOlympiadFinishedNotification(
        id,
        updatedOlympiad.name
      );
      console.log(
        `✅ Thank you emails sent: ${emailResult.sentCount}/${emailResult.totalParticipants} participants notified`
      );
    } catch (emailError) {
      console.error("❌ Error sending thank you emails:", emailError);
      // Don't throw error to avoid breaking the finish operation
    }

    const transformed = transformDocument(updatedOlympiad);

    if (transformed.classtypes) {
      transformed.classtypes = transformed.classtypes.map((classType: any) => {
        const transformedQuestions = transformNestedObject(classType.questions);
        const validQuestions = transformedQuestions.filter((question: any) => {
          return (
            question &&
            question.id &&
            question.id !== null &&
            question.id !== undefined
          );
        });

        return {
          ...transformDocument(classType),
          classYear: mapClassYearToGraphQL(classType.classYear),
          questions: validQuestions,
        };
      });
    }

    if (transformed.organizer) {
      transformed.organizer = transformDocument(transformed.organizer);
      delete transformed.organizer.Olympiads;
    }

    return {
      success: true,
      message:
        "Olympiad finished successfully. Rankings have been processed and thank you emails have been sent to all participants.",
      olympiad: transformed,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
