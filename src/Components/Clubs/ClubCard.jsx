import React from 'react';
import { MapPin, Mail, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';

const ClubCard = ({ club }) => {

    const imgSrc = club.bannerImage;

    return (
        <div
            className="
                max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden 
                border border-slate-100 lg:flex 
                transition-all duration-300 ease-out 
                hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl
            "
        >
            {/* Image Section */}
            <figure className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                <img
                    src={imgSrc}
                    alt={club.clubName}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </figure>

            {/* Details Section */}
            <div className="lg:w-1/2 p-8 flex flex-col bg-linear-to-l from-orange-200 via-orange-100 to-orange-50 justify-between">
                <div>
                    <div className="text-2xl font-bold flex items-center gap-2 ">
                        <h1 className="w-6 h-6" /> {club.clubName}
                        {club.status === 'approved' && (
                            <span className="text-green-600 flex items-center gap-1 text-sm font-medium">
                                <CheckCircle className="w-4 h-4" /> Approved
                            </span>
                        )}
                    </div>

                    <p className="opacity-80">{club.description}</p>

                    <div className="flex flex-col gap-2 text-sm">
                        <div>
                            <h1 className="w-4 h-4 opacity-70" />
                            <span className="font-medium">Category:</span> {club.category}
                            <div className="w-4 h-4 opacity-70" />
                            <span className="font-medium">Location:</span> {club.location}
                        </div>

                        <div className="text-sm opacity-70 pt-2">
                            <p>Created: {new Date(club.createdAt).toLocaleDateString()}</p>
                            <p>Updated: {new Date(club.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-3">
                    <Link
                        to={`/clubDetails/${club._id || club.clubName}`}
                        className="btn btn-primary w-full rounded-xl"
                    >
                        Join Now (Free)
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ClubCard;
