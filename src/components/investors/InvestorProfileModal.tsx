import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, MapPin, TrendingUp, Eye, ExternalLink, DollarSign, Building2, Calendar } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Investor = Tables<'investors'>;

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
  canRevealContact = true
}: InvestorProfileModalProps) => {
  if (!investor) return null;

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

  const getContactLabel = (contactType: string) => {
    switch (contactType) {
      case 'linkedin':
        return 'LinkedIn Profile';
      case 'twitter':
        return 'Twitter Profile';
      case 'email':
      default:
        return 'Email Address';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Investor Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-border">
              <AvatarImage src={investor.image_url || ''} alt={investor.name} />
              <AvatarFallback className="bg-muted text-2xl font-bold">
                {investor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{investor.name}</h2>
                  {investor.company && (
                    <p className="text-lg text-muted-foreground font-medium">{investor.company}</p>
                  )}
                </div>
                
                {canSave && onToggleSave && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleSave(investor.id)}
                    className={`p-2 ${isSaved ? 'text-red-500 hover:text-red-400' : 'text-muted-foreground hover:text-red-400'}`}
                  >
                    <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                )}
              </div>
              
              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {investor.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{investor.location}</span>
                  </div>
                )}
                {investor.funding_type && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{investor.funding_type}</span>
                  </div>
                )}
                {investor.check_sizes && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{investor.check_sizes}</span>
                  </div>
                )}
                {investor.company_url && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={investor.company_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      Company Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          {investor.bio && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">About</h3>
              <p className="text-muted-foreground leading-relaxed">{investor.bio}</p>
            </div>
          )}

          {/* Investment Focus */}
          {investor.funding_description && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Investment Focus</h3>
              <p className="text-muted-foreground leading-relaxed">{investor.funding_description}</p>
            </div>
          )}

          {/* Investment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Funding Stage */}
            {investor.funding_stage && (
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Funding Stage</h4>
                <Badge variant="outline" className="text-sm">
                  {investor.funding_stage}
                </Badge>
              </div>
            )}

            {/* Check Size */}
            {investor.check_sizes && (
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Check Size</h4>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{investor.check_sizes}</span>
                </div>
              </div>
            )}
          </div>

          {/* Industries */}
          {investor.funding_industries && investor.funding_industries.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Industries of Interest</h3>
              <div className="flex flex-wrap gap-2">
                {investor.funding_industries.map((industry, index) => (
                  <Badge key={index} variant="secondary">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
            
            {isContactRevealed ? (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getContactIcon(investor.contact_type || 'email')}</span>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {getContactLabel(investor.contact_type || 'email')}
                    </p>
                    <a 
                      href={getContactLink(investor.contact, investor.contact_type || 'email')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      {investor.contact}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">
                      Contact information is hidden to protect privacy
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Reveal to see {getContactLabel(investor.contact_type || 'email').toLowerCase()}
                    </p>
                  </div>
                  {canRevealContact && onRevealContact && (
                    <Button
                      onClick={() => onRevealContact(investor.id)}
                      className="ml-4"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Reveal Contact
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div className="border-t border-border pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Added {new Date(investor.created_at).toLocaleDateString()}</span>
              </div>
              {investor.updated_at !== investor.created_at && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {new Date(investor.updated_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorProfileModal;