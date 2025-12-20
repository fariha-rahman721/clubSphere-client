import Swal from "sweetalert2";
import { CheckCircle } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (!sessionId) return;

        axios.post("http://localhost:3000/confirm-payment", { sessionId })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Payment Successful 🎉",
                    text: "Your membership has been activated!",
                    confirmButtonText: "Go to Dashboard",
                }).then(() => {
                    navigate("/dashboard/myClubs");
                });
            })
            .catch(() => {
                Swal.fire("Error", "Payment verification failed", "error");
            });

    }, [sessionId, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                <CheckCircle className="mx-auto text-green-500" size={80} />
                <h1 className="text-2xl font-bold mt-4 text-gray-800">
                    Payment Successful
                </h1>
                <p className="text-gray-600 mt-2">
                    Verifying your payment...
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
