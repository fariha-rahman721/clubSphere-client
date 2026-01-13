import { Lightbulb, Target, Users } from 'lucide-react';
import React from 'react';

const WhyJoinClub = () => {
    return (
        <div className='w-11/12 mx-auto px-2 sm:px-4'>
            <h1 className='text-2xl sm:text-3xl font-extrabold text-[#FFAA6E] text-center'>
                <span className='text-black'>Why</span> Join A Club
            </h1>

            <p className='text-center max-w-2xl text-base sm:text-xl text-gray-500 mt-4 mx-auto'>
                Clubs create opportunities for learning, collaboration, and personal development through community-driven activities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 justify-items-center">

                <div className="card w-full sm:w-[90%] md:w-80 lg:w-96 bg-linear-to-l from-orange-200 via-yellow-50 to-yellow-50 card-sm shadow-md">
                    <div className="card-body">
                        <Users className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-300 rounded p-1" />
                        <h2 className="card-title">Meet New People</h2>
                        <p>
                            Join a community of friendly, like-minded individuals who share your passions. Build new friendships, connect with creative talents, and grow your personal network through regular meetups and club activities.
                        </p>
                    </div>
                </div>

                <div className="card w-full sm:w-[90%] md:w-80 lg:w-96 bg-linear-to-l from-orange-200 via-yellow-50 to-yellow-50 card-sm shadow-md">
                    <div className="card-body">
                        <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-400 rounded p-1" />
                        <h2 className="card-title">Learn & Improve Skills</h2>
                        <p>
                            Clubs offer workshops, expert sessions, and hands-on activities that help you develop new skills or enhance existing ones. Whether you're a beginner or advanced, you’ll always find something valuable to learn.
                        </p>
                    </div>
                </div>

                <div className="card w-full sm:w-[90%] md:w-80 lg:w-96 bg-linear-to-l from-orange-200 via-yellow-50 to-yellow-50 card-sm shadow-md">
                    <div className="card-body">
                        <Target className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded p-1" />
                        <h2 className="card-title">Achieve Personal Goals</h2>
                        <p>
                            Stay motivated and focused by surrounding yourself with people who push you to grow. Clubs help members stay active, inspired, and consistent with their goals through teamwork and shared achievements.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WhyJoinClub;
