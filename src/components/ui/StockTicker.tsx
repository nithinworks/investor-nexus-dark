import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

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

  // Expanded list of popular stock symbols
  const symbols = [
    "AAPL",
    "GOOGL",
    "MSFT",
    "TSLA",
    "AMZN",
    "META",
    "NVDA",
    "NFLX",
    "ADBE",
    "CRM",
    "ORCL",
    "IBM",
    "INTC",
    "AMD",
    "QCOM",
    "UBER",
    "LYFT",
    "SPOT",
    "TWTR",
    "SNAP",
  ];

  const API_KEY = "N74XQN6CP7TUHGP7";

  useEffect(() => {
    // Start with fallback data immediately for faster page load
    const initialData = symbols.slice(0, 8).map(getFallbackData);
    setStocks(initialData);
    setLoading(false);

    // Fetch real data in the background after initial render
    const fetchStockData = async () => {
      try {
        console.log("Fetching stock data from Alpha Vantage...");

        // Limit to fewer symbols for better performance
        const limitedSymbols = symbols.slice(0, 8);
        const stockPromises = limitedSymbols.map(async (symbol) => {
          try {
            const response = await fetch(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
            );
            const data = await response.json();

            // Alpha Vantage response structure
            const quote = data["Global Quote"];

            if (!quote || !quote["05. price"]) {
              console.warn(`No data for ${symbol}, using fallback`);
              // Fallback to mock data if API fails
              return getFallbackData(symbol);
            }

            const price = parseFloat(quote["05. price"]);
            const change = parseFloat(quote["09. change"]);
            const changePercent = parseFloat(
              quote["10. change percent"].replace("%", "")
            );

            return {
              symbol,
              name: getCompanyName(symbol),
              price,
              change,
              changePercent,
            };
          } catch (error) {
            console.error(`Error fetching ${symbol}:`, error);
            return getFallbackData(symbol);
          }
        });

        const results = await Promise.all(stockPromises);
        setStocks(results);
        console.log("Stock data updated:", results.length, "stocks");
      } catch (error) {
        console.error("Error fetching stock data:", error);
        // Keep existing fallback data if API fails
      }
    };

    // Delay initial API call to not block page load
    const initialTimeout = setTimeout(fetchStockData, 2000);

    // Update every 5 minutes (Alpha Vantage has rate limits)
    const interval = setInterval(fetchStockData, 300000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const getCompanyName = (symbol: string): string => {
    const companyNames: { [key: string]: string } = {
      AAPL: "Apple Inc.",
      GOOGL: "Alphabet Inc.",
      MSFT: "Microsoft Corp.",
      TSLA: "Tesla Inc.",
      AMZN: "Amazon.com Inc.",
      META: "Meta Platforms",
      NVDA: "NVIDIA Corp.",
      NFLX: "Netflix Inc.",
      ADBE: "Adobe Inc.",
      CRM: "Salesforce Inc.",
      ORCL: "Oracle Corp.",
      IBM: "IBM Corp.",
      INTC: "Intel Corp.",
      AMD: "Advanced Micro Devices",
      QCOM: "Qualcomm Inc.",
      UBER: "Uber Technologies",
      LYFT: "Lyft Inc.",
      SPOT: "Spotify Technology",
      TWTR: "Twitter Inc.",
      SNAP: "Snap Inc.",
    };
    return companyNames[symbol] || symbol;
  };

  const getFallbackData = (symbol: string): StockData => {
    // Realistic fallback data based on typical stock prices
    const fallbackPrices: { [key: string]: number } = {
      AAPL: 189.25,
      GOOGL: 138.45,
      MSFT: 378.9,
      TSLA: 248.5,
      AMZN: 153.75,
      META: 486.3,
      NVDA: 875.2,
      NFLX: 485.6,
      ADBE: 620.4,
      CRM: 285.3,
      ORCL: 118.75,
      IBM: 185.2,
      INTC: 43.85,
      AMD: 158.9,
      QCOM: 168.45,
      UBER: 67.3,
      LYFT: 14.25,
      SPOT: 298.75,
      TWTR: 45.6,
      SNAP: 11.85,
    };

    const basePrice = fallbackPrices[symbol] || 100;
    const randomChange = (Math.random() - 0.5) * 10;
    const changePercent = (randomChange / basePrice) * 100;

    return {
      symbol,
      name: getCompanyName(symbol),
      price: basePrice + randomChange,
      change: randomChange,
      changePercent,
    };
  };

  if (loading) {
    return (
      <div className="bg-black/90 border-b border-white/10 py-2 overflow-hidden">
        <div className="animate-pulse flex space-x-8">
          {[...Array(8)].map((_, i) => (
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10 py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Duplicate the content for seamless loop */}
        {[...stocks, ...stocks].map((stock, index) => (
          <div
            key={`${stock.symbol}-${index}`}
            className="flex items-center space-x-2 mx-8 min-w-fit"
          >
            <span className="text-white font-medium text-sm">
              {stock.symbol}
            </span>
            <span className="text-white/80 text-sm">
              ${stock.price.toFixed(2)}
            </span>
            <div className="flex items-center space-x-1">
              {stock.change >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-400" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-400" />
              )}
              <span
                className={`text-xs ${
                  stock.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
