import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        title: '',
        amount: '',
        category: '',
        type: 'income'
    });
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const stored = localStorage.getItem('transactions');
        if (stored) setTransactions(JSON.parse(stored));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.amount || isNaN(form.amount)) return;

        const newTransaction = {
            ...form,
            amount: parseFloat(form.amount),
            id: Date.now()
        };

        const updated = [newTransaction, ...transactions];
        setTransactions(updated);
        localStorage.setItem('transactions', JSON.stringify(updated));
        setForm({ title: '', amount: '', category: '', type: 'income' });
    };

    const handleDelete = (id) => {
        const updated = transactions.filter((tx) => tx.id !== id);
        setTransactions(updated);
        localStorage.setItem('transactions', JSON.stringify(updated));
    };

    const income = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    // Filter transactions by search and filter type
    const filteredTransactions = transactions.filter((tx) => {
        const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase());
        const matchesType = filter === 'all' || tx.type === filter;
        return matchesSearch && matchesType;
    });

    // Chart data for income vs. expense visualization
    const chartData = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Amount ($)',
                data: [income, expense],
                backgroundColor: ['rgba(0, 255, 0, 0.6)', 'rgba(255, 0, 0, 0.6)'],
                borderColor: ['green', 'red'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900 text-white p-6 font-sans">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-wide text-white drop-shadow">
                    Elite Budget Tracker
                </h1>
                <p className="text-gray-400 mt-2">Manage your finances like a pro</p>
            </header>

            {/* Search and Filter */}
            <div className="mb-6 max-w-lg mx-auto flex items-center justify-between space-x-4">
                <input
                    type="text"
                    placeholder="Search by title or category"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none w-full"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 rounded bg-white/20 text-white focus:outline-none"
                >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md text-center">
                    <h2 className="text-lg text-gray-300 mb-1">Balance</h2>
                    <p className="text-2xl font-bold text-green-400">${balance.toFixed(2)}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md text-center">
                    <h2 className="text-lg text-gray-300 mb-1">Income</h2>
                    <p className="text-2xl font-bold text-blue-400">${income.toFixed(2)}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md text-center">
                    <h2 className="text-lg text-gray-300 mb-1">Expenses</h2>
                    <p className="text-2xl font-bold text-red-400">${expense.toFixed(2)}</p>
                </div>
            </section>

            {/* Chart Section */}
            <section className="mt-12 max-w-4xl mx-auto bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-white mb-4">Income vs. Expenses</h2>
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
            </section>

            {/* Transaction Form */}
            <section className="mt-12 max-w-xl mx-auto bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-white mb-4">Add New Transaction</h2>
                <form
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Title (e.g., Grocery)"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="col-span-2 px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        className="px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Category (e.g., Food)"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="px-4 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
                    />
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="px-4 py-2 rounded bg-white/20 text-white focus:outline-none"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <button
                        type="submit"
                        className="col-span-2 mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Add Transaction
                    </button>
                </form>
            </section>

            {/* Transaction List */}
            <section className="mt-12 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-4">Transaction History</h2>

                {filteredTransactions.length === 0 ? (
                    <p className="text-gray-400">No transactions found.</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredTransactions.map((tx) => (
                            <li
                                key={tx.id}
                                className={`flex justify-between items-center p-4 rounded-lg shadow bg-white/10 backdrop-blur border-l-4 ${tx.type === 'income' ? 'border-green-400' : 'border-red-400'
                                    }`}
                            >
                                <div>
                                    <p className="text-lg font-semibold">{tx.title}</p>
                                    <p className="text-sm text-gray-300">{tx.category}</p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`text-xl font-bold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'
                                            }`}
                                    >
                                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(tx.id)}
                                        className="text-sm text-red-400 hover:text-red-500 mt-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default App;