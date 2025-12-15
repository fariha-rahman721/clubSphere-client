import React from 'react';
import { useLoaderData, useParams } from 'react-router';

import SingleClub from './SingleClub';

const ClubDetails = () => {
    const data = useLoaderData();
    const { id } = useParams();
    const details = data.find(item => String(item._id) === String(id));
    return (
        <div>
           
            <div className="w-full my-10">
             {details ? (
                    <SingleClub details={details} />
                ) : (
                    <p className="text-center mt-10">Club not found...</p>
                )}
            </div>
        </div>
    );
};

export default ClubDetails;
