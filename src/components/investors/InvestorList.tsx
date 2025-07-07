import { useState } from 'react';
import { Tables } from '@/integrations/supabase/types';
import InvestorListItem from './InvestorListItem';
import InvestorProfileModal from './InvestorProfileModal';

type Investor = Tables<'investors'>;

interface InvestorListProps {
  investors: Investor[];
  savedInvestors?: string[];
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
  revealedContacts?: string[];
  onRevealContact?: (investorId: string) => void;
  canRevealContact?: boolean;
}

const InvestorList = ({ 
  investors, 
  savedInvestors = [], 
  onToggleSave, 
  canSave = true,
  revealedContacts = [],
  onRevealContact,
  canRevealContact = true
}: InvestorListProps) => {
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);

  if (investors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No investors found</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {investors.map((investor) => (
          <InvestorListItem
            key={investor.id}
            investor={investor}
            isSaved={savedInvestors.includes(investor.id)}
            onToggleSave={onToggleSave}
            canSave={canSave}
            isContactRevealed={revealedContacts.includes(investor.id)}
            onRevealContact={onRevealContact}
            canRevealContact={canRevealContact}
            onViewProfile={() => setSelectedInvestor(investor)}
          />
        ))}
      </div>

      <InvestorProfileModal
        investor={selectedInvestor}
        isOpen={!!selectedInvestor}
        onClose={() => setSelectedInvestor(null)}
        isSaved={selectedInvestor ? savedInvestors.includes(selectedInvestor.id) : false}
        onToggleSave={onToggleSave}
        canSave={canSave}
        isContactRevealed={selectedInvestor ? revealedContacts.includes(selectedInvestor.id) : false}
        onRevealContact={onRevealContact}
        canRevealContact={canRevealContact}
      />
    </>
  );
};

export default InvestorList;