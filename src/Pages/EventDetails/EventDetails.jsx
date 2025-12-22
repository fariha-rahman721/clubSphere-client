import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
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

  // Fetch event
  useEffect(() => {
    fetch(`https://clubsphere-theta.vercel.app/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Check joined
  useEffect(() => {
    if (!user?.email) return;

    const checkJoined = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(
          `https://clubsphere-theta.vercel.app/joinEvents?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setJoined(data.some((item) => item.eventId === id));
      } catch (err) {
        console.error(err);
      }
    };

    checkJoined();
  }, [user, id]);

  // Join FREE event
  const handleFreeJoin = async () => {
    if (!user?.email) {
      toast.error("Login required");
      return;
    }

    try {
      const token = await user.getIdToken();
      const res = await fetch("https://clubsphere-theta.vercel.app/joinEvents", {
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

      if (!res.ok) throw new Error();

      toast.success("Successfully joined event");
      setJoined(true);
    } catch {
      toast.error("Join failed");
    }
  };

  // Stripe payment for PAID event
  const handlePaidEventPayment = async () => {
    if (!user?.email) {
      toast.error("Login required");
      return;
    }

    try {
      const res = await fetch(
        "https://clubsphere-theta.vercel.app/payment-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: event.eventFee,
            eventId: event._id,
            senderEmail: user.email,
            clubName: event.title,
          }),
        }
      );

      const data = await res.json();
      window.location.replace(data.url); // 🔥 Stripe redirect
    } catch {
      toast.error("Payment failed");
    }
  };

  if (loading) return <Loading />;
  if (!event) return <p className="text-center mt-10 text-red-500">Event not found</p>;

  const {
    title,
    imageUrl,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    maxAttendees,

  } = event;

  return (
    <div className="card w-full md:w-5/12 mx-auto bg-white shadow-lg rounded-xl my-6">
      <div className="bg-[#FFAA6E]  p-8">
        <h2 className="text-2xl font-bold text-white text-center">{title}</h2>
      </div>

      <img src={imageUrl} alt={title} className="h-80 w-full object-cover" />

      <div className="p-6 space-y-3">
        <p>{description}</p>

        <div className="flex gap-2">
          <Calendar size={18} />
          {formatDate(eventDate)}
        </div>

        <div className="flex gap-2">
          <MapPin size={18} />
          {location}
        </div>

        <p className={isPaid ? "text-red-600" : "text-green-600"}>
          {isPaid ? `Paid Event: $${eventFee}` : "Free Event"}
        </p>

        {maxAttendees && <p>Max Attendees: {maxAttendees}</p>}

        {isPaid ? (
          <button
            onClick={handlePaidEventPayment}
            className="w-full bg-[#FFAA6E] text-white py-2 rounded-lg font-bold"
          >
            Register & Pay ${eventFee}
          </button>
        ) : (
          <button
            onClick={handleFreeJoin}
            disabled={joined}
            className={`w-full py-2 rounded-lg font-bold ${joined ? "bg-gray-400" : "bg-orange-500 text-white"
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
