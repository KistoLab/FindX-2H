import { OrganizerModel } from "@/models";

export const getOrganizer = async (_: any, { id }: any) => {
  const host = await OrganizerModel.findById(id).populate({
    path: "Olympiads",
    populate: [
      {
        path: "organizer",
        model: "Organizer"
      },
      {
        path: "classtypes",
        populate: {
          path: "questions",
          model: "Question"
        }
      }
    ]
  });
  
  if (!host) {
    throw new Error("Organizer not found");
  }

  return {
    ...host.toObject(),
    id: host._id.toString(),
    Olympiads: host.Olympiads.map((olympiad: any) => ({
      id: olympiad._id.toString(),
      name: olympiad.name,
      description: olympiad.description || "",
      closeDay: olympiad.closeDay || "",
      location: olympiad.location || "",
      organizer: olympiad.organizer ? {
        id: olympiad.organizer._id?.toString() || olympiad.organizer.id,
        organizationName: olympiad.organizer.organizationName || "",
        email: olympiad.organizer.email || "",
        Olympiads: [] // This would need to be populated separately if needed
      } : null,
      classtypes: olympiad.classtypes.map((classType: any) => ({
        id: classType._id.toString(),
        classYear: classType.classYear,
        classRoomId: classType.classRoomId || null,
        maxScore: classType.maxScore,
        questions: classType.questions.map((question: any) => ({
          id: question._id.toString(),
          classTypeId: question.classTypeId?.toString() || classType._id.toString(),
          questionName: question.questionName,
          maxScore: question.maxScore
        })),
        medalists: classType.medalists || 0,
        participants: classType.participants || [],
        studentsAnswers: classType.studentsAnswers || [],
        olympiadId: classType.olympiadId?.toString() || olympiad._id.toString(),
        bestMaterials: classType.bestMaterials || [],
        gold: classType.gold || [],
        silver: classType.silver || [],
        bronze: classType.bronze || [],
        top10: classType.top10 || [],
      })),
      participants: olympiad.participants || [],
      scoreOfAward: olympiad.scoreOfAward || 0,
      status: olympiad.status || "PENDING",
      rankingType: olympiad.rankingType || "SCORE",
      invitation: olympiad.invitation || false,
      occurringDay: olympiad.occurringDay || ""
    })) || []
  };
};