
import { Tables } from '@/integrations/supabase/types';
import InvestorCard from './InvestorCard';

type Investor = Tables<'investors'>;

interface InvestorGridProps {
  investors: Investor[];
  savedInvestors?: string[];
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
}

const InvestorGrid = ({ investors, savedInvestors = [], onToggleSave, canSave = true }: InvestorGridProps) => {
  if (investors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No investors found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {investors.map((investor) => (
        <InvestorCard
          key={investor.id}
          investor={investor}
          isSaved={savedInvestors.includes(investor.id)}
          onToggleSave={onToggleSave}
          canSave={canSave}
        />
      ))}
    </div>
  );
};

export default InvestorGrid;
