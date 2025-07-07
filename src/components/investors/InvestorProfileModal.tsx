import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Heart,
  MapPin,
  TrendingUp,
  Eye,
  ExternalLink,
  CheckCircle,
  Linkedin,
  Twitter,
  Mail,
  DollarSign,
  Briefcase,
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border-gray-800/80 text-white p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">Investor Profile</DialogTitle>
        </DialogHeader>

        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-gray-700/80 flex-shrink-0">
              <AvatarImage src={investor.image_url || ""} alt={investor.name} />
              <AvatarFallback className="bg-gray-800 text-white text-2xl font-bold">
                {investor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">
                      {investor.name}
                    </h2>
                    {investor.verified && (
                      <CheckCircle className="h-6 w-6 text-pink-400" />
                    )}
                  </div>
                  {investor.company && (
                    <p className="text-lg text-gray-400 font-medium">
                      {investor.company}
                    </p>
                  )}
                </div>

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
                    <Heart
                      className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`}
                    />
                  </Button>
                )}
              </div>

              {investor.location && (
                <div className="flex items-center gap-2 text-gray-400 mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>{investor.location}</span>
                </div>
              )}

              {socialLinks.length > 0 && (
                <div className="flex items-center gap-4 mt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.type}
                      href={link.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white"
                    >
                      {link.type === "company_url" && (
                        <ExternalLink className="h-5 w-5" />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {investor.funding_description && (
            <div className="mt-6 border-t border-gray-800/80 pt-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Investment Thesis
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {investor.funding_description}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="mt-6 border-t border-gray-800/80 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investor.funding_type && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Investment Type</p>
                <p className="font-semibold text-gray-200">
                  {investor.funding_type}
                </p>
              </div>
            )}
            {investor.check_sizes && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Typical Check Size</p>
                <p className="font-semibold text-gray-200">
                  {investor.check_sizes}
                </p>
              </div>
            )}
            {investor.funding_stage && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Preferred Stage</p>
                <Badge
                  variant="outline"
                  className="text-sm border-pink-500/30 text-pink-400 bg-pink-900/20"
                >
                  {investor.funding_stage}
                </Badge>
              </div>
            )}
          </div>

          {investor.funding_industries &&
            investor.funding_industries.length > 0 && (
              <div className="mt-6 border-t border-gray-800/80 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Industries of Interest
                </h3>
                <div className="flex flex-wrap gap-2">
                  {investor.funding_industries.map((industry, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-gray-800 text-gray-400 border-gray-700/80"
                    >
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Contact Section */}
        <div className="sticky bottom-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent p-6 mt-6 border-t border-gray-800/80">
          {isContactRevealed ? (
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pink-300 mb-1">
                    {getContactLabel(investor.contact_type || "email")}
                  </p>
                  <a
                    href={getContactLink(
                      investor.contact,
                      investor.contact_type || "email"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-white hover:underline"
                  >
                    {investor.contact}
                  </a>
                </div>
                <Mail className="h-8 w-8 text-pink-400" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Contact Information
                </h3>
                <p className="text-sm text-gray-400">
                  Reveal to see their{" "}
                  {getContactLabel(
                    investor.contact_type || "email"
                  ).toLowerCase()}
                </p>
              </div>
              {canRevealContact && onRevealContact && (
                <Button
                  onClick={() => onRevealContact(investor.id)}
                  className="ml-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-semibold px-6 py-3 text-base"
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
