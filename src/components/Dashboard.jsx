import { useEffect, useState } from "react";
import api from "../services/api";
import Summary from "./Summary";
import Charts from "./Charts";
import TransactionHistory from "./TransactionHistory";
import Filters from "./Filters";
import AddTransactionModal from "./AddTransactionModal";
import { Plus, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("expense");
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    division: "",
    startDate: "",
    endDate: ""
  });
  const [timeframe, setTimeframe] = useState("month");
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (filterObj = filters) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterObj.type) params.append("type", filterObj.type);
      if (filterObj.category) params.append("category", filterObj.category);
      if (filterObj.division) params.append("division", filterObj.division);
      if (filterObj.startDate) params.append("startDate", filterObj.startDate);
      if (filterObj.endDate) params.append("endDate", filterObj.endDate);

      const response = await api.get(`/transactions?${params.toString()}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchTransactions(newFilters);
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      await api.post("/transactions", transactionData);
      setShowModal(false);
      fetchTransactions(filters);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white p-4 md:p-8 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: "4s" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Centered */}
        <div className="text-center mb-12 animate-fade-in py-8 px-6 bg-gradient-to-br from-slate-900/30 via-purple-900/30 to-slate-900/30 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 mb-6 justify-center">
            <div className="p-3 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-xl shadow-lg shadow-purple-600/50">
              <TrendingUp size={28} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 bg-clip-text text-transparent drop-shadow-lg whitespace-normal break-words leading-snug">
              Money Manager
            </h1>
          </div>
          <p className="text-sm md:text-base text-slate-300 font-light tracking-wide">Your Personal Financial Dashboard</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white px-10 py-4 rounded-xl flex items-center gap-3 transition-all transform hover:scale-110 shadow-lg hover:shadow-2xl font-bold text-lg mx-auto hover:shadow-purple-600/50"
          >
            <Plus size={28} />
            Add New Transaction
          </button>
        </div>

        {/* Summary Cards - Centered */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Summary transactions={transactions} />
        </div>

        {/* Charts Section - Centered */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Financial Overview</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  timeframe === "week"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                📅 Weekly
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  timeframe === "month"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                📊 Monthly
              </button>
              <button
                onClick={() => setTimeframe("year")}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  timeframe === "year"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                📈 Yearly
              </button>
            </div>
          </div>
          <Charts transactions={transactions} timeframe={timeframe} />
        </div>

        {/* Filters */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Transaction History */}
        <div className="animate-fade-in pb-12" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Recent Transactions</h2>
          <p className="text-center text-slate-400 mb-8">View and manage all your transactions</p>
          <TransactionHistory
            transactions={transactions}
            onTransactionUpdate={() => fetchTransactions(filters)}
            loading={loading}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}
    </div>
  );
}
