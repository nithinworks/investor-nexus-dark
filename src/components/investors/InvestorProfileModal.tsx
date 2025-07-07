
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-xl border border-white/20 text-white p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Investor Profile</DialogTitle>
          <DialogDescription>View detailed information about this investor</DialogDescription>
        </DialogHeader>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-500/20 via-red-600/10 to-transparent p-8 border-b border-white/10">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white/20 ring-4 ring-red-500/20 backdrop-blur-sm">
                <AvatarImage src={investor.image_url || ""} alt={investor.name} />
                <AvatarFallback className="bg-gradient-to-br from-red-500/30 to-red-600/30 text-white text-2xl font-bold backdrop-blur-sm border border-white/20">
                  {investor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {investor.verified && (
                <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 border-2 border-white/20 backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {investor.name}
                  </h2>
                  {investor.company && (
                    <div className="flex items-center gap-2 text-lg text-gray-300 mb-2">
                      <Building2 className="h-5 w-5" />
                      <span className="font-medium">{investor.company}</span>
                    </div>
                  )}
                  {investor.location && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{investor.location}</span>
                    </div>
                  )}
                </div>

                {canSave && onToggleSave && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onToggleSave(investor.id)}
                    className={`h-12 w-12 rounded-full backdrop-blur-sm border transition-all duration-200 ${
                      isSaved
                        ? "text-red-400 bg-red-500/20 border-red-500/30 hover:bg-red-500/30"
                        : "text-gray-400 hover:text-red-400 hover:bg-red-500/10 border-white/20"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                  </Button>
                )}
              </div>

              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.type}
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm">Website</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Investment Thesis */}
          {investor.funding_description && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Investment Thesis</h3>
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {investor.funding_description}
              </p>
            </div>
          )}

          {/* Investment Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {investor.funding_type && (
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-red-400" />
                  <p className="text-sm text-gray-400">Investment Type</p>
                </div>
                <p className="font-semibold text-white">{investor.funding_type}</p>
              </div>
            )}
            
            {investor.check_sizes && (
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-red-400" />
                  <p className="text-sm text-gray-400">Check Size</p>
                </div>
                <p className="font-semibold text-white">{investor.check_sizes}</p>
              </div>
            )}
            
            {investor.funding_stage && (
              <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-red-400" />
                  <p className="text-sm text-gray-400">Preferred Stage</p>
                </div>
                <Badge className="bg-red-500/20 text-red-300 border border-red-500/30 backdrop-blur-sm">
                  {investor.funding_stage}
                </Badge>
              </div>
            )}
          </div>

          {/* Industries */}
          {investor.funding_industries && investor.funding_industries.length > 0 && (
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Industries of Interest</h3>
              <div className="flex flex-wrap gap-2">
                {investor.funding_industries.map((industry, index) => (
                  <Badge
                    key={index}
                    className="bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm px-3 py-1"
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="sticky bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl p-8 border-t border-white/10">
          {isContactRevealed ? (
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-300 mb-2">
                    {getContactLabel(investor.contact_type || "email")}
                  </p>
                  <a
                    href={getContactLink(
                      investor.contact,
                      investor.contact_type || "email"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-white hover:underline"
                  >
                    {investor.contact}
                  </a>
                </div>
                <div className="backdrop-blur-sm bg-red-500/20 rounded-full p-4 border border-red-500/30">
                  <Mail className="h-8 w-8 text-red-400" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  Contact Information
                </h3>
                <p className="text-sm text-gray-400">
                  Reveal to see their{" "}
                  {getContactLabel(investor.contact_type || "email").toLowerCase()}
                </p>
              </div>
              {canRevealContact && onRevealContact && (
                <Button
                  onClick={() => onRevealContact(investor.id)}
                  className="ml-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full font-semibold px-8 py-4 text-base shadow-lg hover:shadow-red-500/25 transition-all duration-200 backdrop-blur-sm border border-red-400/30"
                >
                  <Eye className="h-5 w-5 mr-2" />
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
