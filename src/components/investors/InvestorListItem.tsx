import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MapPin, TrendingUp, Eye, ExternalLink, User, CheckCircle, Linkedin, Twitter, Mail, DollarSign } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Investor = Tables<'investors'>;

interface InvestorListItemProps {
  investor: Investor;
  isSaved?: boolean;
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
  isContactRevealed?: boolean;
  onRevealContact?: (investorId: string) => void;
  canRevealContact?: boolean;
  onViewProfile?: () => void;
}

const InvestorListItem = ({ 
  investor, 
  isSaved = false, 
  onToggleSave, 
  canSave = true,
  isContactRevealed = false,
  onRevealContact,
  canRevealContact = true,
  onViewProfile
}: InvestorListItemProps) => {
  const getContactIcon = (contactType: string) => {
    switch (contactType) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-400" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'email':
      default:
        return <Mail className="h-4 w-4 text-blue-400" />;
    }
  };

  const getContactLink = (contact: string, contactType: string) => {
    if (contactType === 'email') {
      return `mailto:${contact}`;
    }
    return contact;
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-all duration-200 hover:border-gray-600">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar className="h-16 w-16 border-2 border-gray-600">
          <AvatarImage src={investor.image_url || ''} alt={investor.name} />
          <AvatarFallback className="bg-gray-700 text-white text-lg font-semibold">
            {investor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">{investor.name}</h3>
                {investor.verified && (
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                )}
              </div>
              {investor.company && (
                <p className="text-gray-400 font-medium">{investor.company}</p>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewProfile}
                className="shrink-0 border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500"
              >
                <User className="h-4 w-4 mr-1" />
                View Profile
              </Button>
              
              {canSave && onToggleSave && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleSave(investor.id)}
                  className={`p-2 shrink-0 hover:bg-gray-700 ${isSaved ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-red-400'}`}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          {investor.funding_description && (
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {investor.funding_description}
            </p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
            {investor.location && (
              <div className="flex items-center gap-1 text-gray-400">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{investor.location}</span>
              </div>
            )}
            {investor.funding_type && (
              <div className="flex items-center gap-1 text-gray-400">
                <TrendingUp className="h-3 w-3 shrink-0" />
                <span className="truncate">{investor.funding_type}</span>
              </div>
            )}
            {investor.check_sizes && (
              <div className="flex items-center gap-1 text-gray-400">
                <DollarSign className="h-3 w-3 shrink-0" />
                <span className="truncate">{investor.check_sizes}</span>
              </div>
            )}
            {investor.company_url && (
              <div className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3 shrink-0 text-gray-400" />
                <a 
                  href={investor.company_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 truncate"
                >
                  Website
                </a>
              </div>
            )}
          </div>

          {/* Tags and Contact Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 flex-1 min-w-0">
              {investor.funding_stage && (
                <Badge variant="outline" className="shrink-0 text-xs border-blue-600 text-blue-300 bg-blue-900/20">
                  {investor.funding_stage}
                </Badge>
              )}
              {investor.funding_industries?.slice(0, 2).map((industry, index) => (
                <Badge key={index} variant="secondary" className="shrink-0 text-xs bg-gray-700 text-gray-300 border-gray-600">
                  {industry}
                </Badge>
              ))}
              {investor.funding_industries && investor.funding_industries.length > 2 && (
                <Badge variant="secondary" className="shrink-0 text-xs bg-gray-700 text-gray-300 border-gray-600">
                  +{investor.funding_industries.length - 2} more
                </Badge>
              )}
            </div>

            {/* Contact Section */}
            <div className="shrink-0">
              {isContactRevealed ? (
                <div className="flex items-center gap-2 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2">
                  {getContactIcon(investor.contact_type || 'email')}
                  <a 
                    href={getContactLink(investor.contact, investor.contact_type || 'email')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Contact
                  </a>
                </div>
              ) : (
                canRevealContact && onRevealContact && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onRevealContact(investor.id)}
                    className="text-xs px-4 py-2 h-8 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Reveal Contact
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorListItem;