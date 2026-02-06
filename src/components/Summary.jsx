import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      {/* Balance Card */}
      <div className="group w-full bg-gradient-to-br from-slate-900/80 via-blue-900/40 to-slate-900/80 rounded-3xl p-10 border border-white/20 backdrop-blur-xl hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/40 transform hover:scale-105 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl"></div>
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <p className="text-slate-400 font-bold mb-3 uppercase tracking-widest text-xs">Total Balance</p>
            <h3 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
              ₹{balance.toLocaleString()}
            </h3>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl group-hover:shadow-xl group-hover:shadow-blue-600/60 shadow-lg">
            <Wallet size={32} className="text-white" />
          </div>
        </div>
        <div className="relative z-10 w-full bg-white/10 rounded-full h-3 border border-white/20 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 h-3 rounded-full transition-all shadow-lg shadow-blue-500/50"
            style={{ width: `${balance > 0 ? Math.min((balance / (income || 1)) * 100, 100) : 0}%` }}
          ></div>
        </div>
        <p className="relative z-10 text-slate-400 text-sm mt-4 font-medium">Current financial status</p>
      </div>

      {/* Income Card */}
      <div className="group w-full bg-gradient-to-br from-slate-900/80 via-green-900/40 to-slate-900/80 rounded-3xl p-10 border border-white/20 backdrop-blur-xl hover:border-green-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-600/40 transform hover:scale-105 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-3xl"></div>
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <p className="text-slate-400 font-bold mb-3 uppercase tracking-widest text-xs">Total Income</p>
            <h3 className="text-5xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
              ₹{income.toLocaleString()}
            </h3>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl group-hover:shadow-xl group-hover:shadow-green-600/60 shadow-lg">
            <TrendingUp size={32} className="text-white" />
          </div>
        </div>
        <div className="relative z-10 w-full bg-white/10 rounded-full h-3 border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-400 h-3 rounded-full shadow-lg shadow-green-500/50" style={{ width: "100%" }}></div>
        </div>
        <p className="relative z-10 text-slate-400 text-sm mt-4 font-medium">Total money earned</p>
      </div>

      {/* Expense Card */}
      <div className="group w-full bg-gradient-to-br from-slate-900/80 via-red-900/40 to-slate-900/80 rounded-3xl p-10 border border-white/20 backdrop-blur-xl hover:border-red-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/40 transform hover:scale-105 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-pink-600/10 rounded-3xl"></div>
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <p className="text-slate-400 font-bold mb-3 uppercase tracking-widest text-xs">Total Expense</p>
            <h3 className="text-5xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
              ₹{expense.toLocaleString()}
            </h3>
          </div>
          <div className="p-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl group-hover:shadow-xl group-hover:shadow-red-600/60 shadow-lg">
            <TrendingDown size={32} className="text-white" />
          </div>
        </div>
        <div className="relative z-10 w-full bg-white/10 rounded-full h-3 border border-white/20 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 h-3 rounded-full transition-all shadow-lg shadow-red-500/50"
            style={{ width: `${expense > 0 ? Math.min((expense / (income || 1)) * 100, 100) : 0}%` }}
          ></div>
        </div>
        <p className="relative z-10 text-slate-400 text-sm mt-4 font-medium">Total money spent</p>
      </div>
    </div>
  );
}
