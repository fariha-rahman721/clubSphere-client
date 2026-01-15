import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            toast.error('Please fill up all required fields');
            return;
        }

        toast.success('Message sent successfully!');
        form.reset();
    };

    return (
        <div className="section w-11/12 max-w-7xl mx-auto py-14">
           

            {/* Heading */}
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFAA6E]">
                    Contact Us
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                    Have questions, feedback, or need support?  
                    Reach out to the ClubSphere team — we’re here to help.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Contact Info */}
                <div className="bg-white rounded-xl shadow-md p-6 space-y-6 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-4">
                        <Phone className="w-8 h-8 text-[#FFAA6E]" />
                        <div>
                            <h3 className="font-semibold">Phone</h3>
                            <p className="text-gray-600">+880 234 546 883</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Mail className="w-8 h-8 text-[#FFAA6E]" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-gray-600">support@clubsphere.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <MapPin className="w-8 h-8 text-[#FFAA6E]" />
                        <div>
                            <h3 className="font-semibold">Location</h3>
                            <p className="text-gray-600">Dhaka, Bangladesh</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAA6E]"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAA6E]"
                        />

                        <textarea
                            name="message"
                            rows="4"
                            placeholder="Your Message"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFAA6E]"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full bg-[#FFAA6E] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            Send Message
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Contact;
