import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Heart,
  MapPin,
  TrendingUp,
  Eye,
  ExternalLink,
  CheckCircle,
  Mail,
  DollarSign,
  Building2,
  Target,
  Award,
} from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type Investor = Tables<"investors">;

interface InvestorProfileModalProps {
  investor: Investor | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
  isContactRevealed?: boolean;
  onRevealContact?: (investorId: string) => void;
  canRevealContact?: boolean;
}

const InvestorProfileModal = ({
  investor,
  isOpen,
  onClose,
  isSaved = false,
  onToggleSave,
  canSave = true,
  isContactRevealed = false,
  onRevealContact,
  canRevealContact = true,
}: InvestorProfileModalProps) => {
  if (!investor) return null;

  const getContactLink = (contact: string, contactType: string) => {
    if (contactType === "email") {
      return `mailto:${contact}`;
    }
    return contact;
  };

  const getContactLabel = (contactType: string) => {
    switch (contactType) {
      case "linkedin":
        return "LinkedIn";
      case "twitter":
        return "Twitter";
      default:
        return "Email";
    }
  };

  const socialLinks = [
    { type: "company_url", url: investor.company_url },
  ].filter((link) => link.url);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20 text-white p-0 font-satoshi">
        <DialogHeader className="sr-only">
          <DialogTitle>Investor Profile</DialogTitle>
          <DialogDescription>
            View detailed information about this investor
          </DialogDescription>
        </DialogHeader>

        {/* Enhanced Header with Better Mobile Layout */}
        <div className="relative">
          {/* Hero Section with Mobile-First Design */}
          <div className="bg-gradient-to-r from-red-500/20 via-red-600/10 to-transparent p-4 md:p-6 border-b border-white/10">
            {/* Mobile Layout: Vertical Stack */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5 pt-8 md:pt-0">
              {/* Profile Image - Centered on Mobile */}
              <div className="relative order-1 md:order-1">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-3 border-white/20 ring-3 ring-red-500/20 backdrop-blur-sm">
                  <AvatarImage
                    src={investor.image_url || ""}
                    alt={investor.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-red-500/30 to-red-600/30 backdrop-blur-sm border border-white/20 relative">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-full" />
                    <span className="relative text-white text-lg md:text-xl font-bold font-satoshi z-10">
                      {investor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Content - Centered on Mobile */}
              <div className="flex-1 text-center md:text-left order-2 md:order-2">
                {/* Name and Verification */}
                <div className="flex flex-col">
                  <div className="mb-3">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <h2 className="text-xl md:text-2xl font-bold text-white font-satoshi">
                        {investor.name}
                      </h2>
                      {investor.verified && (
                        <div className="bg-red-500/20 rounded-full p-1.5 border border-red-500/30 backdrop-blur-sm">
                          <CheckCircle className="h-4 w-4 text-red-400" />
                        </div>
                      )}
                    </div>

                    {/* Company and Location - Stacked on Mobile */}
                    <div className="space-y-2">
                      {investor.company && (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base text-gray-300">
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium font-satoshi">
                            {investor.company}
                          </span>
                        </div>
                      )}
                      {investor.location && (
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span className="font-satoshi">
                            {investor.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Website and Favourite */}
                <div className="flex items-center justify-center md:justify-start gap-3 order-3 md:order-3">
                  {/* Website Button */}
                  {socialLinks.length > 0 &&
                    socialLinks.map((link) => (
                      <a
                        key={link.type}
                        href={link.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/10 font-satoshi text-sm"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Website</span>
                      </a>
                    ))}

                  {/* Favourite Button */}
                  {canSave && onToggleSave && (
                    <button
                      onClick={() => onToggleSave(investor.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-sm border transition-all duration-200 font-satoshi text-sm ${
                        isSaved
                          ? "text-red-400 bg-red-500/20 border-red-500/30 hover:bg-red-500/30"
                          : "text-gray-300 hover:text-red-400 hover:bg-red-500/10 border-white/10 hover:border-red-500/30"
                      }`}
                    >
                      <Heart
                        className={`h-3 w-3 ${isSaved ? "fill-current" : ""}`}
                      />
                      <span>
                        {isSaved ? "Remove from List" : "Add to Favourite List"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Investment Thesis */}
          {investor.funding_description && (
            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 md:p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-red-400" />
                <h3 className="text-lg font-semibold text-white font-satoshi">
                  Investment Thesis
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-satoshi text-sm">
                {investor.funding_description}
              </p>
            </div>
          )}

          {/* Investment Details - Enhanced Mobile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {investor.funding_type && (
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-red-400" />
                  <p className="text-xs text-gray-400 font-satoshi">
                    Investment Type
                  </p>
                </div>
                <p className="font-semibold text-white font-satoshi text-sm">
                  {investor.funding_type}
                </p>
              </div>
            )}

            {investor.check_sizes && (
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-red-400" />
                  <p className="text-xs text-gray-400 font-satoshi">
                    Check Size
                  </p>
                </div>
                <p className="font-semibold text-white font-satoshi text-sm">
                  {investor.check_sizes}
                </p>
              </div>
            )}

            {investor.funding_stage && (
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-red-400" />
                  <p className="text-xs text-gray-400 font-satoshi">
                    Preferred Stage
                  </p>
                </div>
                <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 backdrop-blur-sm font-satoshi text-xs">
                  {investor.funding_stage}
                </Badge>
              </div>
            )}
          </div>

          {/* Industries */}
          {investor.funding_industries &&
            investor.funding_industries.length > 0 && (
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 md:p-5 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3 font-satoshi">
                  Industries of Interest
                </h3>
                <div className="flex flex-wrap gap-2">
                  {investor.funding_industries.map((industry, index) => (
                    <Badge
                      key={index}
                      className="bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm px-3 py-1 hover:bg-white/20 hover:border-white/30 transition-all duration-200 font-satoshi text-xs"
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Enhanced Contact Section - Sticky Bottom */}
        <div className="sticky bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl p-4 md:p-6 border-t border-white/10">
          {isContactRevealed ? (
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-xl p-4 md:p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="text-center md:text-left">
                  <p className="text-sm text-red-300 mb-1 font-satoshi">
                    {getContactLabel(investor.contact_type || "email")}
                  </p>
                  <a
                    href={getContactLink(
                      investor.contact,
                      investor.contact_type || "email"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-white hover:underline font-satoshi break-all"
                  >
                    {investor.contact}
                  </a>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="backdrop-blur-sm bg-red-500/20 rounded-full p-3 border border-red-500/30">
                    <Mail className="h-6 w-6 text-red-400" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-white mb-1 font-satoshi">
                  Contact Information
                </h3>
                <p className="text-sm text-gray-400 font-satoshi">
                  Reveal to see their{" "}
                  {getContactLabel(
                    investor.contact_type || "email"
                  ).toLowerCase()}
                </p>
              </div>
              {canRevealContact && onRevealContact && (
                <Button
                  onClick={() => onRevealContact(investor.id)}
                  className="w-full md:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold px-6 py-3 text-sm shadow-lg hover:shadow-red-500/25 transition-all duration-200 backdrop-blur-sm border border-red-400/30 font-satoshi"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Reveal Contact
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorProfileModal;
