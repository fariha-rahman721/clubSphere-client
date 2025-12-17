import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Calendar, MapPin } from "lucide-react";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const EventDetails = () => {
  const { user } = useContext(AuthContext); 
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  // Fetch event details
  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Check if user already joined this event
  useEffect(() => {
    if (!user?.email) return;

    const checkJoined = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(
          `http://localhost:3000/joinEvents?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        const isJoined = data.some((item) => item.eventId === id);
        setJoined(isJoined);
      } catch (err) {
        console.error("Check joined error:", err);
      }
    };

    checkJoined();
  }, [user, id]);

  // Join FREE event
  const handleEventJoin = async () => {
    if (!user?.email) {
      toast.error("You must be logged in to join.");
      return;
    }

    try {
      const token = await user.getIdToken();
      const res = await fetch("http://localhost:3000/joinEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: user.email,
          eventId: event._id,
          joinedAt: new Date(),
        }),
      });

      if (!res.ok) throw new Error("Join failed");

      toast.success(`Successfully joined ${event.title}`);
      setJoined(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to join event");
    }
  };

  if (loading) return <Loading />;
  if (!event)
    return (
      <p className="text-center mt-10 text-red-500">Event not found!</p>
    );

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

  return (
    <div className="card w-full md:w-5/12 mx-auto bg-white shadow-lg rounded-xl overflow-hidden my-6">
      {/* Header */}
      <div className="bg-[#FFAA6E] p-8">
        <h2 className="text-2xl font-bold text-white text-center">{title}</h2>
      </div>

      <div className="relative h-80">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-6 space-y-3">
        <p>{description}</p>

        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>Event Date: {formatDate(eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Created: {formatDate(createdAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <span>Location: {location}</span>
        </div>

        <p className={`font-semibold ${isPaid ? "text-red-600" : "text-green-600"}`}>
          {isPaid ? `Paid Event: $${eventFee}` : "Free Event"}
        </p>

        {maxAttendees && (
          <p className="text-sm text-gray-500">Max Attendees: {maxAttendees}</p>
        )}

        {/* ACTION */}
        {isPaid ? (
          <Link
            to={`/dashboard/payment?type=event&eventId=${event._id}&amount=${eventFee}`}
            className="block mt-4 text-center bg-[#FFAA6E] text-white py-2 rounded-lg font-bold"
          >
            Register & Pay ${eventFee}
          </Link>
        ) : (
          <button
            onClick={handleEventJoin}
            disabled={joined}
            className={`w-full mt-4 py-2 rounded-lg font-bold ${
              joined ? "bg-gray-400 cursor-not-allowed text-white" : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {joined ? "Joined" : "Join Event"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
