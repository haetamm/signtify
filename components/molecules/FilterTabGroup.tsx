import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterOption = "all" | "unread" | "read";

interface FilterTabGroupProps {
  active: FilterOption;
  onChange: (filter: FilterOption) => void;
}

export default function FilterTabGroup({
  active,
  onChange,
}: FilterTabGroupProps) {
  return (
    <div className="sticky top-0 z-10 bg-background py-4 md:pt-6 px-3 lg:px-0">
      <Tabs value={active} onValueChange={(v) => onChange(v as FilterOption)}>
        <TabsList className="bg-transparent border-b w-full justify-between sm:justify-start rounded-none h-full p-0 gap-2">
          {(["all", "unread", "read"] as const).map((option) => (
            <TabsTrigger
              key={option}
              value={option}
              className="rounded-none px-4 text-sm md:text-base font-medium bg-transparent shadow-none
                data-[state=active]:text-primary data-[state=active]:shadow-none
                data-[state=active]:border-b-2 data-[state=active]:border-primary
                text-foreground hover:text-gray-700"
            >
              {option.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
