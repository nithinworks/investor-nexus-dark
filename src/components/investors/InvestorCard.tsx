
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin, TrendingUp } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Investor = Tables<'investors'>;

interface InvestorCardProps {
  investor: Investor;
  isSaved?: boolean;
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
}

const InvestorCard = ({ investor, isSaved = false, onToggleSave, canSave = true }: InvestorCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-lg">{investor.name}</CardTitle>
            <CardDescription className="text-gray-400">{investor.email}</CardDescription>
          </div>
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
      </CardHeader>
      <CardContent className="space-y-4">
        {investor.bio && (
          <p className="text-gray-300 text-sm">{investor.bio}</p>
        )}
        
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          {investor.country && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{investor.country}</span>
            </div>
          )}
          {investor.investment_type && (
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>{investor.investment_type}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {investor.investment_stage && (
            <Badge variant="outline" className="border-blue-600 text-blue-400">
              {investor.investment_stage}
            </Badge>
          )}
          {investor.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
          {investor.tags && investor.tags.length > 3 && (
            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
              +{investor.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorCard;
