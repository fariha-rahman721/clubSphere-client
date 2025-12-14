import React, { useState } from "react";
import toast from "react-hot-toast";

const EventRegistrationCard = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        eventId: "",
        userEmail: "",
        clubId: "",
    });

    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       

        // Add default fields
        const registration = {
            ...formData,
            status: "registered",
            paymentId: null, // or provide if paid
            registeredAt: new Date(),
        };

        if (onSubmit) onSubmit(registration);
       
        toast.success("Registered Successfully!");
    };

    return (
        <div className="w-6/12 mx-auto mt-10">
            <div className="bg-[#FFAA6E] text-white p-6 rounded-t-lg">
                <h1 className="text-center text-3xl font-extrabold">
                    Join an Upcoming Event
                </h1>
            </div>
            <div>
                <div className="card bg-base-100 w-full shrink-0 shadow-2xl rounded-b-lg">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset w-full space-y-4">
                                <div>
                                    <label className="label">Name of the Event</label>
                                    <input
                                        type="text"
                                        name="eventId"
                                        value={formData.eventId}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="Name of the Event"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">Your Email</label>
                                    <input
                                        type="email"
                                        name="userEmail"
                                        value={formData.userEmail}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">Club Name</label>
                                    <input
                                        type="text"
                                        name="clubId"
                                        value={formData.clubId}
                                        onChange={handleChange}
                                        className="input w-full"
                                        placeholder="Club Name"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn bg-[#FFAA6E] w-full mt-4"
                                >
                                    Register
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventRegistrationCard;
