import React, { useEffect, useState, useContext } from "react";
import { MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../Loading";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyEvents = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchMyEvents = async () => {
            try {
                const token = await user.getIdToken();

                const res = await fetch(
                    `https://clubsphere-theta.vercel.app/myEvents?email=${user.email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch events");

                const data = await res.json();
                setEvents(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, [user]);

    const handleLeaveEvent = async (eventId) => {
        const confirm = await Swal.fire({
            title: "Leave Event?",
            text: "You will be removed from this event",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, leave",
        });

        if (!confirm.isConfirmed) return;

        try {
            const token = await user.getIdToken();

            const res = await fetch("https://clubsphere-theta.vercel.app/leaveEvent", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    eventId,
                    userEmail: user.email,
                }),
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire("Left!", "You have left the event.", "success");
                setEvents(prev => prev.filter(e => e._id !== eventId));
            } else {
                Swal.fire("Error", "Failed to leave event", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    if (loading) return <Loading />;
    if (events.length === 0)
        return (
            <p className="text-center mt-10 text-gray-500">
                You have not joined any events yet.
            </p>
        );

    return (
        <div className="w-11/12 mx-auto my-10">
            <h1 className="text-3xl p-7 text-center font-bold text-[#FFAA6E]">
                My Events
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                {events.map(event => {
                    const date = new Date(event.eventDate);
                    const month = date.toLocaleString("en-US", { month: "short" });
                    const day = date.getDate();
                    const time = date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                    });

                    return (
                        <Link
                            key={event._id}
                            to={`/eventDetails/${event._id}`}
                            className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="relative h-72">
                                <img
                                    src={event.imageUrl || "/placeholder.jpg"}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-center">
                                    <p className="text-xs text-red-500">{month}</p>
                                    <p className="text-lg font-bold">{day}</p>
                                </div>

                                <div className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                                    {event.joinType === "paid" ? "Paid" : "Free"}
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-xl font-bold text-orange-600">
                                    {event.title}
                                </h3>

                                <p className="flex items-center gap-2 text-sm">
                                    <Clock size={14} /> {time}
                                </p>
                                <p className="flex items-center gap-2 text-sm">
                                    <MapPin size={14} /> {event.location}
                                </p>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="font-semibold text-orange-600">
                                        {event.joinType === "paid"
                                            ? "Paid Event Member"
                                            : "Joined Free Event"}
                                    </span>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLeaveEvent(event._id);
                                        }}
                                        className="btn bg-orange-500 text-white text-sm"
                                    >
                                        Leave
                                    </button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MyEvents;
