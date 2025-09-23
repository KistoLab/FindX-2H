"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/PageTransition";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Calendar,
  Trophy,
  MapPin,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import { useAllOlympiadsQuery } from "@/generated";

const formatClassYear = (classYear: string | null | undefined) => {
  if (!classYear) return "Unknown";

  const classYearMapping: { [key: string]: string } = {
    GRADE_1: "1р анги",
    GRADE_2: "2р анги",
    GRADE_3: "3р анги",
    GRADE_4: "4р анги",
    GRADE_5: "5р анги",
    GRADE_6: "6р анги",
    GRADE_7: "7р анги",
    GRADE_8: "8р анги",
    GRADE_9: "9р анги",
    GRADE_10: "10р анги",
    GRADE_11: "11р анги",
    GRADE_12: "12р анги",
    C_CLASS: "C анги",
    D_CLASS: "D анги",
    E_CLASS: "E анги",
    F_CLASS: "F анги",
  };

  return classYearMapping[classYear] || classYear;
};

const formatDateWithFallback = (dateString: string | null | undefined, fallbackText: string = "Тодорхойгүй") => {
  if (!dateString) return fallbackText;

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Буруу огноо";
    }

    // Use Mongolian locale for better formatting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  } catch (error) {
    console.error("Date formatting error:", error, "for date:", dateString);
    return "Буруу огноо";
  }
};

const getStatusDisplayName = (status: string) => {
  switch (status) {
    case "OPEN":
      return "Нээлттэй";
    case "CLOSED":
      return "Бүртгэл дууссан";
    case "FINISHED":
      return "Дууссан";
    case "DRAFT":
      return "Draft";
    default:
      return status;
  }
};

export const Olympiad = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("OPEN");
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});

  const { data, loading, error } = useAllOlympiadsQuery({
    // Add error policy to handle network issues
    errorPolicy: 'ignore',
    // Completely bypass cache to prevent stale data
    fetchPolicy: 'no-cache',
    // Disable cache for this query
    notifyOnNetworkStatusChange: false,
  });

  const DESCRIPTION_LIMIT = 150;

  const toggleDescription = (olympiadId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setExpandedDescriptions((prev) => ({
      ...prev,
      [olympiadId]: !prev[olympiadId],
    }));
  };

  const olympiads = data?.allOlympiads || [];
  const statusTypes = ["OPEN", "CLOSED", "FINISHED"];
  const filteredOlympiads = olympiads.filter(
    (olympiad) => olympiad.status === selectedStatus
  );





  // Show loading state during data loading
  if (loading) {
    return (
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Олимпиадуудын мэдээлэл
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Олимпиадуудыг ачааллаж байна...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Олимпиадуудын мэдээлэл
            </h2>
            <p className="text-lg text-red-500 max-w-2xl mx-auto">
              Олимпиадуудын мэдээлэл олдох боломжгүй: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (olympiads.length === 0) {
    return (
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Олимпиадуудын мэдээлэл
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Одоогоор олимпиадууд олдсонгүй. Дахин оролдоно уу.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Олимпиадуудын мэдээлэл
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Академик тэмцээнүүдэд оролцож, шилдэг сургуулийн сурагчидтай өрсөлдөн ур
            чадвараа сорино уу.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {statusTypes.map((status) => {
            const isSelected = selectedStatus === status;

            return (
              <Button
                key={status}
                variant={isSelected ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedStatus(status)}
                className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${isSelected
                    ? "bg-[#ff8400] hover:bg-[#ff8400] text-white"
                    : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-[#ff8400]/50 shadow-sm hover:text-[#ff8400]"
                  }
              `}
              >
                <Star className="w-5 h-5" />
                {getStatusDisplayName(status)}
              </Button>
            );
          })}
        </div>

        {filteredOlympiads.length === 0 ? (
          <div className="text-center py-16 ">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-[#ff8400]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {getStatusDisplayName(selectedStatus).charAt(0).toUpperCase() + getStatusDisplayName(selectedStatus).slice(1)}{" "} олимпиадууд олдсонгүй.
              </h3>
              <p className="text-gray-600 mb-4">
                {getStatusDisplayName(selectedStatus).charAt(0).toUpperCase() + getStatusDisplayName(selectedStatus).slice(1)} олимпиадууд олдсонгүй. Дахин оролдоно уу.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {filteredOlympiads.map((olympiad) => {
              const isExpanded = expandedDescriptions[olympiad.id];
              const shouldTruncate =
                olympiad.description && olympiad.description.length > DESCRIPTION_LIMIT;
              const displayDescription =
                shouldTruncate && !isExpanded
                  ? olympiad.description.substring(0, DESCRIPTION_LIMIT) + "..."
                  : olympiad.description || "Тайлбар байхгүй";

              return (
                <Card
                  key={olympiad.id}
                  className="bg-white flex flex-col border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
                >
                  <div className="relative h-20 bg-gradient-to-r from-[#ff8400] to-[#ff8400] overflow-hidden">
                    <div className="absolute top-4 left-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    {olympiad.rankingType === "NATIONAL" && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-white text-[#ff8400] border-0 flex items-center gap-1 shadow-lg font-semibold">
                          <Star className="w-3 h-3" />
                          Онцолсон
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-3 flex-grow">
                    <CardTitle className="text-lg font-bold text-black mb-2">
                      {olympiad.name}
                    </CardTitle>
                    <CardDescription className="text-black leading-relaxed mb-3">
                      {displayDescription}
                      {shouldTruncate && (
                        <button
                          onClick={(e) => toggleDescription(olympiad.id, e)}
                          className="ml-2 text-[#ff8400] hover:text-[#ff8400] font-medium transition-colors duration-200 inline-block"
                        >
                          {isExpanded ? "Буцах" : "Дэлгэрэнгүй"}
                        </button>
                      )}
                    </CardDescription>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="space-y-1 p-2 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 text-sm text-black">
                          <Calendar className="w-4 h-4 text-[#ff8400]" />
                          <span className="font-medium">Олимпиадын огноо</span>
                        </div>
                        <div className="text-black pl-6">
                          {formatDateWithFallback(olympiad.occurringDay, "Огноо тодорхойгүй")}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-black mt-1">
                          <Trophy className="w-4 h-4 text-[#ff8400]" />
                          <span className="font-medium">Анги</span>
                        </div>
                        <div className="text-black pl-6">
                          {olympiad.classtypes && olympiad.classtypes.length > 0
                            ? olympiad.classtypes
                              .map((classtype) =>
                                formatClassYear(classtype.classYear)
                              )
                              .join(", ")
                            : "Тодорхойгүй"}
                        </div>
                      </div>

                      <div className="space-y-1 p-2 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 text-sm text-black">
                          <MapPin className="w-4 h-4 text-[#ff8400]" />
                          <span className="font-medium">Байршил</span>
                        </div>
                        <div className="text-black pl-6">
                          {olympiad.location || "Тодорхойгүй"}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-black mt-1">
                          <Clock className="w-4 h-4 text-[#ff8400]" />
                          <span className="font-medium">Бүртгүүлэх хугацаа</span>
                        </div>
                        <div className="text-black pl-6">
                          {formatDateWithFallback(olympiad.closeDay, "Хугацаа тодорхойгүй")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardFooter className="pt-2 pb-2 bg-white rounded-b-lg flex justify-center items-center">
                    {(olympiad.status === "FINISHED" || olympiad.status === "CLOSED" || olympiad.status === "OPEN") && (
                      <PageTransition href={`/olympiad/${olympiad.id}`}>
                        <Button
                          variant="outline"
                          className="bg-[#ff8400] text-white font-medium px-8"
                        >
                          Дэлгэрэнгүй
                        </Button>
                      </PageTransition>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            onClick={() => router.push("/olympiads")}
            className="bg-white  text-black border flex items-center gap-2 mx-auto hover:bg-[#ff8400] hover:text-white"
          >
            Бүх олимпиадууд үзэх
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};