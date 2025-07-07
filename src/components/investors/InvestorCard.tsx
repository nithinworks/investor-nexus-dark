
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin, TrendingUp, Eye, ExternalLink, DollarSign } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Investor = Tables<'investors'>;

interface InvestorCardProps {
  investor: Investor;
  isSaved?: boolean;
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
  isContactRevealed?: boolean;
  onRevealContact?: (investorId: string) => void;
  canRevealContact?: boolean;
}

const InvestorCard = ({ 
  investor, 
  isSaved = false, 
  onToggleSave, 
  canSave = true,
  isContactRevealed = false,
  onRevealContact,
  canRevealContact = true
}: InvestorCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-white text-lg">{investor.name}</CardTitle>
            {investor.company && (
              <CardDescription className="text-gray-400">{investor.company}</CardDescription>
            )}
          </div>
          <div className="flex gap-2">
            {canSave && onToggleSave && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleSave(investor.id)}
                className={`p-2 ${isSaved ? 'text-red-500' : 'text-gray-400'} hover:text-red-400`}
              >
                <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {investor.funding_description && (
          <p className="text-gray-300 text-sm">{investor.funding_description}</p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
          {investor.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{investor.location}</span>
            </div>
          )}
          {investor.funding_type && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>{investor.funding_type}</span>
            </div>
          )}
            {investor.company_url && (
              <div className="flex items-center space-x-1">
                <ExternalLink className="h-3 w-3" />
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

        <div className="flex flex-wrap gap-2">
          {investor.funding_stage && (
            <Badge variant="outline" className="border-blue-600 text-blue-400">
              {investor.funding_stage}
            </Badge>
          )}
          {investor.funding_industries?.slice(0, 3).map((industry, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300">
              {industry}
            </Badge>
          ))}
          {investor.funding_industries && investor.funding_industries.length > 3 && (
            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
              +{investor.funding_industries.length - 3} more
            </Badge>
          )}
        </div>

        {/* Contact Section */}
        <div className="border-t border-gray-700 pt-4">
          {isContactRevealed ? (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Contact:</span>
              <a 
                href={investor.contact.includes('@') ? `mailto:${investor.contact}` : investor.contact}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                {investor.contact}
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Contact information hidden</span>
              {canRevealContact && onRevealContact && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRevealContact(investor.id)}
                  className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Reveal Contact
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorCard;
