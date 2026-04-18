import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getInitials, resolveAvatarColor } from "@/lib/utils/helper";
import { Contributor } from "@/lib/utils/types";

export default function AvatarStack({
  contributors,
}: {
  contributors: Contributor[];
}) {
  const visible = contributors.slice(0, 4);
  const rest = contributors.length - visible.length;

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex items-center -space-x-3">
        {visible.map((c, idx) => (
          <Tooltip key={c.id}>
            <TooltipTrigger asChild>
              <div className="relative" style={{ zIndex: idx }}>
                <Avatar className="w-6 h-6 border shadow-sm hover:scale-110 transition-all duration-200 cursor-pointer">
                  <AvatarFallback
                    className={`text-xs font-semibold ${resolveAvatarColor(c)}`}
                  >
                    {getInitials(c.username)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {c.username}
              {c.permissionType && ` · ${c.permissionType}`}
              {c.status && ` · ${c.status}`}
            </TooltipContent>
          </Tooltip>
        ))}

        {rest > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative" style={{ zIndex: visible.length }}>
                <Avatar className="w-6 h-6 shadow-sm bg-muted hover:scale-110 transition-all duration-200 cursor-pointer">
                  <AvatarFallback className="text-xs font-bold">
                    +{rest}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              +{rest} contributor{rest > 1 ? "s" : ""} lainnya
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
