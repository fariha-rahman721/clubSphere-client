import React, { useEffect, useState, useContext } from "react";
import { MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router";

import Loading from "../../Loading";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyEvents = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchJoinedEvents = async () => {
            try {
                const token = await user.getIdToken();
                const res = await fetch(`http://localhost:3000/joinEvents?email=${user.email}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch joined events");
                const data = await res.json();

                // Optional: If you want full event details from events collection
                const eventIds = data.map(d => d.eventId);
                const eventsRes = await fetch("http://localhost:3000/events");
                const allEvents = await eventsRes.json();
                const joinedEvents = allEvents.filter(e => eventIds.includes(e._id));

                setEvents(joinedEvents);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [user]);

    if (loading) return <Loading />;
    if (events.length === 0) return <p className="text-center mt-10 text-gray-500">You have not joined any events yet.</p>;

    return (
        <div className="w-11/12 mx-auto my-10">
            <h1 className="text-3xl p-7 text-center font-bold text-[#FFAA6E]">My Events</h1>
            <div className="w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {events.map((event) => {
                    const dateObj = new Date(event.eventDate);
                    const month = dateObj.toLocaleString("en-US", { month: "short" });
                    const day = dateObj.getDate();
                    const time = dateObj.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                    });

                    return (
                        <Link
                            key={event._id}
                            to={`/eventDetails/${event._id}`}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={event.imageUrl || "/placeholder.jpg"} // fallback if image not set
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />

                                {/* Date Badge */}
                                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg shadow px-2 py-1 w-12 text-center">
                                    <p className="text-xs font-bold text-red-500 uppercase">{month}</p>
                                    <p className="text-xl font-bold text-slate-900">{day}</p>
                                </div>

                                {/* Paid Badge */}
                                <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {event.isPaid ? "Paid" : "Free"}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="text-orange-600 text-xl font-extrabold mb-1 line-clamp-2">
                                    {event.title}
                                </h3>

                                {/* Info List */}
                                <div className="space-y-2 text-sm text-slate-600">
                                    <p className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-slate-400" /> {time}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" /> {event.location}
                                    </p>

                                    {event.maxAttendees && (
                                        <p className="flex items-center gap-2 mb-2">
                                            <Users className="w-4 h-4 text-slate-400" />
                                            Max {event.maxAttendees} attendees
                                        </p>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
                                    <span
                                        className={`font-bold text-lg text-orange-600 ${event.isPaid ? "text-orange-600" : "text-orange-700"}`}
                                    >
                                        {event.isPaid ? 'Permanent member' : "Joined as a member"}
                                    </span>
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
