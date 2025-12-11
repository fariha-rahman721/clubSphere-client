import React, { useState } from 'react';
import Container from '../Shared/Container';
import {
    MapPin, Mail, Calendar, CheckCircle, Camera, Clock, ArrowRight
} from 'lucide-react';

const SingleClub = ({ details }) => {
    const [imgSrc, setImgSrc] = useState(details.bannerImage);
    const fallbackImage = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';



    return (
        <Container>
            <div className="w-11/12 mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-slate-100">
            <h1 className='text-center text-3xl text-[#FFAA6E] font-bold m-4'><span className='text-black'>Welcome to</span> {details.clubName}!</h1>
                <div className="flex flex-col">

                    {/* Image Section */}
                    <div className="relative min-h-[200px] mt-5 w-10/12 mx-auto">
                        <img
                            src={imgSrc}
                            alt={details.clubName}
                            className="w-9/12 mx-auto object-cover transition-transform duration-700 hover:scale-105"
                            onError={() => setImgSrc(fallbackImage)}
                        />
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm">
                                <h1 className="w-3.5 h-3.5" /> {details.category}
                            </span>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 items-center p-6 md:p-8 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2">{details.clubName}</h2>
                                <div className="flex items-center text-center text-slate-500 text-sm font-medium">
                                    <MapPin className="w-4 h-4 mr-1.5 text-primary " /> {details.location}
                                </div>
                            </div>
                           
                        </div>

                        <p className="text-slate-600 leading-relaxed mb-8">{details.description}</p>

                        {/* Membership Card */}
                        <div className="mb-8 w-9/12 mx-auto">
                        
                            <div className="card w-full shadow-sm bg-black text-white">
                                <div className="card-body">
                                    <span className="badge badge-xs badge-warning">Most Popular</span>
                                    <div className="flex justify-between mt-2">
                                        <h2 className="text-3xl font-bold">Premium</h2>
                                        <span className="text-xl">$29/month</span>
                                    </div>
                                    <ul className="mt-6 flex flex-col gap-2 text-xs">
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            Exclusive access to premium events
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            Special training sessions / masterclasses
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            Batch processing capabilities
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            Early access to workshops & registration
                                        </li>
                                        <li className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                            Premium badge on profile
                                        </li>
                                        
                                    </ul>
                                    <div className="mt-6">
                                        <button className="btn  btn-block">Choose Plan</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto border-t border-slate-100 pt-4 text-center">
                            <button className="text-sm text-slate-500 hover:text-primary font-medium flex items-center justify-center gap-1 mx-auto transition-colors">
                                View Full Club Policy <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SingleClub;
