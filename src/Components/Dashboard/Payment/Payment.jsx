import React, { useState } from "react";
import {
    DollarSign,
    Mail,
    CreditCard,
    CheckCircle,
    Hash
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Payment = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        userEmail: "",
        amount: "",
        type: "membership",
        clubId: "",
        eventId: "",
        transactionId: "",
        status: "pending",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const paymentData = {
            ...formData,
            createdAt: new Date(),
        };

        try {
            // Send payment data to backend
            const res = await axios.post(
                "http://localhost:3000/payments",
                paymentData
            );
            res.send()

            toast.success("Payment saved successfully");

            if (onSubmit) onSubmit(paymentData);

            // Reset form
            setFormData({
                userEmail: "",
                amount: "",
                type: "membership",
                clubId: "",
                eventId: "",
                transactionId: "",
                status: "pending",
            });
        } catch (err) {
            console.error(err);
            toast.error("Payment failed");
        }
    };

    return (
        <div className="w-full max-w-xl m-10 mx-auto bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="mb-6 bg-[#FFAA6E] p-5 rounded-xl pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                    <CreditCard className="text-white" />
                    Payment
                </h2>
                <p className="text-sm text-white mt-1">
                    Record a membership for Club or Event
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        User Email
                    </label>
                    <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="email"
                            name="userEmail"
                            required
                            value={formData.userEmail}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="user@email.com"
                        />
                    </div>
                </div>

                {/* Amount */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Amount
                    </label>
                    <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="number"
                            name="amount"
                            required
                            min="1"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="e.g. 29"
                        />
                    </div>
                </div>

                {/* Payment Type */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Payment Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full mt-1 py-2 px-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="membership">Membership</option>
                        <option value="event">Event</option>
                    </select>
                </div>

                {/* Conditional IDs */}
                {formData.type === "membership" && (
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Club ID
                        </label>
                        <input
                            type="text"
                            name="clubId"
                            value={formData.clubId}
                            onChange={handleChange}
                            className="w-full mt-1 py-2 px-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Club ObjectId"
                        />
                    </div>
                )}

                {formData.type === "event" && (
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Event ID
                        </label>
                        <input
                            type="text"
                            name="eventId"
                            value={formData.eventId}
                            onChange={handleChange}
                            className="w-full mt-1 py-2 px-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Event ObjectId"
                        />
                    </div>
                )}

                {/* Transaction ID */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Transaction / Payment Intent ID
                    </label>
                    <div className="relative mt-1">
                        <Hash className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="transactionId"
                            required
                            value={formData.transactionId}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="pi_3Nxxxx / txn_123"
                        />
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Payment Status
                    </label>
                    <div className="relative mt-1">
                        <CheckCircle className="absolute left-3 top-3 text-gray-400" size={18} />
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full pl-10 py-2 pr-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 border rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                        Save Payment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
