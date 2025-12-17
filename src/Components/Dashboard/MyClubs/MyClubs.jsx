import UseAuth from "../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";


const MyClubs = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const {
        data: myClubs = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["myClubs", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const token = await user.getIdToken();
            const res = await axiosSecure.get(`/myClubs?email=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        },
    });

    
    const handleRemoveClub = async (clubId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be removed from this club!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FFAA6E",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, leave club",
        });

        if (!result.isConfirmed) return;

        try {
            const token = await user.getIdToken();
            const res = await axiosSecure.delete("/leaveClub", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    clubId,
                    userEmail: user.email,
                },
            });

            if (res.data?.deletedCount > 0) {
                Swal.fire("Removed!", "You left the club successfully.", "success");
                refetch(); 
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to leave club.", error);
        }
    };

    if (isLoading) return <Loading />;

    if (myClubs.length === 0) {
        return (
            <p className="text-center mt-10 text-gray-500">
                You have not joined any clubs yet.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {myClubs.map((club) => (
                <div
                    key={club._id}
                    className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
                >
                    <img
                        src={club.bannerImage}
                        alt={club.clubName}
                        className="w-full h-48 object-cover"
                    />

                    <div className="p-4 flex-1">
                        <h2 className="text-xl font-bold">{club.clubName}</h2>
                        <p className="text-gray-600 mt-2">{club.description}</p>

                        <p className="text-sm mt-2 text-gray-500">
                            Joined At:{" "}
                            {new Date(club.joinInfo.joinedAt).toLocaleDateString()}
                        </p>

                        <p className="text-sm mt-1 text-gray-500">
                            Status: {club.joinInfo.status}
                        </p>

                        {club.joinInfo.paymentId && (
                            <p className="text-sm mt-1 text-green-500">
                                Paid Membership
                            </p>
                        )}
                    </div>

                    {/* ❌ REMOVE BUTTON */}
                    <div className="p-4 border-t">
                        <button
                            onClick={() => handleRemoveClub(club._id)}
                            className="btn btn-block bg-red-500 hover:bg-red-600 text-white"
                        >
                            Leave Club
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyClubs;
