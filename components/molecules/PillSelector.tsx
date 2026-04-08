import { Label } from "@/components/ui/label";

interface PillOption {
  value: string;
  label: string;
}

interface PillSelectorProps {
  label: string;
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
}

const PillSelector: React.FC<PillSelectorProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div>
    <Label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
      {label}
    </Label>
    <div className="flex gap-1.5 bg-gray-100 dark:bg-primary/10 rounded-xl p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 px-3 py-1.5 text-sm rounded-lg transition-all ${
            value === option.value
              ? "bg-white dark:bg-primary shadow-sm text-gray-900 dark:text-white font-medium"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);

export default PillSelector;
