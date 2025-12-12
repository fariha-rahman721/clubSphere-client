import React from 'react';
import { MapPin, Mail, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

const ClubCard = ({ club }) => {
    const imgSrc = club.bannerImage;

    return (
        <div
            className="
                 w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden 
                border border-slate-100 
                flex flex-col
                transition-all duration-300 ease-out 
                hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
            "
        >
            {/* Image Section */}
            <figure className="w-full h-64 overflow-hidden">
                <img
                    src={imgSrc}
                    alt={club.clubName}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </figure>

            {/* Details Section */}
            <div className="p-8 flex flex-col bg-linear-to-l from-orange-200 via-orange-100 to-orange-50 justify-between">
                <div>
                    <div className="text-2xl font-bold flex items-center gap-2 mb-4">
                        {club.clubName}
                        {club.status === 'approved' && (
                            <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                                <CheckCircle className="w-4 h-4" /> Approved
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 text-sm">
                        <div>
                            <span className="font-medium">Category:</span> {club.category}
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Link
                        to={`/clubDetails/${club._id || club.clubName}`}
                        className="btn bg-orange-400 w-full text-white rounded-xl"
                    >
                        Join Now (Free)
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ClubCard;
