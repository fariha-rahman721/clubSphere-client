import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loading from "../../Loading";

const MyClubs = () => {
    const { user } = UseAuth();              
    const axiosSecure = UseAxiosSecure();

    const { data: myClubs = [], isLoading } = useQuery({
        queryKey: ["myClubs", user?.email],
        enabled: !!user?.email,               
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/joinClubs?email=${user.email}`
            );
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h1>My Joined Clubs: {myClubs.length}</h1>
        </div>
    );
};

export default MyClubs;
