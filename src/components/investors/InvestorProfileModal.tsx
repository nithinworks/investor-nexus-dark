import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, MapPin, TrendingUp, Eye, ExternalLink, CheckCircle, Linkedin, Twitter, Mail, DollarSign } from 'lucide-react';
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
        return <Linkedin className="h-5 w-5 text-blue-400" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'email':
      default:
        return <Mail className="h-5 w-5 text-blue-400" />;
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="sr-only">Investor Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-gray-600">
              <AvatarImage src={investor.image_url || ''} alt={investor.name} />
              <AvatarFallback className="bg-gray-700 text-white text-2xl font-bold">
                {investor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-white">{investor.name}</h2>
                    {investor.verified && (
                      <CheckCircle className="h-6 w-6 text-blue-400" />
                    )}
                  </div>
                  {investor.company && (
                    <p className="text-lg text-gray-400 font-medium">{investor.company}</p>
                  )}
                </div>
                
                {canSave && onToggleSave && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleSave(investor.id)}
                    className={`p-2 hover:bg-gray-700 ${isSaved ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-red-400'}`}
                  >
                    <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                )}
              </div>
              
              {/* Key Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {investor.location && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{investor.location}</span>
                  </div>
                )}
                {investor.funding_type && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <TrendingUp className="h-4 w-4" />
                    <span>{investor.funding_type}</span>
                  </div>
                )}
                {investor.check_sizes && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                    <span>{investor.check_sizes}</span>
                  </div>
                )}
                {investor.company_url && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                    <a 
                      href={investor.company_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Company Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Funding Description */}
          {investor.funding_description && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Funding Description</h3>
              <p className="text-gray-300 leading-relaxed">{investor.funding_description}</p>
            </div>
          )}

          {/* Funding Stage and Industries */}
          <div className="space-y-4">
            {investor.funding_stage && (
              <div className="space-y-2">
                <h4 className="font-medium text-white">Funding Stage</h4>
                <Badge variant="outline" className="text-sm border-blue-600 text-blue-300 bg-blue-900/20">
                  {investor.funding_stage}
                </Badge>
              </div>
            )}

            {investor.funding_industries && investor.funding_industries.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-white">Funding Industries</h4>
                <div className="flex flex-wrap gap-2">
                  {investor.funding_industries.map((industry, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            
            {isContactRevealed ? (
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  {getContactIcon(investor.contact_type || 'email')}
                  <div>
                    <p className="text-sm text-gray-400 mb-1">
                      {getContactLabel(investor.contact_type || 'email')}
                    </p>
                    <a 
                      href={getContactLink(investor.contact, investor.contact_type || 'email')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-medium"
                    >
                      {investor.contact}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300">
                      Contact information is hidden to protect privacy
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Reveal to see {getContactLabel(investor.contact_type || 'email').toLowerCase()}
                    </p>
                  </div>
                  {canRevealContact && onRevealContact && (
                    <Button
                      onClick={() => onRevealContact(investor.id)}
                      className="ml-4 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Reveal Contact
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorProfileModal;