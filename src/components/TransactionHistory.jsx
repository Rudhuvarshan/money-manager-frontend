import { Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import api from "../services/api";

export default function TransactionHistory({ transactions, onTransactionUpdate }) {
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);

  const canEdit = (createdAt) => {
    const now = new Date();
    const txTime = new Date(createdAt);
    const hoursPassed = (now - txTime) / (1000 * 60 * 60);
    return hoursPassed <= 12;
  };

  const handleEdit = (transaction) => {
    if (!canEdit(transaction.createdAt)) {
      alert("Cannot edit transaction after 12 hours");
      return;
    }
    setEditingId(transaction._id);
    setEditForm(transaction);
  };

  const handleSaveEdit = async (id) => {
    try {
      setLoading(true);
      await api.put(`/transactions/${id}`, editForm);
      setEditingId(null);
      onTransactionUpdate();
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      setLoading(true);
      await api.delete(`/transactions/${id}`);
      onTransactionUpdate();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all shadow-xl overflow-hidden animate-fade-in animation-delay-400">
      {transactions.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-slate-400 text-lg font-semibold">No transactions yet</p>
          <p className="text-slate-500 text-sm mt-2">Add one to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Category</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Description</th>
                <th className="px-4 py-4 text-right text-sm font-bold text-slate-300 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">Division</th>
                <th className="px-4 py-4 text-center text-sm font-bold text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-4 py-4 text-sm text-slate-300">
                    <div>
                      <p className="font-semibold">{new Date(tx.date).toLocaleDateString()}</p>
                      <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleTimeString()}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${
                        tx.type === "Income"
                          ? "from-green-500 to-emerald-500"
                          : "from-red-500 to-pink-500"
                      }`}
                    >
                      {tx.type === "Income" ? "💰" : "💸"} {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white backdrop-blur-sm border ${
                      tx.type === "Income"
                        ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30"
                        : "bg-gradient-to-br from-red-500/20 to-pink-500/20 border-red-500/30"
                    }`}>
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-300 max-w-xs truncate">
                    {tx.description || "—"}
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-right">
                    <span
                      className={`bg-gradient-to-r bg-clip-text text-transparent ${
                        tx.type === "Income" ? "from-green-400 to-emerald-400" : "from-red-400 to-pink-400"
                      }`}
                    >
                      {tx.type === "Income" ? "+" : "-"}₹{tx.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white backdrop-blur-sm border ${
                      tx.division === "Personal"
                        ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30"
                        : "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-500/30"
                    }`}>
                      {tx.division === "Personal" ? "👤" : "🏢"} {tx.division}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setExpandedId(expandedId === tx._id ? null : tx._id)}
                        className="p-2 rounded-lg bg-gradient-to-br from-slate-600/20 to-slate-500/20 border border-slate-500/30 text-slate-300 hover:from-slate-600/30 hover:to-slate-500/30 hover:border-slate-500/50 hover:scale-110 transition-all"
                        title="View details"
                      >
                        {expandedId === tx._id ? "🔒" : "👁️"}
                      </button>
                      {canEdit(tx.createdAt) && (
                        <button
                          onClick={() => handleEdit(tx)}
                          className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-400 hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-500/50 hover:scale-110 transition-all"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(tx._id)}
                        className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-400 hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-500/50 hover:scale-110 transition-all disabled:opacity-50"
                        title="Delete"
                        disabled={loading}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Expanded Details Row */}
      {expandedId && (
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 p-6 border-t border-white/10 backdrop-blur-xl">
          {editingId === expandedId ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Edit Transaction</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) =>
                      setEditForm({ ...editForm, amount: parseFloat(e.target.value) })
                    }
                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                    Division
                  </label>
                  <select
                    value={editForm.division}
                    onChange={(e) =>
                      setEditForm({ ...editForm, division: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-purple-400 backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Office">Office</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleSaveEdit(expandedId)}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 font-semibold disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Created</p>
                <p className="text-slate-200 font-semibold">
                  {new Date(transactions.find(t => t._id === expandedId)?.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Last Updated</p>
                <p className="text-slate-200 font-semibold">
                  {new Date(transactions.find(t => t._id === expandedId)?.updatedAt).toLocaleString()}
                </p>
              </div>
              {canEdit(transactions.find(t => t._id === expandedId)?.createdAt) && (
                <p className="text-green-400 text-sm font-semibold bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/30">✓ Can still be edited</p>
              )}
              {!canEdit(transactions.find(t => t._id === expandedId)?.createdAt) && (
                <p className="text-red-400 text-sm font-semibold bg-red-500/20 px-4 py-2 rounded-lg border border-red-500/30">✗ Cannot be edited (12 hours passed)</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
