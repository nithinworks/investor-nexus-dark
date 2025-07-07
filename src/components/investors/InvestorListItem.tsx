import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MapPin, CheckCircle } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Investor = Tables<"investors">;

interface InvestorListItemProps {
  investor: Investor;
  isSaved?: boolean;
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
  onViewProfile?: () => void;
}

const InvestorListItem = ({
  investor,
  isSaved = false,
  onToggleSave,
  canSave = true,
  onViewProfile,
}: InvestorListItemProps) => {
  return (
    <div className="bg-black/30 border border-gray-800/80 rounded-2xl p-4 transition-all duration-300 hover:border-pink-500/30 hover:bg-gray-900/40">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <Avatar className="h-16 w-16 border-2 border-gray-700/80 flex-shrink-0">
          <AvatarImage src={investor.image_url || ""} alt={investor.name} />
          <AvatarFallback className="bg-gray-800 text-white text-lg font-semibold">
            {investor.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white truncate">
              {investor.name}
            </h3>
            {investor.verified && (
              <CheckCircle className="h-5 w-5 text-pink-400 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-400 mt-1 text-sm">
            {investor.company && (
              <p className="font-medium truncate">{investor.company}</p>
            )}
            {investor.company && investor.location && (
              <span className="text-gray-600">&bull;</span>
            )}
            {investor.location && (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{investor.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="hidden md:flex flex-wrap gap-2 items-center flex-shrink-0 max-w-xs">
          {investor.funding_stage && (
            <Badge
              variant="outline"
              className="text-xs border-pink-500/30 text-pink-400 bg-pink-900/20"
            >
              {investor.funding_stage}
            </Badge>
          )}
          {investor.funding_industries?.slice(0, 2).map((industry, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-gray-800 text-gray-400 border-gray-700/80"
            >
              {industry}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          {canSave && onToggleSave && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleSave(investor.id)}
              className={`h-10 w-10 shrink-0 rounded-full hover:bg-gray-700/80 ${
                isSaved
                  ? "text-pink-400 hover:text-pink-300"
                  : "text-gray-500 hover:text-pink-400"
              }`}
            >
              <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onViewProfile}
            className="shrink-0 border-gray-700/80 bg-black/30 text-white hover:bg-gray-800/80 hover:border-gray-600/80"
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestorListItem;
