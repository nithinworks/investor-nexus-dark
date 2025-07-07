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
        <p className="text-gray-400 text-lg">No investors found</p>
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
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-gray-400">
            Showing <strong>{startIndex + 1}</strong> to{" "}
            <strong>{Math.min(endIndex, investors.length)}</strong> of{" "}
            <strong>{investors.length}</strong> results
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-700/80 bg-black/30 text-white hover:bg-gray-800/80 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className={`w-9 ${
                      currentPage === pageNum
                        ? "bg-pink-600 hover:bg-pink-700 text-white"
                        : "text-gray-400 hover:bg-gray-800/80 hover:text-white"
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
              className="border-gray-700/80 bg-black/30 text-white hover:bg-gray-800/80 disabled:opacity-50 disabled:cursor-not-allowed"
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
