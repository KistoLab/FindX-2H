"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Medal,
  Trophy,
  Star,
  Crown,
  Award,
  School,
  MapPin,
  Eye,
} from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useStudentRanking } from "@/hooks/useStudentRanking";
import { useAllOlympiadsQuery } from "@/generated";
import { getRankingTypeDisplayName } from "@/utils/rankingUtils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const getMedalStats = (students: any[]) => {
  const goldStudents = students.filter(
    (student) => student.goldCount > 0
  ).length;
  const silverStudents = students.filter(
    (student) => student.silverCount > 0
  ).length;
  const bronzeStudents = students.filter(
    (student) => student.bronzeCount > 0
  ).length;

  return {
    gold: { count: goldStudents, icon: Crown, color: "text-yellow-600" },
    silver: { count: silverStudents, icon: Trophy, color: "text-gray-400" },
    bronze: { count: bronzeStudents, icon: Star, color: "text-amber-600" },
  };
};

const getTierIcon = (ranking: number) => {
  if (ranking <= 10) {
    return <Crown className="w-5 h-5 text-yellow-600" />;
  } else if (ranking <= 50) {
    return <Trophy className="w-5 h-5 text-orange-600" />;
  } else if (ranking <= 100) {
    return <Star className="w-5 h-5 text-purple-600" />;
  } else {
    return <Award className="w-5 h-5 text-gray-600" />;
  }
};

const getStudentOlympiads = (student: any) => {
  const olympiads = new Set();

  // Add olympiads where student won gold medals
  if (student.gold && Array.isArray(student.gold)) {
    student.gold.forEach((olympiad: string) => olympiads.add(olympiad));
  }

  // Add olympiads where student won silver medals
  if (student.silver && Array.isArray(student.silver)) {
    student.silver.forEach((olympiad: string) => olympiads.add(olympiad));
  }

  // Add olympiads where student won bronze medals
  if (student.bronze && Array.isArray(student.bronze)) {
    student.bronze.forEach((olympiad: string) => olympiads.add(olympiad));
  }

  return Array.from(olympiads);
};

export const StudentsRanking = () => {
  const [searchStudentsName, setSearchStudentsName] = useState("");
  const [selectedCity, setSelectedCity] = useState("GRADE_12");
  const [selectedOrg, setSelectedOrg] = useState("All Provinces");
  const [selectedRankingType, setSelectedRankingType] =
    useState("All Olympiad Types");
  const [selectedOlympiads, setSelectedOlympiads] = useState<any[]>([]);
  const [displayCount, setDisplayCount] = useState(10);

  const router = useRouter();

  const { data: allOlympiadsData } = useAllOlympiadsQuery();

  const handleClick = (id: string) => {
    router.push(`/student/${id}`);
  };

  const handleViewOlympiads = (student: any, event: React.MouseEvent) => {
    event.stopPropagation();

    const olympiadIds = getStudentOlympiads(student);

    const olympiadDetails = olympiadIds
      .map((olympiadId: any) => {
        const olympiad = allOlympiadsData?.allOlympiads?.find(
          (o: any) => o.id === olympiadId
        );

        if (olympiad) {
          let medalType = "";
          let medalColor = "";
          let medalCount = 0;

          if (student.gold?.includes(olympiadId)) {
            medalType = "Алт";
            medalColor = "text-yellow-600";
            medalCount = student.gold.filter(
              (id: string) => id === olympiadId
            ).length;
          } else if (student.silver?.includes(olympiadId)) {
            medalType = "Мөнгө";
            medalColor = "text-gray-500";
            medalCount = student.silver.filter(
              (id: string) => id === olympiadId
            ).length;
          } else if (student.bronze?.includes(olympiadId)) {
            medalType = "Хүрэл";
            medalColor = "text-amber-600";
            medalCount = student.bronze.filter(
              (id: string) => id === olympiadId
            ).length;
          }

          return {
            id: olympiadId,
            name: olympiad.name,
            medalType,
            medalColor,
            medalCount,
            rankingType: olympiad.rankingType,
            location: olympiad.location,
          };
        }
        return null;
      })
      .filter(Boolean);

    setSelectedOlympiads(olympiadDetails);
  };

  const { allStudents, loading, error } = useStudentRanking();

  console.log("yu yu nbaina:", allStudents);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStudentsName(event.target.value);
    setDisplayCount(10); // Reset display count when searching
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  const filteredUsers = allStudents
    .filter((user) => {
      const matchesName = user.name
        ?.toLowerCase()
        .includes(searchStudentsName.toLowerCase());
      const matchesClass =
        selectedCity === "All Classes" || user.class === selectedCity;
      const matchesProvince =
        selectedOrg === "All Provinces" || user.province === selectedOrg;

      // Filter by Olympiad ranking type
      const matchesRankingType =
        selectedRankingType === "All Olympiad Types" ||
        (() => {
          if (!allOlympiadsData?.allOlympiads) return true;

          const userOlympiadIds = getStudentOlympiads(user);
          return userOlympiadIds.some((olympiadId: any) => {
            const olympiad = allOlympiadsData.allOlympiads.find(
              (o: any) => o.id === olympiadId
            );
            return olympiad?.rankingType === selectedRankingType;
          });
        })();

      return (
        matchesName && matchesClass && matchesProvince && matchesRankingType
      );
    })
    .sort((a, b) => b.totalMedals - a.totalMedals); // Sort by points (total medals) descending

  const displayedUsers = filteredUsers.slice(0, displayCount);
  const hasMoreUsers = displayCount < filteredUsers.length;

  const medalStats = getMedalStats(filteredUsers);

  const uniqueClasses = Array.from(
    new Set(allStudents.map((student) => student.class))
  ).filter(Boolean);
  const uniqueProvinces = Array.from(
    new Set(allStudents.map((student) => student.province))
  ).filter(Boolean);

  // Get unique ranking types from all olympiads
  const uniqueRankingTypes = Array.from(
    new Set(
      allOlympiadsData?.allOlympiads
        ?.map((olympiad: any) => olympiad.rankingType)
        .filter(Boolean)
    )
  );

  return (
    <div className=" bg-black p-6">
      <div className="max-w-6xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            Student Rankings
          </h1>

          <div className="flex flex-wrap gap-6 mb-8">
            {Object.entries(medalStats).map(([medalType, stats]) => {
              const IconComponent = stats.icon;
              return (
                <div key={medalType} className="flex items-center gap-2">
                  <IconComponent className={`w-6 h-6 ${stats.color}`} />
                  <span className="text-lg font-semibold text-gray-300">
                    {stats.count}{" "}
                    {medalType.charAt(0).toUpperCase() + medalType.slice(1)}{" "}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by username"
              value={searchStudentsName}
              onChange={handleChangeSearch}
              className=" pl-10  text-white bg-gray-800 border-gray-600 focus:outline-none  focus:border-orange-500 "
            />
          </div>

          <div className="flex gap-4 text-white">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4" />
              <Select
                value={selectedCity}
                onValueChange={(value) => {
                  setSelectedCity(value);
                  setDisplayCount(10); // Reset display count when filter changes
                }}
              >
                <SelectTrigger className="w-48 bg-gray-800 text-white border border-gray-600">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-600">
                  <SelectItem
                    value="All Classes"
                    className="text-white focus:bg-orange-500"
                  >
                    All Classes
                  </SelectItem>
                  {uniqueClasses.map((className) => (
                    <SelectItem
                      key={className}
                      value={className}
                      className="text-white focus:bg-orange-500"
                    >
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <Select
                value={selectedOrg}
                onValueChange={(value) => {
                  setSelectedOrg(value);
                  setDisplayCount(10); // Reset display count when filter changes
                }}
              >
                <SelectTrigger className="w-48 bg-gray-800 text-white border border-gray-600">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-600">
                  <SelectItem
                    value="All Provinces"
                    className="text-white focus:bg-orange-500"
                  >
                    All Provinces
                  </SelectItem>
                  {uniqueProvinces.map((province) => (
                    <SelectItem
                      key={province}
                      value={province}
                      className="text-white focus:bg-orange-500"
                    >
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <Select
                value={selectedRankingType}
                onValueChange={(value) => {
                  setSelectedRankingType(value);
                  setDisplayCount(10); // Reset display count when filter changes
                }}
              >
                <SelectTrigger className="w-48 bg-gray-800 text-white border border-gray-600">
                  <SelectValue placeholder="Select olympiad type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-600">
                  <SelectItem
                    value="All Olympiad Types"
                    className="text-white focus:bg-orange-500"
                  >
                    All Olympiad Types
                  </SelectItem>
                  {uniqueRankingTypes.map((rankingType) => (
                    <SelectItem
                      key={rankingType}
                      value={rankingType}
                      className="text-white focus:bg-orange-500"
                    >
                      {getRankingTypeDisplayName(rankingType)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Tier
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Medals
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Points
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Olympiads
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {displayedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => handleClick(user.id)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-white">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getTierIcon(user.ranking)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                          {user.profilePicture &&
                          user.profilePicture.trim() !== "" &&
                          user.profilePicture !== ".////" &&
                          (user.profilePicture.startsWith("http") ||
                            user.profilePicture.startsWith("/") ||
                            user.profilePicture.startsWith("data:")) ? (
                            <Image
                              src={user.profilePicture}
                              alt={user.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Hide the image and show fallback on error
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextElementSibling?.classList.remove(
                                  "hidden"
                                );
                              }}
                            />
                          ) : null}
                          <span
                            className={`text-gray-300 font-semibold text-lg ${
                              user.profilePicture &&
                              user.profilePicture.trim() !== "" &&
                              user.profilePicture !== ".////" &&
                              (user.profilePicture.startsWith("http") ||
                                user.profilePicture.startsWith("/") ||
                                user.profilePicture.startsWith("data:"))
                                ? "hidden"
                                : ""
                            }`}
                          >
                            {user.name?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-white text-lg">
                            {user.name}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {user.class || "Grade Unknown"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">-</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-300">
                            {user.goldCount}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {user.silverCount}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Medal className="w-4 h-4 text-amber-600" />
                          <span className="text-sm text-gray-300">
                            {user.bronzeCount}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-white">
                        {user.ranking}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                            onClick={(e) => handleViewOlympiads(user, e)}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-gray-800 text-white border border-gray-600 p-4 w-96">
                          <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-600" />
                            Шагнал авсан олимпиадууд
                          </h4>
                          {selectedOlympiads.length > 0 ? (
                            <div className="space-y-3">
                              {selectedOlympiads.map((olympiad: any, idx) => (
                                <div
                                  key={idx}
                                  className="border-l-4 border-gray-600 pl-3 py-2"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-white">
                                      {olympiad.name}
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${olympiad.medalColor} bg-gray-700`}
                                    >
                                      {olympiad.medalType}-{olympiad.medalCount}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-400 space-y-1">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-3 h-3" />
                                      <span>{olympiad.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Award className="w-3 h-3" />
                                      <span>
                                        {getRankingTypeDisplayName(
                                          olympiad.rankingType
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-400 text-sm text-center py-4">
                              Энэ сурагч шагнал авсан олимпиад байхгүй байна
                            </p>
                          )}
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {hasMoreUsers && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              className="px-6 py-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
