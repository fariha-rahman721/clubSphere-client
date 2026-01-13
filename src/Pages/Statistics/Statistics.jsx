import React from 'react';

const stats = [
    { number: "1.2K+", label: "Active Members" },
    { number: "350+", label: "Clubs Created" },
    { number: "500+", label: "Events Organized" },
    { number: "95%", label: "Member Satisfaction" },
];

const Statistics = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800">Our <span className='text-[#FFAA6E]'>Achievements</span></h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                        >
                            <p className="text-3xl font-bold text-yellow-500 mb-2">{stat.number}</p>
                            <p className="text-gray-700 text-lg">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
