import React from "react";
import { NavLink } from "react-router";

const Privacy = () => {
    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Top bar */}
            <div
                className=" text-white p-4 flex justify-between items-center"
                style={{
                    width: "100vw",
                    maxWidth: "100vw",
                    marginLeft: "calc(-50vw + 50%)",
                }}
            >
                <div className="flex gap-2 items-center font-bold px-5">
                   
                    <span>ClubSphere</span>
                </div>
               
            </div>

            {/* Main heading */}
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-10 mb-10 text-center text-[#FFAA6E]">
                Privacy Policy
            </h1>

            <p className="mb-10 text-gray-700 text-justify max-w-4xl mx-auto">
                At <strong>ClubSphere</strong>, we value your privacy and are committed to
                protecting your personal information while you use our club management
                platform.
            </p>

            {/* CARD SECTION */}
            {[
                {
                    title: "Information We Collect",
                    content: (
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Personal Info:</strong> Name, email, photo, role</li>
                            <li><strong>Club Activity:</strong> Memberships & events</li>
                            <li><strong>Technical Data:</strong> Device & usage logs</li>
                        </ul>
                    ),
                },
                {
                    title: "How We Use Your Information",
                    content: (
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Manage clubs and events</li>
                            <li>Personalize dashboard by role</li>
                            <li>Improve platform performance</li>
                            <li>Send notifications & updates</li>
                        </ul>
                    ),
                },
                {
                    title: "Cookies & Tracking",
                    content: (
                        <p>
                            We use cookies to improve user experience and analyze platform
                            usage. Cookie preferences can be managed in browser settings.
                        </p>
                    ),
                },
                {
                    title: "Data Security",
                    content: (
                        <p>
                            We apply reasonable security measures to protect user data,
                            though no system is 100% secure.
                        </p>
                    ),
                },
                {
                    title: "Your Rights",
                    content: (
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access and review your data</li>
                            <li>Request corrections or deletion</li>
                            <li>Deactivate your account</li>
                        </ul>
                    ),
                },
            ].map((section, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-xl p-6 mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                    <h2 className="text-xl font-semibold mb-3 text-[#FFAA6E] border-b-2 border-[#FFAA6E]/40 inline-block pb-1">
                        {section.title}
                    </h2>
                    <div className="text-gray-700 mt-3 text-justify">
                        {section.content}
                    </div>
                </div>
            ))}

            {/* Contact */}
            <div className="text-center mt-14">
                <h2 className="text-xl font-semibold mb-3 text-[#FFAA6E]">
                    Contact Us
                </h2>
                <p className="text-gray-700">
                    Have questions about privacy or data usage?
                </p>
                <p className="inline-block mt-3 px-6 py-2 rounded-full bg-[#FFAA6E] text-white font-medium hover:opacity-90 transition">
                    📞 +880 234 546 883
                </p>
            </div>

            <p className="mt-10 text-sm text-gray-500 text-center">
                Last updated: January 2026
            </p>
        </div>
    );
};

export default Privacy;
