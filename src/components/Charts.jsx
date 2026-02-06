import React, { useMemo } from "react";
import { BarChart3 } from "lucide-react";

export default function Charts({ transactions, timeframe }) {
  const chartData = useMemo(() => {
    const data = {};

    transactions.forEach((t) => {
      let key = "";

      if (timeframe === "week") {
        const date = new Date(t.date);
        const weekNum = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
        key = `Week ${weekNum}`;
      } else if (timeframe === "month") {
        const date = new Date(t.date);
        key = `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`;
      } else {
        const date = new Date(t.date);
        key = date.getFullYear().toString();
      }

      if (!data[key]) {
        data[key] = { income: 0, expense: 0 };
      }

      if (t.type === "Income") {
        data[key].income += t.amount;
      } else {
        data[key].expense += t.amount;
      }
    });

    return data;
  }, [transactions, timeframe]);

  const maxValue = useMemo(() => {
    return Math.max(
      ...Object.values(chartData).map((d) => Math.max(d.income, d.expense)),
      0
    );
  }, [chartData]);

  return (
    <div className="w-full bg-gradient-to-br from-slate-900/80 to-slate-800/60 rounded-3xl p-10 border border-white/20 backdrop-blur-xl hover:border-white/30 transition-all shadow-2xl">
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-emerald-600/50 mb-4">
          <BarChart3 size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent text-center">
          {timeframe === "week" ? "Weekly" : timeframe === "month" ? "Monthly" : "Yearly"} Analysis
        </h2>
      </div>

      {Object.keys(chartData).length === 0 ? (
        <p className="text-slate-400 text-center py-12">No transactions to display</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(chartData).map(([period, data], idx) => (
            <div key={period} className="group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition">{period}</span>
                <span className="text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
                  ₹{(data.income + data.expense).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2 h-10 rounded-lg overflow-hidden bg-slate-800/50 p-1">
                {/* Income Bar */}
                <div className="flex-1 relative bg-slate-700/50 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/50 relative group/bar"
                    style={{
                      width: `${maxValue > 0 ? (data.income / maxValue) * 100 : 0}%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover/bar:bg-white/10 transition-all"></div>
                  </div>
                </div>

                {/* Expense Bar */}
                <div className="flex-1 relative bg-slate-700/50 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/50 relative group/bar"
                    style={{
                      width: `${maxValue > 0 ? (data.expense / maxValue) * 100 : 0}%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/0 group-hover/bar:bg-white/10 transition-all"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-2 text-xs font-semibold">
                <span className="text-green-400">↑ ₹{data.income.toLocaleString()}</span>
                <span className="text-red-400">↓ ₹{data.expense.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-6 mt-8 pt-6 border-t border-white/10 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-sm"></div>
          <span className="text-sm text-slate-300">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-sm"></div>
          <span className="text-sm text-slate-300">Expenses</span>
        </div>
      </div>
    </div>
  );
}