import React from 'react';
import { useLoaderData } from 'react-router';
import ClubCard from '../../Components/Clubs/ClubCard';



const AllClubs = () => {
    const data = useLoaderData();

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Choose your Tribe</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-11/12 mx-auto mb-16">
                {data && data.length > 0 ? (
                    data.map((club) => (
                        <ClubCard key={club._id || club.clubName} club={club} />
                    ))
                ) : (
                    <p className="text-center">No clubs available.</p>
                )}
            </div>

        </div>
    );
};

export default AllClubs;
