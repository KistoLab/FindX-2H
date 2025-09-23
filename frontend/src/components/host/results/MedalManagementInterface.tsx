"use client";

import React, { useState, useEffect } from "react";
import { useAlert } from "@/components/ui/alert-system";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface MedalManagementInterfaceProps {
  olympiad: any;
  classTypes: any[];
  medalPreviews?: any[]; // Auto-generated medal previews
  onFinalizeMedals: () => void;
  onUpdateMedalAssignments: (variables: any) => Promise<any>;
  onBack: () => void;
  onRefreshMedalPreviews?: () => void;
}

export const MedalManagementInterface: React.FC<
  MedalManagementInterfaceProps
> = ({
  olympiad,
  classTypes,
  medalPreviews = [],
  onFinalizeMedals,
  onUpdateMedalAssignments,
  onBack,
  onRefreshMedalPreviews,
}) => {
  const [selectedClassType, setSelectedClassType] = useState<string>("");
  const [medalAssignments, setMedalAssignments] = useState<any>({});
  const [showFinalizeConfirm, setShowFinalizeConfirm] =
    useState<boolean>(false);
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false);
  const { showSuccess, showError } = useAlert();

  const selectedClassTypeData = classTypes.find(
    (ct) => ct.id === selectedClassType
  );

  const handleFinalizeConfirm = async () => {
    setShowFinalizeConfirm(false);
    setIsFinalizing(true);
    try {
      await onFinalizeMedals();
    } catch (error) {
      console.error("Error finalizing medals:", error);
    } finally {
      setIsFinalizing(false);
    }
  };

  // Get medal preview data for the selected class type
  const selectedMedalPreview = medalPreviews.find(
    (preview) => preview.classTypeId === selectedClassType
  );

  // Debug logging
  React.useEffect(() => {
    console.log("MedalManagementInterface - medalPreviews:", medalPreviews);
    console.log(
      "MedalManagementInterface - selectedClassType:",
      selectedClassType
    );
    console.log(
      "MedalManagementInterface - selectedMedalPreview:",
      selectedMedalPreview
    );
  }, [medalPreviews, selectedClassType, selectedMedalPreview]);

  // Initialize medal assignments from classType data or preview data
  React.useEffect(() => {
    if (selectedClassTypeData && !medalAssignments[selectedClassType]) {
      setMedalAssignments((prev: any) => ({
        ...prev,
        [selectedClassType]: {
          gold: selectedClassTypeData.gold || [],
          silver: selectedClassTypeData.silver || [],
          bronze: selectedClassTypeData.bronze || [],
          top10: selectedClassTypeData.top10 || [],
        },
      }));
    }
  }, [selectedClassType, selectedClassTypeData]);

  const handleMedalAssignment = (
    classTypeId: string,
    medalType: "gold" | "silver" | "bronze" | "top10",
    studentId: string,
    assigned: boolean
  ) => {
    setMedalAssignments((prev: any) => ({
      ...prev,
      [classTypeId]: {
        ...prev[classTypeId],
        [medalType]: assigned
          ? [...(prev[classTypeId]?.[medalType] || []), studentId]
          : (prev[classTypeId]?.[medalType] || []).filter(
              (id: string) => id !== studentId
            ),
      },
    }));
  };

  const handleSaveMedalAssignments = async () => {
    if (!selectedClassType) return;

    const assignments = Object.entries(medalAssignments).map(
      ([classTypeId, medals]: [string, any]) => ({
        classTypeId,
        gold: medals.gold || [],
        silver: medals.silver || [],
        bronze: medals.bronze || [],
        top10: medals.top10 || [],
      })
    );

    try {
      const result = await onUpdateMedalAssignments({
        variables: {
          olympiadId: olympiad.id,
          assignments,
        },
      });

      if (result.data?.updateMedalAssignments?.success) {
        showSuccess("Медалийн олгох мэдээлэл амжилттай шинэчлэгдлээ!");
      } else {
        showError(
          `Медалийн олгох мэдээлэл шинэчлэхэд алдаа гарлаа: ${
            result.data?.updateMedalAssignments?.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Error updating medal assignments:", error);
      showError(
        `Медалийн олгох мэдээлэл шинэчлэхэд алдаа гарлаа: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );

    }
  };

  const getMedalIcon = (medalType: string) => {
    switch (medalType) {
      case "gold":
        return "🥇";
      case "silver":
        return "🥈";
      case "bronze":
        return "🥉";
      case "top10":
        return "🏆";
      default:
        return "🏅";
    }
  };

  const getMedalColor = (medalType: string) => {
    switch (medalType) {
      case "gold":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "silver":
        return "text-gray-600 bg-gray-50 border-gray-200";
      case "bronze":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "top10":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const getMedalColorTable = (medalType: string) => {
    switch (medalType) {
      case "gold":
        return "bg-yellow-500 border-yellow-200";
      case "silver":
        return " bg-gray-500 border-gray-200";
      case "bronze":
        return "bg-orange-500 border-orange-200";
      case "top10":
        return "bg-blue-500 border-blue-200";
      default:
        return "bg-blue-500 border-blue-200";
    }
  };

  if (!olympiad) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground">Медаль олгох</h3>
          <p className="text-muted-foreground">
            {olympiad.name} дүн хариуг нэгтгэх
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {onRefreshMedalPreviews && (
            <button
              onClick={onRefreshMedalPreviews}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </button>
          )}
          <button
            onClick={onBack}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Буцах</span>
          </button>
        </div>
      </div>

      {/* Status Information */}
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-primary">
            Төлөв: {olympiad.status}
          </h4>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              olympiad.status === "MEDALS_PREVIEW"
                ? "bg-purple-100 text-purple-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {olympiad.status === "MEDALS_PREVIEW"
              ? "Хянагдахад бэлэн"
              : "Дууссан"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {olympiad.status === "MEDALS_PREVIEW"
            ? "Медалийн хуваарилалт автоматаар үүсгэгдлээ. Эцэслэхийн өмнө шалгаж, шаардлагатай бол өөрчлөлт оруулна уу."
            : "Медалийн хуваарилалт эцэслэгдэж, сурагчдад мэдэгдсэн."}
        </p>
      </div>

      {/* Class Type Selection */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">
          Медаль олгох ангиллаа сонгоно уу.{" "}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classTypes.map((classType) => (
            <div
              key={classType.id}
              className={`bg-card rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                selectedClassType === classType.id
                  ? "border-primary shadow-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedClassType(classType.id)}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">
                  {classType.classYear.replace("GRADE_", "")} Анги
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  {classType.participants?.length || 0} оролцогч
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Боломжит оноо:
                    </span>
                    <span className="font-medium">{classType.maxScore}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Медалийн тоо:</span>
                    <span className="font-medium">{classType.medalists}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medal Assignment Interface */}
      {selectedClassTypeData && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-foreground">

              Медалийн оноолт -{" "}
              {selectedClassTypeData.classYear.replace("GRADE_", "")}р анги

            </h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveMedalAssignments}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >

                Өөрчлөлт хадгалах

              </button>
            </div>
          </div>

          {/* Medal Distribution Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {["gold", "silver", "bronze", "top10"].map((medalType) => {
              const count =
                medalAssignments[selectedClassType]?.[medalType]?.length || 0;
              return (
                <div
                  key={medalType}
                  className={`rounded-xl p-4 border-2 ${getMedalColor(
                    medalType
                  )}`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">
                      {getMedalIcon(medalType)}
                    </div>
                    <h5 className="font-semibold capitalize mb-1">
                      {medalType === "top10" ? "Top 10" : `${medalType} Medal`}
                    </h5>
                    <div className="text-lg font-bold">{count}</div>
                    <div className="text-xs text-muted-foreground">
                      {medalType === "gold" && "1-р байр"}
                      {medalType === "silver" && "2-р байр"}
                      {medalType === "bronze" && "3-р байр"}
                      {medalType === "top10" && "эхний 10 байр"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Auto-Assigned Preview Info */}
          {selectedMedalPreview && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-blue-600">ℹ️</div>

                <h5 className="font-semibold text-blue-800">Автоматаар оноосон медалиуд</h5>
              </div>
              <p className="text-sm text-blue-700">
              Сурагчдын оноонд үндэслэн медалиуд автоматаар оноогдсон.
              Эцэслэхийн өмнө доорх оноолтыг шалгаж, шаардлагатай бол өөрчлөлт оруулна уу

              </p>
              <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                <div>Алт: {selectedMedalPreview.gold?.length || 0}</div>
                <div>Мөнгө: {selectedMedalPreview.silver?.length || 0}</div>
                <div>Хүрэл: {selectedMedalPreview.bronze?.length || 0}</div>
                <div>Топ 10: {selectedMedalPreview.top10?.length || 0}</div>
              </div>
            </div>
          )}

          {/* Student Rankings and Medal Assignment */}
          <div className="space-y-4">
            <h5 className="font-medium text-foreground">Нэгтгэгдсэн дүн</h5>

            {/* Show students from medal preview if available, otherwise from participants */}
            {selectedMedalPreview ? (
              <div className="space-y-2">
                {/* Show all students from preview (ranked by score) */}
                {selectedMedalPreview.top10?.map(
                  (student: any, index: number) => (
                    <div
                      key={student.studentId}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {student.rank}
                          </span>
                        </div>

                        <div>
                          <div className="font-medium text-foreground">
                            {student.studentName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Score: {student.score} | Rank #{student.rank}
                          </div>

                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ">
                        {["gold", "silver", "bronze", "top10"].map(
                          (medalType) => (
                            <button
                              key={medalType}
                              onClick={() =>
                                handleMedalAssignment(
                                  selectedClassType,
                                  medalType as
                                    | "gold"
                                    | "silver"
                                    | "bronze"
                                    | "top10",
                                  student.studentId,
                                  !medalAssignments[selectedClassType]?.[
                                    medalType
                                  ]?.includes(student.studentId)
                                )
                              }
                              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-200 transform hover:scale-110 active:scale-95 cursor-pointer ${
                                medalAssignments[selectedClassType]?.[
                                  medalType
                                ]?.includes(student.studentId)
                                  ? `${getMedalColorTable(
                                      medalType
                                    )} border-4 border-opacity-100 shadow-2xl ring-4 ring-opacity-30 scale-105`
                                  : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border-2 border-gray-400 hover:from-gray-200 hover:to-gray-300 hover:border-gray-600 hover:text-gray-800 hover:shadow-lg hover:scale-105"
                              }`}
                            >
                              {getMedalIcon(medalType)}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {selectedClassTypeData.participants
                  ?.slice(0, 10)
                  .map((studentId: string, index: number) => (
                    <div
                      key={studentId}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            Student {studentId.slice(-4)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Rank #{index + 1}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {["gold", "silver", "bronze", "top10"].map(
                          (medalType) => (
                            <button
                              key={medalType}
                              onClick={() =>
                                handleMedalAssignment(
                                  selectedClassType,
                                  medalType as
                                    | "gold"
                                    | "silver"
                                    | "bronze"
                                    | "top10",
                                  studentId,
                                  !medalAssignments[selectedClassType]?.[
                                    medalType
                                  ]?.includes(studentId)
                                )
                              }
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 ${
                                medalAssignments[selectedClassType]?.[
                                  medalType
                                ]?.includes(studentId)
                                  ? getMedalColorTable(medalType)
                                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                              }`}
                            >
                              {getMedalIcon(medalType)}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Finalize Button */}
      {olympiad.status === "MEDALS_PREVIEW" && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Ready to Finalize Medals?
            </h4>
            <p className="text-muted-foreground mb-4">
              Once finalized, medal assignments will be sent to students and
              cannot be changed.
            </p>
            <button
              onClick={() => setShowFinalizeConfirm(true)}
              disabled={isFinalizing}
              className={`px-8 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg ${
                isFinalizing
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isFinalizing ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Finalizing Medals...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Finalize All Medals</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Finalize Confirmation Modal */}
      <Modal
        isOpen={showFinalizeConfirm}
        onClose={() => setShowFinalizeConfirm(false)}
        title="⚠️ Finalize All Medals"
        size="md"
        closeOnBackdropClick={false}
        closeOnEscape={true}
        className="bg-white"
      >
        <ModalContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Are you absolutely sure?
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    <strong className="text-gray-900">
                      This action cannot be undone!
                    </strong>{" "}
                    Once you finalize the medals:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                    <li>Medal assignments will be permanently saved</li>
                    <li>Students will receive their medal notifications</li>
                    <li>Olympiad status will change to "FINISHED"</li>
                    <li>
                      No further changes to medal assignments will be possible
                    </li>
                  </ul>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start space-x-2">
                      <svg
                        className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <p className="text-amber-800 font-medium">
                        Please double-check all medal assignments before
                        proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setShowFinalizeConfirm(false)}
            className="flex-1 sm:flex-none border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleFinalizeConfirm}
            disabled={isFinalizing}
            className={`flex-1 sm:flex-none border-0 ${
              isFinalizing
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isFinalizing ? (
              <>
                <svg
                  className="w-4 h-4 mr-2 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Finalizing...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Yes, Finalize All Medals
              </>
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
