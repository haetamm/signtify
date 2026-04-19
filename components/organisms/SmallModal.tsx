import { FiLoader } from "react-icons/fi";
import { Button } from "../ui/button";

type SmallModalProps = {
  title: string;
  desc: string;
  buttonLabel?: string;
  loading: boolean;
  handleButton: () => void;
  cancelButton: () => void;
};

export default function SmallModal({
  title,
  desc,
  buttonLabel = "Confirm",
  loading,
  handleButton,
  cancelButton,
}: SmallModalProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-sm animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border rounded-b-lg">
          <Button
            onClick={cancelButton}
            variant="outline"
            className="text-foreground"
          >
            Cancel
          </Button>

          <Button
            onClick={handleButton}
            disabled={loading}
            variant="destructive"
          >
            {loading && (
              <FiLoader className="animate-spin h-4 w-4 mr-0.5 inline"></FiLoader>
            )}
            {buttonLabel || title}
          </Button>
        </div>
      </div>
    </div>
  );
}
