
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MapPin, CheckCircle, Building2, TrendingUp } from "lucide-react";
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
    <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-red-500/10">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="h-14 w-14 border-2 border-white/20 ring-2 ring-red-500/20 flex-shrink-0">
            <AvatarImage src={investor.image_url || ""} alt={investor.name} />
            <AvatarFallback className="bg-gradient-to-br from-red-500/20 to-red-600/20 text-white text-sm font-semibold border border-white/10">
              {investor.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {investor.verified && (
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-white truncate mb-1">
                {investor.name}
              </h3>
              
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                {investor.company && (
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3" />
                    <span className="truncate font-medium">{investor.company}</span>
                  </div>
                )}
                {investor.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{investor.location}</span>
                  </div>
                )}
              </div>

              {investor.funding_description && (
                <p className="text-xs text-gray-500 line-clamp-2 max-w-md">
                  {investor.funding_description}
                </p>
              )}
            </div>

            {/* Tags - Only show on larger screens */}
            <div className="hidden lg:flex flex-col items-end gap-2 ml-4">
              <div className="flex flex-wrap gap-1 justify-end max-w-48">
                {investor.funding_stage && (
                  <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs px-2 py-1 backdrop-blur-sm">
                    {investor.funding_stage}
                  </Badge>
                )}
                {investor.funding_type && (
                  <Badge className="bg-white/10 text-gray-300 border border-white/20 text-xs px-2 py-1 backdrop-blur-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {investor.funding_type}
                  </Badge>
                )}
              </div>
              
              {investor.funding_industries && investor.funding_industries.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-end max-w-48">
                  {investor.funding_industries.slice(0, 2).map((industry, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-white/5 text-gray-400 border border-white/10 text-xs px-2 py-1 backdrop-blur-sm"
                    >
                      {industry}
                    </Badge>
                  ))}
                  {investor.funding_industries.length > 2 && (
                    <Badge
                      variant="secondary"
                      className="bg-white/5 text-gray-400 border border-white/10 text-xs px-2 py-1 backdrop-blur-sm"
                    >
                      +{investor.funding_industries.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {canSave && onToggleSave && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleSave(investor.id)}
              className={`h-9 w-9 rounded-full transition-all duration-200 ${
                isSaved
                  ? "text-red-400 bg-red-500/20 hover:bg-red-500/30"
                  : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              }`}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          )}
          <Button
            onClick={onViewProfile}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm text-sm px-4 h-9 transition-all duration-200"
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestorListItem;
