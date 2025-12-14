import React from "react";
import { MapPin, Clock, Users } from "lucide-react";
import { Link, useLoaderData } from "react-router";

const Events = ({ clubName }) => {
    const events = useLoaderData(); // Load all event data

    return (
        <div className="w-11/12 mx-auto my-10">
        <h1 className="text-3xl p-7 text-center font-bold text-[#FFAA6E]">Upcoming Events</h1>
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
                    <div
                        key={event.id}
                        className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
                    >
                        {/* Image */}
                        <div className="relative h-80 overflow-hidden">
                            <img
                                src={event.imageUrl}
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
                            {clubName && (
                                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                                    Hosted by {clubName}
                                </p>
                            )}

                            <h3 className="text-orange-600 text-xl font-extrabold mb-1 line-clamp-2">
                                {event.title}
                            </h3>

                            <p className="text-sm text-slate-600 line-clamp-3 mb-3">
                                {event.description}
                            </p>

                            {/* Info List */}
                            <div className="space-y-2 text-sm text-slate-600">
                                <p className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-400" /> {time}
                                </p>

                                <p className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-slate-400" /> {event.location}
                                </p>

                                {event.maxAttendees && (
                                    <p className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        Max {event.maxAttendees} attendees
                                    </p>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
                                <span
                                    className={`font-bold text-lg text-orange-600 ${event.isPaid ? "text-orange-600" : "text-orange-700"
                                        }`}
                                >
                                    {event.isPaid ? `৳${event.eventFee}` : "Free"}
                                </span>

                                <Link to='/eventRegistration' className="px-4 py-2 bg-orange-400 text-white border border-slate-200 hover:bg-orange-700 rounded-lg text-sm font-semibold transition">
                                    {event.isPaid ? "Register Now" : "Join now"}
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
    );
};

export default Events;
