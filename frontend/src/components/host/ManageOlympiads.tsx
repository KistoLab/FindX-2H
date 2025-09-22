"use client";

import { useState, useEffect } from "react";
import { 
  useAllOlympiadsQuery,
  useUpdateOlympiadComprehensiveMutation,
  useDeleteOlympiadMutation,
  useAllClassRoomsQuery,
  Olympiad,
  ClassYear,
  OlympiadStatus,
  OlympiadRankingType
} from "@/generated";
import { getRankingTypeDisplayName } from "@/utils/rankingUtils";
import { OlympiadEditModal } from "./OlympiadEditModal";

interface ManageOlympiadsProps {
  organizerId: string;
}

export const ManageOlympiads = ({ organizerId }: ManageOlympiadsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rankingFilter, setRankingFilter] = useState<string>("all");
  const [selectedOlympiad, setSelectedOlympiad] = useState<Olympiad | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, loading, error, refetch } = useAllOlympiadsQuery();
  const [updateOlympiadComprehensive] = useUpdateOlympiadComprehensiveMutation();
  const [deleteOlympiad] = useDeleteOlympiadMutation();
  const { data: classRoomsData } = useAllClassRoomsQuery();

  // Filter olympiads for this organizer
  const myOlympiads = data?.allOlympiads?.filter(olympiad => 
    olympiad.organizer?.id === organizerId
  ) || [];

  const filteredOlympiads = myOlympiads.filter((olympiad) => {
    const matchesSearch = 
      olympiad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      olympiad.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (olympiad.location?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesStatus = statusFilter === "all" || olympiad.status === statusFilter;
    const matchesRanking = rankingFilter === "all" || olympiad.rankingType === rankingFilter;
    
    return matchesSearch && matchesStatus && matchesRanking;
  });

  const getStatusColor = (status: OlympiadStatus) => {
    switch (status) {
      case OlympiadStatus.Draft:
        return "bg-gray-100 text-gray-800 border-gray-200";
      case OlympiadStatus.UnderReview:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case OlympiadStatus.Open:
        return "bg-green-100 text-green-800 border-green-200";
      case OlympiadStatus.Closed:
        return "bg-red-100 text-red-800 border-red-200";
      case OlympiadStatus.Finished:
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusIcon = (status: OlympiadStatus) => {
    switch (status) {
      case OlympiadStatus.Draft:
        return "📝";
      case OlympiadStatus.UnderReview:
        return "⏳";
      case OlympiadStatus.Open:
        return "✅";
      case OlympiadStatus.Closed:
        return "❌";
      case OlympiadStatus.Finished:
        return "🏆";
      default:
        return "❓";
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getClassYearDisplay = (classYear: ClassYear) => {
    const yearMap: { [key in ClassYear]: string } = {
      [ClassYear.Grade_1]: "Grade 1",
      [ClassYear.Grade_2]: "Grade 2",
      [ClassYear.Grade_3]: "Grade 3",
      [ClassYear.Grade_4]: "Grade 4",
      [ClassYear.Grade_5]: "Grade 5",
      [ClassYear.Grade_6]: "Grade 6",
      [ClassYear.Grade_7]: "Grade 7",
      [ClassYear.Grade_8]: "Grade 8",
      [ClassYear.Grade_9]: "Grade 9",
      [ClassYear.Grade_10]: "Grade 10",
      [ClassYear.Grade_11]: "Grade 11",
      [ClassYear.Grade_12]: "Grade 12",
      [ClassYear.CClass]: "C Class",
      [ClassYear.DClass]: "D Class",
      [ClassYear.EClass]: "E Class",
      [ClassYear.FClass]: "F Class",
    };
    return yearMap[classYear] || classYear;
  };

  const handleQuickStatusUpdate = async (olympiadId: string, newStatus: OlympiadStatus) => {
    try {
      await updateOlympiadComprehensive({
        variables: {
          updateOlympiadComprehensiveId: olympiadId,
          input: { status: newStatus }
        }
      });
      refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const handleDelete = async (olympiadId: string) => {
    if (!window.confirm("Are you sure you want to delete this olympiad? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteOlympiad({
        variables: { deleteOlympiadId: olympiadId }
      });
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (olympiad: any) => {
    setSelectedOlympiad(olympiad);
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-12 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"></div>
          <div className="text-muted-foreground font-medium">
            Loading your olympiads...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Error Loading Data</h3>
        <p className="text-muted-foreground mb-4">There was an error loading your olympiads.</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!myOlympiads || myOlympiads.length === 0) {
    return (
      <div className="bg-card rounded-2xl shadow-xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">No Olympiads Yet</h3>
        <p className="text-muted-foreground">You haven&apos;t created any olympiad requests yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Manage Olympiads</h2>
            <p className="text-muted-foreground">Manage and update your olympiad competitions</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{myOlympiads.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {myOlympiads.filter(o => o.status === OlympiadStatus.Open).length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {myOlympiads.filter(o => o.status === OlympiadStatus.UnderReview).length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search olympiads, locations, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value={OlympiadStatus.Draft}>Draft</option>
              <option value={OlympiadStatus.UnderReview}>Under Review</option>
              <option value={OlympiadStatus.Open}>Open</option>
              <option value={OlympiadStatus.Closed}>Closed</option>
              <option value={OlympiadStatus.Finished}>Finished</option>
            </select>
            <select 
              value={rankingFilter}
              onChange={(e) => setRankingFilter(e.target.value)}
              className="px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              <option value="all">All Rankings</option>
              <option value={OlympiadRankingType.School}>School Level</option>
              <option value={OlympiadRankingType.District}>District Level</option>
              <option value={OlympiadRankingType.Regional}>Regional Level</option>
              <option value={OlympiadRankingType.National}>National Level</option>
              <option value={OlympiadRankingType.ATier}>A Tier</option>
              <option value={OlympiadRankingType.BTier}>B Tier</option>
              <option value={OlympiadRankingType.CTier}>C Tier</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredOlympiads.length} of {myOlympiads.length} olympiads
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredOlympiads.length > 0 && (
            <span className="text-primary font-medium">
              {filteredOlympiads.filter(o => o.status === OlympiadStatus.Open).length} active
            </span>
          )}
        </div>
      </div>

      {/* Olympiad Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOlympiads.map((olympiad) => (
          <div
            key={olympiad.id}
            className="bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
                    {olympiad.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {olympiad.description}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(olympiad.status)}`}>
                {getStatusIcon(olympiad.status)} {olympiad.status.replace('_', ' ')}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{olympiad.location}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Close: {formatDate(olympiad.closeDay)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Event: {formatDate(olympiad.occurringDay)}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ranking: {getRankingTypeDisplayName(olympiad.rankingType)}</span>
              </div>
            </div>

            {/* Class Types Summary */}
            {olympiad.classtypes && olympiad.classtypes.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Class Types:</h4>
                <div className="flex flex-wrap gap-1">
                  {olympiad.classtypes.slice(0, 3).map((classType) => (
                    <span
                      key={classType.id}
                      className="bg-muted/50 rounded-md px-2 py-1 text-xs"
                    >
                      {getClassYearDisplay(classType.classYear)}
                    </span>
                  ))}
                  {olympiad.classtypes.length > 3 && (
                    <span className="bg-muted/50 rounded-md px-2 py-1 text-xs">
                      +{olympiad.classtypes.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <select
                value={olympiad.status}
                onChange={(e) => handleQuickStatusUpdate(olympiad.id, e.target.value as OlympiadStatus)}
                className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-foreground hover:bg-accent transition-colors"
              >
                <option value={OlympiadStatus.Draft}>Draft</option>
                <option value={OlympiadStatus.UnderReview}>Under Review</option>
                <option value={OlympiadStatus.Open}>Open</option>
                <option value={OlympiadStatus.Closed}>Closed</option>
                <option value={OlympiadStatus.Finished}>Finished</option>
              </select>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(olympiad)}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm flex items-center space-x-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(olympiad.id)}
                  disabled={isDeleting}
                  className="px-3 py-1 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && selectedOlympiad && (
        <OlympiadEditModal
          olympiad={selectedOlympiad as any}
          isOpen={isEditing}
          onClose={() => {
            setIsEditing(false);
            setSelectedOlympiad(null);
          }}
          onRefetch={refetch}
        />
      )}
    </div>
  );
};
