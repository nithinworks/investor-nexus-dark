
import { useState } from "react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InvestorListItem from "./InvestorListItem";
import InvestorProfileModal from "./InvestorProfileModal";

type Investor = Tables<"investors">;

interface InvestorListProps {
  investors: Investor[];
  savedInvestors?: string[];
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
  revealedContacts?: string[];
  onRevealContact?: (investorId: string) => void;
  canRevealContact?: boolean;
}

const ITEMS_PER_PAGE = 10;

const InvestorList = ({
  investors,
  savedInvestors = [],
  onToggleSave,
  canSave = true,
  revealedContacts = [],
  onRevealContact,
  canRevealContact = true,
}: InvestorListProps) => {
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(investors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentInvestors = investors.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (investors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg font-satoshi">No investors found</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {currentInvestors.map((investor) => (
          <InvestorListItem
            key={investor.id}
            investor={investor}
            isSaved={savedInvestors.includes(investor.id)}
            onToggleSave={onToggleSave}
            canSave={canSave}
            onViewProfile={() => setSelectedInvestor(investor)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-sm text-gray-400 font-satoshi">
            Showing <span className="font-semibold text-white">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-white">{Math.min(endIndex, investors.length)}</span> of{" "}
            <span className="font-semibold text-white">{investors.length}</span> results
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm font-satoshi font-semibold transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-9 font-satoshi font-semibold transition-all duration-200 ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25 border border-red-400/30"
                        : "text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 bg-white/5 border border-white/10 backdrop-blur-sm"
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm font-satoshi font-semibold transition-all duration-200"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <InvestorProfileModal
        investor={selectedInvestor}
        isOpen={!!selectedInvestor}
        onClose={() => setSelectedInvestor(null)}
        isSaved={
          selectedInvestor
            ? savedInvestors.includes(selectedInvestor.id)
            : false
        }
        onToggleSave={onToggleSave}
        canSave={canSave}
        isContactRevealed={
          selectedInvestor
            ? revealedContacts.includes(selectedInvestor.id)
            : false
        }
        onRevealContact={onRevealContact}
        canRevealContact={canRevealContact}
      />
    </>
  );
};

export default InvestorList;
