import React, { useState } from "react";

const CreateEvent = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eventDate: "",
        location: "",
        isPaid: false,
        eventFee: "",
        maxAttendees: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="max-w-xl mx-auto m-10 bg-white shadow-md rounded-lg p-6">
            <div className="bg-[#FFAA6E]">
            <h2 className="text-2xl font-bold p-6 text-white mb-6 text-center">
                Create New Event
            </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Event title"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Event description"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block font-medium mb-1">Event Date & Time</label>
                    <input
                        type="datetime-local"
                        name="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium mb-1">Location</label>
                    <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Event location"
                    />
                </div>

                {/* Max Attendees */}
                <div>
                    <label className="block font-medium mb-1">Max Attendees</label>
                    <input
                        type="number"
                        name="maxAttendees"
                        min="1"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Optional"
                    />
                </div>

                {/* Paid Event */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isPaid"
                        checked={formData.isPaid}
                        onChange={handleChange}
                        className="checkbox"
                    />
                    <span className="font-medium">Paid Event</span>
                </div>

                {/* Event Fee */}
                {formData.isPaid && (
                    <div>
                        <label className="block font-medium mb-1">Event Fee ($)</label>
                        <input
                            type="number"
                            name="eventFee"
                            min="0"
                            required
                            value={formData.eventFee}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Event fee"
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-outline w-1/2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn bg-[#FFAA6E] text-white hover:bg-orange-500 w-1/2"
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
