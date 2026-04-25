import React from "react";
import { FiLoader } from "react-icons/fi";
import { Button } from "../ui/button";

type TemplateModalProps = {
  title: string;
  classSize: string;
  desc?: string;
  buttonLabel?: string;
  loading?: boolean;
  handleButton?: () => void;
  cancelButton: () => void;
  children?: React.ReactNode;
};

export default function TemplateModal({
  title,
  classSize,
  desc,
  buttonLabel = "Confirm",
  loading,
  handleButton,
  cancelButton,
  children,
}: TemplateModalProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div
        className={`${classSize} bg-card rounded-lg shadow-xl w-full max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-200`}
      >
        <div className="p-6 pb-2">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
          {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-2">
          {children ? children : null}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border rounded-b-lg">
          <Button
            onClick={cancelButton}
            variant="outline"
            className="text-foreground"
          >
            Cancel
          </Button>

          {handleButton && (
            <Button
              onClick={handleButton}
              disabled={loading}
              variant="destructive"
            >
              {loading && (
                <FiLoader className="animate-spin h-4 w-4 mr-0.5 inline" />
              )}
              {buttonLabel || title}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
