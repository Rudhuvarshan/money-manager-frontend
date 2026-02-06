import { useState } from "react";
import { X, Plus } from "lucide-react";

const CATEGORIES = {
  Income: ["Salary", "Bonus", "Investment", "Other"],
  Expense: ["Fuel", "Food", "Movie", "Loan", "Medical", "Entertainment", "Shopping", "Utilities", "Transport", "Other"]
};

export default function AddTransactionModal({ onClose, onAddTransaction }) {
  const [activeTab, setActiveTab] = useState("expense");
  const [form, setForm] = useState({
    type: "Expense",
    amount: "",
    category: "",
    division: "Personal",
    description: "",
    date: new Date().toISOString().split("T")[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.amount || !form.category || !form.description) {
      alert("Please fill all fields");
      return;
    }

    const transactionData = {
      ...form,
      type: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
      amount: parseFloat(form.amount),
      date: new Date(form.date)
    };

    await onAddTransaction(transactionData);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setForm({ ...form, type: tab.charAt(0).toUpperCase() + tab.slice(1) });
  };

  const currentCategories = CATEGORIES[form.type] || [];
  const getTabGradient = (tab) => tab === "income" ? "from-green-600 to-emerald-600" : "from-red-600 to-pink-600";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl p-8 w-full max-w-md border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
              <Plus size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              New Transaction
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handleTabChange("income")}
            className={`flex-1 py-3 rounded-lg transition-all font-semibold transform hover:scale-105 ${
              activeTab === "income"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-600/50"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            💰 Income
          </button>
          <button
            onClick={() => handleTabChange("expense")}
            className={`flex-1 py-3 rounded-lg transition-all font-semibold transform hover:scale-105 ${
              activeTab === "expense"
                ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-600/50"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            💸 Expense
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Amount (₹)
            </label>
            <input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              placeholder="0.00"
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20 placeholder-slate-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <option value="" className="bg-slate-900">Select a category</option>
              {currentCategories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Add a description"
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20 placeholder-slate-400"
            />
          </div>

          {/* Division */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Division
            </label>
            <select
              value={form.division}
              onChange={(e) =>
                setForm({ ...form, division: e.target.value })
              }
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <option value="Personal" className="bg-slate-900">👤 Personal</option>
              <option value="Office" className="bg-slate-900">🏢 Office</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-gradient-to-r ${getTabGradient(activeTab)} hover:shadow-xl hover:shadow-${activeTab === 'income' ? 'green' : 'red'}-600/50 text-white py-3 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 mt-6 uppercase tracking-wider`}
          >
            <Plus size={20} />
            Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
}
