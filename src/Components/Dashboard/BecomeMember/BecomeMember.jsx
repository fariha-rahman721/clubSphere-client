import React from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import toast from 'react-hot-toast';

const BecomeMember = () => {
    const axiosSecure = useAxiosSecure();

    const handleRequest = async () => {
        try {
            await axiosSecure.post("/memberRequest");
            toast.success("Request sent, please wait for admin approval");
        } catch (err) {
            if (err.response?.status === 409) {
                toast.error('You already requested, please wait for admin approval');
            } else {
                toast.error('Something went wrong. Try again.');
            }
        }

    };

    return (
        <div className='w-5/12 mx-auto mt-10'>
            <div className="card bg-base-100 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-xl text-center text-orange-500 font-bold">Become A Member</h2>
                    <p>Please read all our trems and conditions to become a member</p>
                    <div className="card-actions flex justify-center gap-4 mt-3">
                        <button onClick={handleRequest} className="btn bg-orange-500 text-white font-semibold hover:bg-orange-400">Continue</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BecomeMember;
