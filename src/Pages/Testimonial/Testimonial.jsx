import React from 'react';

const testimonials = [
    {
        text: "Clubsphere has completely transformed the way I engage with my community. Highly recommend!",
        name: "Jane Doe",
        role: "Community Leader",
        img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        text: "A perfect platform to stay connected and share ideas with like-minded people.",
        name: "John Smith",
        role: "Event Organizer",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        text: "The best platform for clubs to grow and manage their events effortlessly.",
        name: "Emily Lee",
        role: "Member",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
];

const Testimonial = () => {
    return (
        <section className="bg-gray-50 section py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800">What Our <span className='text-[#FFAA6E]'>Members</span> Say</h2>

                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1"
                        >
                            <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                            <div className="flex items-center justify-center space-x-4">
                                <img
                                    src={testimonial.img}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full border-2 border-yellow-400"
                                />
                                <div className="text-left">
                                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
