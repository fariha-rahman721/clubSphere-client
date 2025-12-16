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


    const handlePayment = async () => {

        // ✅ FORM VALIDATION
        if (
            !formData.userEmail ||
            !formData.amount ||
            (formData.type === "membership" && !formData.clubId) ||
            (formData.type === "event" && !formData.eventId)
        ) {
            toast.error("Please fill up the form");
            return;
        }

        try {
            const paymentInfo = {
                amount: Number(formData.amount),
                clubId: formData.clubId,
                senderEmail: formData.userEmail,
                clubName: "Club Membership",
            };

            const res = await axios.post(
                "http://localhost:3000/create-checkout-session",
                paymentInfo
            );

            window.location.href = res.data.url;
        } catch (error) {
            console.error(error);
            toast.error("Stripe payment failed");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const paymentData = {
            ...formData,
            createdAt: new Date(),
        };

        try {
            const res = await axios.post(
                "http://localhost:3000/payments",
                paymentData,
                window.location.href = res.data.url
            );


            toast.success("Payment saved successfully");

            if (onSubmit) onSubmit(paymentData);

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
            <div className="mb-6 bg-[#FFAA6E] p-5 rounded-xl pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                    <CreditCard />
                    Payment
                </h2>
                <p className="text-sm text-white mt-1">
                    Record a membership for Club or Event
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                            className="w-full pl-10 pr-3 py-2 border rounded-lg"
                            placeholder="user@email.com"
                        />
                    </div>
                </div>

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
                            className="w-full pl-10 pr-3 py-2 border rounded-lg"
                            placeholder="e.g. 29"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Payment Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full mt-1 py-2 px-3 border rounded-lg"
                    >
                        <option value="membership">Membership</option>
                        <option value="event">Event</option>
                    </select>
                </div>

                {formData.type === "membership" && (
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Club Name
                        </label>
                        <input
                            type="text"
                            name="clubId"
                            value={formData.clubId}
                            onChange={handleChange}
                            className="w-full mt-1 py-2 px-3 border rounded-lg"
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
                            className="w-full mt-1 py-2 px-3 border rounded-lg"
                        />
                    </div>
                )}

                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Transaction ID
                    </label>
                    <div className="relative mt-1">
                        <Hash className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="transactionId"
                            required
                            value={formData.transactionId}
                            onChange={handleChange}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Payment Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full mt-1 py-2 px-3 border rounded-lg"
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    {/* ✅ FIXED BUTTON */}
                    <button
                        type="button"
                        onClick={handlePayment}
                        className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-semibold"
                    >
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
