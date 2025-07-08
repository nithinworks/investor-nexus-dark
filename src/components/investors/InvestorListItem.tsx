
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
    <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-red-500/10">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar className="h-10 w-10 md:h-14 md:w-14 border-2 border-white/20 ring-2 ring-red-500/20">
            <AvatarImage src={investor.image_url || ""} alt={investor.name} />
            <AvatarFallback className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-white/10 relative">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-full" />
              <span className="relative text-white text-xs md:text-sm font-semibold font-satoshi z-10">
                {investor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base md:text-lg font-semibold text-white truncate font-satoshi">
                  {investor.name}
                </h3>
                {investor.verified && (
                  <div className="bg-red-500/20 rounded-full p-1 border border-red-500/30 backdrop-blur-sm flex-shrink-0">
                    <CheckCircle className="h-2.5 w-2.5 md:h-3 md:w-3 text-red-400" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs md:text-sm text-gray-400 mb-2 font-satoshi">
                {investor.company && (
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate font-medium">{investor.company}</span>
                  </div>
                )}
                {investor.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{investor.location}</span>
                  </div>
                )}
              </div>

              {investor.funding_description && (
                <p className="text-xs text-gray-500 line-clamp-2 max-w-full md:max-w-md font-satoshi mb-2 md:mb-0">
                  {investor.funding_description}
                </p>
              )}
            </div>

            {/* Tags - Hidden on mobile, shown on larger screens */}
            <div className="hidden lg:flex flex-col items-end gap-2 ml-4 flex-shrink-0">
              <div className="flex flex-wrap gap-1 justify-end max-w-48">
                {investor.funding_stage && (
                  <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs px-2 py-1 backdrop-blur-sm hover:bg-red-500/30 hover:border-red-400/40 transition-all duration-200 font-satoshi">
                    {investor.funding_stage}
                  </Badge>
                )}
                {investor.funding_type && (
                  <Badge className="bg-white/10 text-gray-300 border border-white/20 text-xs px-2 py-1 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all duration-200 font-satoshi">
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
                      className="bg-white/5 text-gray-400 border border-white/10 text-xs px-2 py-1 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200 font-satoshi"
                    >
                      {industry}
                    </Badge>
                  ))}
                  {investor.funding_industries.length > 2 && (
                    <Badge
                      variant="secondary"
                      className="bg-white/5 text-gray-400 border border-white/10 text-xs px-2 py-1 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200 font-satoshi"
                    >
                      +{investor.funding_industries.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Tags */}
          <div className="flex lg:hidden flex-wrap gap-1 mt-2">
            {investor.funding_stage && (
              <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs px-2 py-1 backdrop-blur-sm font-satoshi">
                {investor.funding_stage}
              </Badge>
            )}
            {investor.funding_type && (
              <Badge className="bg-white/10 text-gray-300 border border-white/20 text-xs px-2 py-1 backdrop-blur-sm font-satoshi">
                {investor.funding_type}
              </Badge>
            )}
            {investor.funding_industries && investor.funding_industries.slice(0, 1).map((industry, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-white/5 text-gray-400 border border-white/10 text-xs px-2 py-1 backdrop-blur-sm font-satoshi"
              >
                {industry}
              </Badge>
            ))}
            {investor.funding_industries && investor.funding_industries.length > 1 && (
              <Badge
                variant="secondary"
                className="bg-white/5 text-gray-400 border border-white/10 text-xs px-2 py-1 backdrop-blur-sm font-satoshi"
              >
                +{investor.funding_industries.length - 1}
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
          {canSave && onToggleSave && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleSave(investor.id)}
              className={`h-8 w-8 md:h-9 md:w-9 rounded-full transition-all duration-200 backdrop-blur-sm border font-satoshi ${
                isSaved
                  ? "text-red-400 bg-red-500/20 border-red-500/30 hover:bg-red-500/30 hover:border-red-400/40"
                  : "text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border-white/10"
              }`}
            >
              <Heart className={`h-3 w-3 md:h-4 md:w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          )}
          <Button
            onClick={onViewProfile}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm text-xs md:text-sm px-3 md:px-4 h-8 md:h-9 transition-all duration-200 font-semibold font-satoshi shadow-lg hover:shadow-white/10"
          >
            <span className="hidden sm:inline">View Profile</span>
            <span className="sm:hidden">View</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvestorListItem;
