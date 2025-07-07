import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MapPin, TrendingUp, Eye, ExternalLink, DollarSign, User } from 'lucide-react';
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
        return '💼';
      case 'twitter':
        return '🐦';
      case 'email':
      default:
        return '✉️';
    }
  };

  const getContactLink = (contact: string, contactType: string) => {
    if (contactType === 'email') {
      return `mailto:${contact}`;
    }
    return contact;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:bg-accent/50 transition-colors">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar className="h-16 w-16 border-2 border-border">
          <AvatarImage src={investor.image_url || ''} alt={investor.name} />
          <AvatarFallback className="bg-muted text-lg font-semibold">
            {investor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{investor.name}</h3>
              {investor.company && (
                <p className="text-muted-foreground font-medium">{investor.company}</p>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewProfile}
                className="shrink-0"
              >
                <User className="h-4 w-4 mr-1" />
                View Profile
              </Button>
              
              {canSave && onToggleSave && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleSave(investor.id)}
                  className={`p-2 shrink-0 ${isSaved ? 'text-red-500 hover:text-red-400' : 'text-muted-foreground hover:text-red-400'}`}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          {investor.funding_description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {investor.funding_description}
            </p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
            {investor.location && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{investor.location}</span>
              </div>
            )}
            {investor.funding_type && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="h-3 w-3 shrink-0" />
                <span className="truncate">{investor.funding_type}</span>
              </div>
            )}
            {investor.check_sizes && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="h-3 w-3 shrink-0" />
                <span className="truncate">{investor.check_sizes}</span>
              </div>
            )}
            {investor.company_url && (
              <div className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                <a 
                  href={investor.company_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 truncate"
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
                <Badge variant="outline" className="shrink-0 text-xs">
                  {investor.funding_stage}
                </Badge>
              )}
              {investor.funding_industries?.slice(0, 2).map((industry, index) => (
                <Badge key={index} variant="secondary" className="shrink-0 text-xs">
                  {industry}
                </Badge>
              ))}
              {investor.funding_industries && investor.funding_industries.length > 2 && (
                <Badge variant="secondary" className="shrink-0 text-xs">
                  +{investor.funding_industries.length - 2} more
                </Badge>
              )}
            </div>

            {/* Contact Section */}
            <div className="shrink-0">
              {isContactRevealed ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs">{getContactIcon(investor.contact_type || 'email')}</span>
                  <a 
                    href={getContactLink(investor.contact, investor.contact_type || 'email')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    Contact
                  </a>
                </div>
              ) : (
                canRevealContact && onRevealContact && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRevealContact(investor.id)}
                    className="text-xs px-3 py-1 h-7"
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