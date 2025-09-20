"use client";

import { useState } from "react";
import Stepper, { Step } from "../ui/Stepper";
import { ClassTypeSection } from "./ClassTypeSection";
import { DatePicker } from "../ui/date-picker";
import {
  type CreateClassTypeInput,
  OlympiadRankingType
} from "@/generated";

interface FormData {
  name: string;
  description: string;
  closeDay: string;
  occurringDay: string;
  location: string;
  organizerId: string;
  invitation: boolean;
  rankingType: OlympiadRankingType;
}

interface OlympiadFormProps {
  formData: FormData;
  classTypes: CreateClassTypeInput[];
  editingOlympiad?: any;
  onSubmit: (e: React.FormEvent) => void;
  onUpdateFormData: (field: string, value: string | boolean) => void;
  onUpdateClassType: (index: number, field: string, value: any) => void;
  onAddClassType: () => void;
  onRemoveClassType: (index: number) => void;
  onAddQuestion: (classTypeIndex: number) => void;
  onRemoveQuestion: (classTypeIndex: number, questionIndex: number) => void;
  onUpdateQuestion: (
    classTypeIndex: number,
    questionIndex: number,
    field: string,
    value: any
  ) => void;
  onResetForm: () => void;
  isSubmitting: boolean;
}

export const OlympiadForm = ({
  formData,
  classTypes,
  editingOlympiad,
  onSubmit,
  onUpdateFormData,
  onUpdateClassType,
  onAddClassType,
  onRemoveClassType,
  onAddQuestion,
  onRemoveQuestion,
  onUpdateQuestion,
  onResetForm,
  isSubmitting,
}: OlympiadFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleFinalSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.description || !formData.location || !formData.closeDay || !formData.occurringDay) {
      alert("Please fill in all required fields.");
      return;
    }

    if (classTypes.length === 0) {
      alert("Please add at least one class type.");
      return;
    }

    // Validate class types have questions and occuringTime
    console.log("Form validation - classTypes:", classTypes);
    for (let i = 0; i < classTypes.length; i++) {
      const classType = classTypes[i];
      console.log(`Validating classType ${i}:`, {
        questions: classType.questions,
        occuringTime: classType.occuringTime,
        occuringTimeType: typeof classType.occuringTime
      });
      
      if (classType.questions.length === 0) {
        alert(`Each class type must have at least one question. (Class Type ${i + 1})`);
        return;
      }
      if (!classType.occuringTime || classType.occuringTime.trim() === "") {
        alert(`Please provide an occurring time for Class Type ${i + 1}.`);
        return;
      }
    }

    // Use the onSubmit prop from the host page instead of direct mutation
    const mockEvent = new Event('submit') as any;
    onSubmit(mockEvent);
  };

  return (
    <div className="w-full">
      <Stepper
        initialStep={currentStep}
        onStepChange={(step) => {
          setCurrentStep(step);
        }}
        onFinalStepCompleted={handleFinalSubmit}
        backButtonText="Previous"
        nextButtonText="Next"
        nextButtonProps={{
          disabled: isSubmitting
        }}
      >
        {/* Step 1: Basic Information */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Olympiad Information</h2>
              <p className="text-sm text-muted-foreground">Enter the basic details for your olympiad</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Olympiad Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => onUpdateFormData("name", e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-background text-foreground"
                  placeholder="Enter olympiad name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => onUpdateFormData("description", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm bg-background text-foreground"
                  placeholder="Describe the olympiad event..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => onUpdateFormData("location", e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-background text-foreground"
                  placeholder="Enter event location"
                  required
                />
              </div>

            </div>
          </div>
        </Step>

        {/* Step 2: Dates and Settings */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Dates & Settings</h2>
              <p className="text-sm text-muted-foreground">Set the dates and configuration for your olympiad</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Registration Close Date *
                </label>
                <DatePicker
                  value={formData.closeDay}
                  onChange={(value) => onUpdateFormData("closeDay", value)}
                  placeholder="Select close date"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Olympiad Date *
                </label>
                <DatePicker
                  value={formData.occurringDay}
                  onChange={(value) => onUpdateFormData("occurringDay", value)}
                  placeholder="Select olympiad date"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ranking Type *
                </label>
                <select
                  value={formData.rankingType}
                  onChange={(e) => onUpdateFormData("rankingType", e.target.value as OlympiadRankingType)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-background text-foreground"
                  required
                >
                  <option value={OlympiadRankingType.School}>School Level</option>
                  <option value={OlympiadRankingType.District}>District Level</option>
                  <option value={OlympiadRankingType.Regional}>Regional Level</option>
                  <option value={OlympiadRankingType.National}>National Level</option>
                  <option value={OlympiadRankingType.ATier}>A Tier</option>
                  <option value={OlympiadRankingType.BTier}>B Tier</option>
                  <option value={OlympiadRankingType.CTier}>C Tier</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="invitation"
                  checked={formData.invitation}
                  onChange={(e) => onUpdateFormData("invitation", e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                />
                <label htmlFor="invitation" className="text-sm font-medium text-foreground">
                  Require invitation to participate
                </label>
              </div>
            </div>
          </div>
        </Step>

        {/* Step 3: Class Types and Questions */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Class Types & Questions</h2>
              <p className="text-sm text-muted-foreground">Configure the grade levels and questions for your olympiad</p>
            </div>

            <ClassTypeSection
              classTypes={classTypes}
              onUpdateClassType={onUpdateClassType}
              onAddClassType={onAddClassType}
              onRemoveClassType={onRemoveClassType}
              onAddQuestion={onAddQuestion}
              onRemoveQuestion={onRemoveQuestion}
              onUpdateQuestion={onUpdateQuestion}
              editingOlympiad={editingOlympiad}
            />
          </div>
        </Step>

        {/* Step 4: Review and Submit */}
        <Step>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Review & Submit</h2>
              <p className="text-sm text-muted-foreground">Review your olympiad details before submitting</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Olympiad Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="text-foreground font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground font-medium">{formData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration Closes:</span>
                  <span className="text-foreground font-medium">{new Date(formData.closeDay).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Olympiad Date:</span>
                  <span className="text-foreground font-medium">{new Date(formData.occurringDay).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class Types:</span>
                  <span className="text-foreground font-medium">{classTypes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions:</span>
                  <span className="text-foreground font-medium">
                    {classTypes.reduce((total, ct) => total + ct.questions.length, 0)}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};
