import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Calendar, MapPin } from "lucide-react";
import Loading from "../../Components/Loading";

const EventDetails = () => {
    const { id } = useParams(); // get event ID from URL
    const [event, setEvent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/events/${id}`) // fetch event by ID
            .then((res) => res.json())
            .then((data) => {
                setEvent(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Loading></Loading>;
    if (!event) return <p className="text-center mt-10 text-red-500">Event not found!</p>;

    const {
        
        title,
        imageUrl,
        description,
        eventDate,
        location,
        isPaid,
        eventFee,
        maxAttendees,
        createdAt,
    } = event;

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="card w-full md:w-5/12 mx-auto bg-white shadow-lg rounded-xl overflow-hidden my-6 hover:shadow-2xl transition-shadow duration-300">
            {/* Event Banner */}
            <div className="bg-[#FFAA6E] p-8">
                <h2 className="text-2xl font-bold text-white text-center">{title}</h2>
            </div>

             <div className="relative h-80 overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" src={imageUrl} alt="" />
             </div>

            {/* Event Body */}
            <div className="p-6 flex flex-col gap-3">
               

                <p className="text-gray-700">{description}</p>

                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>
                        Event Date: <strong>{formatDate(eventDate)}</strong>
                    </span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {formatDate(createdAt)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Location: <strong>{location}</strong></span>
                </div>

                <p className={`font-semibold ${isPaid ? "text-red-600" : "text-green-600"}`}>
                    {isPaid ? `Paid Event: $${eventFee}` : "Free Event"}
                </p>

                {maxAttendees && (
                    <p className="text-gray-500 text-sm">
                        Max Attendees: {maxAttendees}
                    </p>
                )}

                <Link to='/dashboard/payment'
                    className={`mt-4 w-full py-2 rounded-lg text-white font-bold text-center ${isPaid ? "bg-[#FFAA6E] hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"
                        } transition-colors duration-200`}
                >
                    {isPaid ? `Register & Pay $${eventFee}` : "Join Event"}
                </Link>
            </div>
        </div>
    );
};

export default EventDetails;
