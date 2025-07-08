
import { useState } from "react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InvestorListItem from "./InvestorListItem";
import InvestorProfileModal from "./InvestorProfileModal";
import InvestorListSkeleton from "./InvestorListSkeleton";

type Investor = Tables<"investors">;

interface InvestorListProps {
  investors: Investor[];
  savedInvestors?: string[];
  onToggleSave?: (investorId: string) => void;
  canSave?: boolean;
  revealedContacts?: string[];
  onRevealContact?: (investorId: string) => void;
  canRevealContact?: boolean;
  isLoading?: boolean;
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
  isLoading = false,
}: InvestorListProps) => {
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(investors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentInvestors = investors.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <InvestorListSkeleton count={ITEMS_PER_PAGE} />;
  }

  if (investors.length === 0) {
    return (
      <div className="text-center py-12 md:py-16 backdrop-blur-xl bg-white/5 rounded-xl md:rounded-2xl border border-white/10">
        <div className="max-w-md mx-auto space-y-4 px-4">
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl md:rounded-2xl bg-gradient-to-br from-red-500/20 to-red-700/20 flex items-center justify-center border border-red-500/30">
            <span className="text-red-400 text-xl md:text-2xl">🔍</span>
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-white font-satoshi">No Investors Found</h3>
          <p className="text-gray-400 font-satoshi text-sm md:text-base">
            Try adjusting your filters or search criteria to find matching investors.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:space-y-4">
        {currentInvestors.map((investor, index) => (
          <div 
            key={investor.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <InvestorListItem
              investor={investor}
              isSaved={savedInvestors.includes(investor.id)}
              onToggleSave={onToggleSave}
              canSave={canSave}
              onViewProfile={() => setSelectedInvestor(investor)}
            />
          </div>
        ))}
      </div>

      {/* Mobile-Optimized Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 md:mt-8 backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl">
          {/* Mobile Stats */}
          <div className="block sm:hidden text-center mb-4">
            <p className="text-xs text-gray-300 font-satoshi">
              Page <span className="font-semibold text-white">{currentPage}</span> of{" "}
              <span className="font-semibold text-white">{totalPages}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Desktop Stats */}
            <div className="hidden sm:block">
              <p className="text-sm text-gray-300 font-satoshi">
                Showing{" "}
                <span className="font-semibold text-white bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  {startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-white bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  {Math.min(endIndex, investors.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  {investors.length}
                </span>{" "}
                results
              </p>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="backdrop-blur-sm border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed font-satoshi font-semibold transition-all duration-200 rounded-lg h-8 md:h-10 px-2 md:px-4 text-xs md:text-sm"
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                <span className="hidden md:inline">Previous</span>
              </Button>

              {/* Page Numbers - Responsive */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages <= 5 ? totalPages : 3, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => goToPage(pageNum)}
                      className={`w-8 h-8 md:w-10 md:h-10 font-satoshi font-semibold transition-all duration-200 rounded-lg text-xs md:text-sm ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 border border-red-400/40 backdrop-blur-sm"
                          : "text-gray-300 hover:bg-white/15 hover:text-white hover:border-white/30 bg-white/5 border border-white/20 backdrop-blur-sm"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                {/* Show ellipsis on mobile if needed */}
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <span className="text-gray-400 px-1 md:hidden">...</span>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="backdrop-blur-sm border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed font-satoshi font-semibold transition-all duration-200 rounded-lg h-8 md:h-10 px-2 md:px-4 text-xs md:text-sm"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 md:ml-1" />
              </Button>
            </div>
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
