
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);

  // Popular stock symbols to display
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX'];

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Using Alpha Vantage free API - you can get a free API key
        // For demo purposes, I'll use mock data that looks realistic
        const mockData: StockData[] = [
          { symbol: 'AAPL', name: 'Apple Inc.', price: 189.25, change: 2.15, changePercent: 1.15 },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.45, change: -1.23, changePercent: -0.88 },
          { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 4.56, changePercent: 1.22 },
          { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -5.20, changePercent: -2.05 },
          { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 153.75, change: 1.89, changePercent: 1.24 },
          { symbol: 'META', name: 'Meta Platforms', price: 486.30, change: 8.45, changePercent: 1.77 },
          { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.20, change: 15.60, changePercent: 1.81 },
          { symbol: 'NFLX', name: 'Netflix Inc.', price: 485.60, change: -2.10, changePercent: -0.43 },
        ];

        // Add some randomness to make it look more realistic
        const updatedData = mockData.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 10,
          change: stock.change + (Math.random() - 0.5) * 2,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 0.5,
        }));

        setStocks(updatedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
    
    // Update every 30 seconds
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-black/90 border-b border-white/10 py-2 overflow-hidden">
        <div className="animate-pulse flex space-x-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2 min-w-fit">
              <div className="w-12 h-4 bg-white/20 rounded"></div>
              <div className="w-16 h-4 bg-white/20 rounded"></div>
              <div className="w-8 h-4 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/90 border-b border-white/10 py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate the content for seamless loop */}
        {[...stocks, ...stocks].map((stock, index) => (
          <div key={`${stock.symbol}-${index}`} className="flex items-center space-x-2 mx-8 min-w-fit">
            <span className="text-white font-medium text-sm">{stock.symbol}</span>
            <span className="text-white/80 text-sm">${stock.price.toFixed(2)}</span>
            <div className="flex items-center space-x-1">
              {stock.change >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span className={`text-xs font-medium ${
                stock.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
