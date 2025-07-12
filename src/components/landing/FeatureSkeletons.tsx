export const FeatureSkeletons = {
  SkeletonOne: () => (
    <div className="flex flex-1 w-full h-full min-h-[10rem] md:min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      {/* Red Glow Effect */}
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Top Curated Investors Database */}
      <div className="absolute inset-0 p-3 md:p-4 z-10">
        {/* Header with count */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1 border border-red-500/30">
            <span className="text-red-400 text-xs font-medium">Database</span>
          </div>
          <span className="text-red-400 text-xs font-mono">10,000+</span>
        </div>

        {/* Investor List */}
        <div className="space-y-1.5 md:space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-red-500/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">AC</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/80 text-xs md:text-sm font-medium truncate">
                  Andreessen Horowitz
                </div>
                <div className="text-red-400/70 text-xs">
                  Series A-C • $1M-$50M
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50 flex-shrink-0"></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-red-500/20">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">SV</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/80 text-xs md:text-sm font-medium truncate">
                  Sequoia Capital
                </div>
                <div className="text-red-400/70 text-xs">
                  Seed-Series B • $500K-$25M
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50 flex-shrink-0"></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-red-500/20">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-red-400 to-red-600 shadow-lg shadow-red-500/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">BV</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/80 text-xs md:text-sm font-medium truncate">
                  Bessemer Ventures
                </div>
                <div className="text-red-400/70 text-xs">
                  Series A-D • $2M-$100M
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50 flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  SkeletonTwo: () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 p-4 z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3 border border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-red-500/40 flex items-center justify-center">
              <span className="text-white text-sm font-bold">JS</span>
            </div>
            <div className="flex-1">
              <div className="text-white/80 text-sm font-medium">
                John Smith
              </div>
              <div className="text-red-400/70 text-xs">
                Partner @ Accel Partners
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs mb-1">Check Size</div>
            <div className="text-white/70 text-xs font-medium">$1M - $10M</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs mb-1">Stage</div>
            <div className="text-white/70 text-xs font-medium">Series A</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs mb-1">Industry</div>
            <div className="text-white/70 text-xs font-medium">
              SaaS, FinTech
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs mb-1">Location</div>
            <div className="text-white/70 text-xs font-medium">
              San Francisco
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  SkeletonThree: () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 p-4 z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3 border border-red-500/30">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-400/60 shadow-sm shadow-red-400/50"></div>
            <span className="text-white/60 text-sm">Search investors...</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/40">
            <span className="text-red-400 text-xs">FinTech</span>
          </div>
          <div className="bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/40">
            <span className="text-red-400 text-xs">Series A</span>
          </div>
          <div className="bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/40">
            <span className="text-red-400 text-xs">$1M+</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-xs">Results found</span>
            <span className="text-red-400/70 text-xs font-mono">247</span>
          </div>
        </div>
      </div>
    </div>
  ),

  SkeletonFour: () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 p-4 z-10">
        <div className="mb-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-red-400 text-xs">📁</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">
                  FinTech Investors
                </div>
                <div className="text-red-400/60 text-xs">42 investors</div>
              </div>
              <div className="w-4 h-4 rounded bg-red-400/60 flex items-center justify-center">
                <span className="text-white text-xs">⋯</span>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-red-400 text-xs">📁</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-sm font-medium">
                  Series A VCs
                </div>
                <div className="text-red-400/60 text-xs">28 investors</div>
              </div>
              <div className="w-4 h-4 rounded bg-red-400/60 flex items-center justify-center">
                <span className="text-white text-xs">⋯</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 border border-red-500/40 text-center">
          <span className="text-red-400 text-sm font-medium">
            Export to CSV
          </span>
        </div>
      </div>
    </div>
  ),

  SkeletonFive: () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 p-4 z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-red-500/40 flex items-center justify-center">
            <span className="text-white text-xs">🤖</span>
          </div>
          <span className="text-red-400 text-sm font-medium">AI</span>
        </div>

        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/60 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-white text-xs">📄</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Pitch Deck Generator
                </div>
                <div className="text-red-400/60 text-xs">
                  Create compelling decks
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/60 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-white text-xs">✉️</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Email Generator
                </div>
                <div className="text-red-400/60 text-xs">
                  Personalized outreach
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-red-500/30">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500/60 shadow-sm shadow-red-500/50 flex items-center justify-center">
                <span className="text-white text-xs">📊</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Market Analysis
                </div>
                <div className="text-red-400/60 text-xs">
                  AI-powered insights
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  SkeletonSix: () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 p-4 z-10">
        <div className="text-center mb-3">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-3 border border-red-500/40">
            <div className="text-red-400 text-lg font-bold mb-1">$29</div>
            <div className="text-white/60 text-xs">/month</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            <span className="text-white/70 text-xs">10,000+ investors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            <span className="text-white/70 text-xs">Unlimited searches</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm shadow-red-400/50"></div>
            <span className="text-white/70 text-xs">AI-powered tools</span>
          </div>
        </div>

        <div className="mt-3 bg-red-500/30 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/50 text-center">
          <span className="text-red-400 text-xs font-medium">Best Value</span>
        </div>
      </div>
    </div>
  ),

  SkeletonSeven: () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 p-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-red-400 text-sm font-medium">Analytics</span>
          <span className="text-white/60 text-xs">Last 30 days</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/10 backdrop-blur-sm rounded p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs">Open Rate</div>
            <div className="text-white/80 text-sm font-bold">24.5%</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded p-2 border border-red-500/20">
            <div className="text-red-400/60 text-xs">Response Rate</div>
            <div className="text-white/80 text-sm font-bold">8.2%</div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
          <div className="flex items-end gap-1 h-12">
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-6"></div>
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-8"></div>
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-4"></div>
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-10"></div>
            <div className="bg-gradient-to-t from-red-500 to-red-400 rounded-sm w-2 h-7"></div>
          </div>
        </div>
      </div>
    </div>
  ),

  SkeletonEight: () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 p-4 z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-400 text-sm font-medium">Team</span>
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
        </div>

        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center">
                <span className="text-white text-xs">JD</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  John Doe
                </div>
                <div className="text-red-400/60 text-xs">
                  Reviewing prospects
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center">
                <span className="text-white text-xs">SM</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Sarah Miller
                </div>
                <div className="text-red-400/60 text-xs">Sending outreach</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-white/5 backdrop-blur-sm rounded p-2 border border-red-500/20">
          <span className="text-white/60 text-xs">3 active campaigns</span>
        </div>
      </div>
    </div>
  ),

  SkeletonNine: () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black border border-red-500/20 overflow-hidden relative group hover:border-red-500/40 transition-all duration-300">
      <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-300"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 p-4 z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-400 text-sm font-medium">Integrations</span>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>

        <div className="space-y-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 flex items-center justify-center">
                <span className="text-red-400 text-xs">SF</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">
                  Salesforce
                </div>
                <div className="text-green-400/60 text-xs">Connected</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 flex items-center justify-center">
                <span className="text-red-400 text-xs">HS</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">HubSpot</div>
                <div className="text-green-400/60 text-xs">Connected</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-red-500/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500/30 flex items-center justify-center">
                <span className="text-red-400 text-xs">ZP</span>
              </div>
              <div className="flex-1">
                <div className="text-white/80 text-xs font-medium">Zapier</div>
                <div className="text-green-400/60 text-xs">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
