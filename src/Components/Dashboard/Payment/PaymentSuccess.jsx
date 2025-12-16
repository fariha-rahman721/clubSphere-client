
import Swal from "sweetalert2";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
    

   

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                <CheckCircle className="mx-auto text-green-500" size={80} />
                <h1 className="text-2xl font-bold mt-4 text-gray-800">
                    Payment Successful
                </h1>
                <p className="text-gray-600 mt-2">
                    Thank you for your payment.
                </p>
                <button
                    onClick={() => window.location.href = "/dashboard"}
                    className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
