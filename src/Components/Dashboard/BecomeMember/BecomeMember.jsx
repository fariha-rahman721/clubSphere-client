import React from 'react';
import Container from '../../Shared/Container';

const BecomeMember = () => {
    return (
        <div className='w-5/12 mx-auto mt-10'>
            <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Become A Member</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default BecomeMember;