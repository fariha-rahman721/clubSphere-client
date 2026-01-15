import React from 'react';
import { Users, CalendarDays, ShieldCheck } from 'lucide-react';

const About = () => {
    return (
        <div className="section w-11/12 max-w-7xl mx-auto py-14">
            
            {/* Heading */}
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFAA6E]">
                    About ClubSphere
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-gray-600">
                    ClubSphere is a modern club management platform designed to bring
                    students, organizers, and communities together through seamless
                    collaboration and engaging events.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <Users className="w-10 h-10 text-[#FFAA6E] mb-4" />
                    <h2 className="text-xl font-semibold mb-2">
                        Community Driven
                    </h2>
                    <p className="text-gray-600">
                        ClubSphere helps members connect, collaborate, and grow together
                        by creating a strong and inclusive community environment.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CalendarDays className="w-10 h-10 text-[#FFAA6E] mb-4" />
                    <h2 className="text-xl font-semibold mb-2">
                        Smart Event Management
                    </h2>
                    <p className="text-gray-600">
                        Easily create, manage, and participate in club events with
                        real-time updates, member tracking, and smooth coordination.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <ShieldCheck className="w-10 h-10 text-[#FFAA6E] mb-4" />
                    <h2 className="text-xl font-semibold mb-2">
                        Secure & Role-Based
                    </h2>
                    <p className="text-gray-600">
                        Role-based dashboards for Admins, Managers, and Members ensure
                        secure access and a personalized experience for everyone.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
