import React from 'react';
import { Search, UserPlus, Calendar } from 'lucide-react';

const stepsData = [
    {
        icon: Search,
        title: 'Discover',
        description:
            'Browse through hundreds of local clubs and upcoming events tailored to your interests.',
    },
    {
        icon: UserPlus,
        title: 'Connect',
        description:
            'Join a community, chat with members, and find your circle of like-minded people.',
    },
    {
        icon: Calendar,
        title: 'Participate',
        description:
            'RSVP to workshops, meetups, and adventures. Create memories and grow your skills.',
    },
];

const HowItWorks = () => {
    return (
        <div className="py-16 how-work md:py-24 bg-white section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    How <span className='text-[#FFAA6E]'>ClubSphere</span> Works
                </h2>

                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    Start your journey in three simple steps. We make it easy to find your community and start doing what you love.
                </p>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {stepsData.map((step, index) => (
                        <div key={step.title} className="flex flex-col items-center p-6">

                            <div className="relative mb-8">

                                {index > 0 && (
                                    <div className="absolute inset-y-0 left-0 right-1/2 border-t-2 border-gray-200 hidden md:block translate-x-[-100%] mt-6"
                                    />
                                )}

                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50 border border-indigo-200 mx-auto">
                                    <step.icon className="w-6 h-6 text-indigo-600" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {step.title}
                            </h3>

                            <p className="text-base text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                

            </div>
        </div>
    );
};

export default HowItWorks;
