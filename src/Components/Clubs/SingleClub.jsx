import {
    Calendar,
    Clock,
    Mail,
    MapPin
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Wings from './Wings';
import { Link } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const SingleClub = ({ details }) => {
    const { user } = UseAuth();

    const [wingsData, setWingsData] = useState([]);
    const [joined, setJoined] = useState(false);
    const [refetch, setRefetch] = useState(false);

    const imgSrc = details.bannerImage;

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };


    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://clubsphere-theta.vercel.app/myClubs?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                const isJoined = data?.some(
                    club => club.clubId === details._id
                );
                setJoined(isJoined);
            })
            .catch(() => { });
    }, [user, refetch, details._id]);


    const handleFreeJoin = async () => {
        if (!user?.email) {
            toast.error("You must be logged in to join.");
            return;
        }

        const membership = {
            clubId: details._id,
            clubName: details.clubName,
            userEmail: user.email,
            joinedAt: new Date(),
            status: "active",
        };

        try {
            const res = await fetch("https://clubsphere-theta.vercel.app/joinClubs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.accessToken}`,
                },
                body: JSON.stringify(membership),
            });

            if (!res.ok) throw new Error("Join failed");

            setJoined(true);
            setRefetch(!refetch);

            toast.success(`Successfully joined ${details.clubName}`);
        } catch (err) {
            toast.error("Failed to join club. Try again!", err);
        }
    };


    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://clubsphere-theta.vercel.app/myClubs?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {

                const joinedClub = data?.find(club => club._id === details._id);
                if (joinedClub) {
                    setJoined(true);
                } else {
                    setJoined(false);
                }
            })
            .catch(() => {
                setJoined(false);
            });
    }, [user, refetch, details._id]);


    useEffect(() => {
        fetch(`https://clubsphere-theta.vercel.app/wings`)
            .then(res => res.json())
            .then(data => {
                const clubWings = data.filter(w => w.clubId === details._id);
                setWingsData(clubWings);
            })
            .catch(() => { });
    }, [details._id]);

    return (
        <div>
            <h1 className="pb-3 text-3xl font-bold text-center">
                Welcome to <span className="text-[#FFAA6E]">{details.clubName}</span>!
            </h1>

            <p className="text-center mb-5 w-10/12 mx-auto">
                {details.description}
            </p>

            <div className="w-10/12 mx-auto flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>
                        <strong>Created:</strong> {formatDate(details.createdAt)}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>
                        <strong>Updated:</strong> {formatDate(details.updatedAt)}
                    </span>
                </div>
            </div>

            <div className="w-10/12 mx-auto mb-8">
                <img
                    className="w-full h-[800px] object-cover rounded-2xl shadow-xl"
                    src={imgSrc}
                    alt={details.clubName}
                />
            </div>

            <div className="w-10/12 mx-auto flex justify-between gap-4">
                <div className="flex items-center text-slate-500">
                    <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                    Located at <span className="text-[#FFAA6E] ml-1">{details.location}</span>
                </div>

                <div className="flex items-center text-slate-500">
                    <Mail className="w-4 h-4 mr-1.5 text-primary" />
                    Manager: <span className="text-[#FFAA6E] ml-1">{details.managerEmail}</span>
                </div>
            </div>

            {/* WINGS */}
            <div className="w-10/12 mx-auto mt-10">
                <h1 className="text-3xl font-bold text-center">
                    About our <span className="text-[#FFAA6E]">clubs</span>
                </h1>

                {wingsData.length > 0 ? (
                    wingsData.map(wing => <Wings key={wing._id} wing={wing} />)
                ) : (
                    <p className="text-gray-500 text-center">No wings found</p>
                )}
            </div>

            {/* MEMBERSHIP */}
            <div className="flex w-8/12 mx-auto gap-8 mt-10">
                {/* FREE */}
                <div className="w-1/2">
                    <div className="card bg-orange-300 text-white">
                        <div className="card-body">
                            <span className="badge badge-success">Free</span>

                            <div className="flex justify-between mt-2">
                                <h2 className="text-3xl font-bold">Free Join</h2>
                                <span>$0/month</span>
                            </div>

                            <ul className="mt-4 text-xs space-y-2">
                                <li>✔ Join public events</li>
                                <li>✔ Community access</li>
                                <li>✔ Event notifications</li>
                            </ul>

                            <button
                                onClick={handleFreeJoin}
                                disabled={joined}
                                className={`btn btn-block mt-6
                                    ${joined
                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                        : "btn-neutral"
                                    }`}
                            >
                                {joined ? "Joined" : "Join for Free"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* PREMIUM */}
                <div className="w-1/2">
                    <div className="card bg-orange-800 text-white">
                        <div className="card-body">
                            <span className="badge badge-warning">Premium</span>

                            <div className="flex justify-between mt-2">
                                <h2 className="text-3xl font-bold">Premium</h2>
                                <span>{details.membershipFee}/month</span>
                            </div>

                            <ul className="mt-4 text-xs space-y-2">
                                <li>✔ Premium events</li>
                                <li>✔ Workshops</li>
                                <li>✔ Priority access</li>
                            </ul>

                            <Link
                                to={`/dashboard/payment?clubId=${details._id}`}
                                className="btn btn-block mt-6"
                            >
                                Get Premium Access
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleClub;
