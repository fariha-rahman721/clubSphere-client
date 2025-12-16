import React from 'react';
import { ImCross } from "react-icons/im";

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                <ImCross className="mx-auto text-red-500" size={80} />
                <h1 className="text-2xl font-bold mt-4 text-gray-800">
                    Payment cancelled. Please try again later.
                </h1>
               
                <button
                    onClick={() => window.location.href = "/dashboard/myClubs"}
                    className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PaymentCancelled;