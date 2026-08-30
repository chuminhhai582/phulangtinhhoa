"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

export interface StepFormProps {
  steps: {
    id: string;
    title: string;
    description?: string;
    content: React.ReactNode;
  }[];
  onSave?: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function StepForm({ steps, onSave, onSubmit, isSubmitting }: StepFormProps) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024); // lg
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return (
      <div className="grid grid-cols-12 gap-8 h-full">
        <div className="col-span-3 space-y-4 sticky top-6 h-fit">
          <h3 className="font-heading font-semibold text-xl mb-6">Tiến trình</h3>
          {steps.map((step, idx) => (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && <div className={`w-0.5 h-12 ${idx < currentStepIndex ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
              <div className="pt-1">
                <p className={`font-medium ${idx <= currentStepIndex ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</p>
                {step.description && <p className="text-xs text-muted-foreground">{step.description}</p>}
              </div>
            </div>
          ))}
          <div className="pt-8">
            <Button onClick={onSubmit} disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Đang xử lý..." : "Hoàn tất & Lưu"}
            </Button>
          </div>
        </div>
        
        <div className="col-span-9 space-y-8">
          {steps.map((step, idx) => (
            <Card key={step.id} className="p-6" id={`step-${step.id}`}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold font-heading">{step.title}</h2>
                {step.description && <p className="text-muted-foreground mt-1">{step.description}</p>}
              </div>
              <div className="space-y-4" onFocus={() => setCurrentStepIndex(idx)}>
                {step.content}
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Mobile: Wizard
  const currentStep = steps[currentStepIndex];
  
  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Progress Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 sticky top-0 bg-background z-20">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium text-muted-foreground">
            Bước {currentStepIndex + 1} / {steps.length}
          </div>
        </div>
        {onSave && (
          <Button variant="ghost" size="sm" onClick={onSave} className="text-primary gap-1">
            <Save className="w-4 h-4" /> Lưu nháp
          </Button>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted w-full">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold font-heading">{currentStep.title}</h2>
          {currentStep.description && <p className="text-muted-foreground mt-2">{currentStep.description}</p>}
        </div>
        {currentStep.content}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4 flex justify-between gap-4 z-20 pb-[env(safe-area-inset-bottom)]">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
          disabled={currentStepIndex === 0 || isSubmitting}
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Quay lại
        </Button>
        
        {currentStepIndex < steps.length - 1 ? (
          <Button 
            onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
            className="flex-1"
          >
            Tiếp tục <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={onSubmit} disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Đang xử lý..." : "Hoàn tất"}
          </Button>
        )}
      </div>
    </div>
  );
}
