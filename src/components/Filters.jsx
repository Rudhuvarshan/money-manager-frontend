import { Filter, X, Settings } from "lucide-react";
import { useState } from "react";

const CATEGORIES = {
  Income: ["Salary", "Bonus", "Investment", "Other"],
  Expense: ["Fuel", "Food", "Movie", "Loan", "Medical", "Entertainment", "Shopping", "Utilities", "Transport", "Other"]
};

const ALL_CATEGORIES = [...new Set([...CATEGORIES.Income, ...CATEGORIES.Expense])];

export default function Filters({ filters, onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    onFilterChange({
      type: "",
      category: "",
      division: "",
      startDate: "",
      endDate: ""
    });
  };

  const hasActiveFilters =
    filters.type || filters.category || filters.division || filters.startDate || filters.endDate;

  return (
    <div className="w-full bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-3xl p-10 border border-white/20 backdrop-blur-xl hover:border-white/30 transition-all shadow-2xl">
      <div className="flex flex-col items-center mb-10">
        <div className="p-4 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl shadow-lg shadow-blue-600/50 mb-4 hover:shadow-blue-600/80 transition-all">
          <Filter size={36} className="text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent text-center mb-4">Advanced Filters</h2>
        {hasActiveFilters && (
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
              {[filters.type, filters.category, filters.division, filters.startDate, filters.endDate].filter(Boolean).length} Active
            </span>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 text-sm bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
            >
              <X size={16} />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Toggle Filters Button for Mobile */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg mb-4 transition-all transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
      >
        <Settings size={18} />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${!showFilters && "hidden md:grid"}`}>
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-bold text-blue-300 mb-3 uppercase tracking-wider">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full bg-slate-700/50 border border-blue-500/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-slate-700 text-sm backdrop-blur-sm transition-all hover:bg-slate-700/70 hover:border-blue-500/50"
          >
            <option value="" style={{backgroundColor: "#1e293b", color: "#fff"}}>All Types</option>
            <option value="Income" style={{backgroundColor: "#1e293b", color: "#fff"}}>💰 Income</option>
            <option value="Expense" style={{backgroundColor: "#1e293b", color: "#fff"}}>💸 Expense</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wider">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full bg-slate-700/50 border border-cyan-500/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyan-400 focus:bg-slate-700 text-sm backdrop-blur-sm transition-all hover:bg-slate-700/70 hover:border-cyan-500/50"
          >
            <option value="" style={{backgroundColor: "#1e293b", color: "#fff"}}>All Categories</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat} style={{backgroundColor: "#1e293b", color: "#fff"}}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Division */}
        <div>
          <label className="block text-sm font-bold text-green-300 mb-3 uppercase tracking-wider">
            Division
          </label>
          <select
            value={filters.division}
            onChange={(e) => handleFilterChange("division", e.target.value)}
            className="w-full bg-slate-700/50 border border-green-500/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-green-400 focus:bg-slate-700 text-sm backdrop-blur-sm transition-all hover:bg-slate-700/70 hover:border-green-500/50"
          >
            <option value="" style={{backgroundColor: "#1e293b", color: "#fff"}}>All Divisions</option>
            <option value="Personal" style={{backgroundColor: "#1e293b", color: "#fff"}}>👤 Personal</option>
            <option value="Office" style={{backgroundColor: "#1e293b", color: "#fff"}}>🏢 Office</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-bold text-purple-300 mb-3 uppercase tracking-wider">
            From Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
            className="w-full bg-slate-700/50 border border-purple-500/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400 focus:bg-slate-700 text-sm backdrop-blur-sm transition-all hover:bg-slate-700/70 hover:border-purple-500/50"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-bold text-pink-300 mb-3 uppercase tracking-wider">
            To Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
            className="w-full bg-slate-700/50 border border-pink-500/30 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-pink-400 focus:bg-slate-700 text-sm backdrop-blur-sm transition-all hover:bg-slate-700/70 hover:border-pink-500/50"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
          <p className="text-sm text-slate-300 font-semibold mb-3">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.type && (
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                Type: {filters.type}
                <button
                  onClick={() => handleFilterChange("type", "")}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            {filters.category && (
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                Category: {filters.category}
                <button
                  onClick={() => handleFilterChange("category", "")}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            {filters.division && (
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                Division: {filters.division}
                <button
                  onClick={() => handleFilterChange("division", "")}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            {filters.startDate && (
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                From: {filters.startDate}
                <button
                  onClick={() => handleFilterChange("startDate", "")}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
            {filters.endDate && (
              <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                To: {filters.endDate}
                <button
                  onClick={() => handleFilterChange("endDate", "")}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
