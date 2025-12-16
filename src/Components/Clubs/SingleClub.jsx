import { Calendar, Clock, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import Wings from './Wings';
import { Link } from 'react-router';


import UseAuth from '../Hooks/UseAuth';
import toast from 'react-hot-toast';





const SingleClub = ({ details }) => {
    const [wingsData, setWingsData] = useState([]);
    const { user } = UseAuth()


    const imgSrc = details.bannerImage;
    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const handleFreeJoin = async () => {
        if (!user?.email) {
            toast.error("You must be logged in to join.");
            return;
        }

        const membership = {
            userEmail: user.email,
            clubId: details._id,
            status: "active",
            paymentId: null,
            joinedAt: new Date(),
            expiresAt: null,
        };

        try {
            const res = await fetch("http://localhost:3000/joinClubs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(membership),
            });

            if (!res.ok) throw new Error("Failed to join club");

            const data = await res.json();
            console.log("Membership added:", data);

            toast.success(`Successfully joined ${details.clubName}`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to join club. Try again!");
        }
    };


    useEffect(() => {
        fetch(`http://localhost:3000/wings`)
            .then(res => res.json())
            .then(data => {
                const clubWings = data.filter(w => w.clubId === details._id);
                setWingsData(clubWings);
            })
            .catch(err => console.error('Error fetching wings:', err));
    }, [details._id]);


    return (
        <div className="">
            <h1 className="pb-3 text-3xl font-bold text-center">
                Welcome to <span className="text-[#FFAA6E]">{details.clubName}</span>!
            </h1>

            <p className="text-center mb-5 w-10/12 mx-auto">
                {details.description}
            </p>
            <div className="w-10/12 mx-auto flex justify-between items-center mb-5">
                {/* Created Date */}
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span><span className='font-bold'>Created:</span> {formatDate(details.createdAt)}</span>
                </div>

                {/* Updated Date */}
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span><span className='font-bold'>Updated:</span> {formatDate(details.updatedAt)}</span>
                </div>
            </div>


            <div className="flex flex-col gap-8">

                {/* Full Width Image */}
                <div className="w-10/12 mx-auto mb-8">
                    <img
                        className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl contrast-125 lg:h-auto saturate-125 shadow-xl"
                        src={imgSrc}
                        alt={details.clubName}
                    />
                </div>

                {/* details */}
                <div className="w-10/12 mx-auto flex justify-between items-center gap-4">
                    {/* Location */}
                    <div className="flex items-center text-slate-500 text-md font-medium">
                        <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                        Located at <span className='text-[#FFAA6E] ml-1'> {details.location}</span>
                    </div>

                    {/* Manager Email */}
                    <div className="flex items-center text-slate-500 text-md font-medium">
                        <Mail className="w-4 h-4 mr-1.5 text-primary" />
                        Manager Email: <span className='text-[#FFAA6E] ml-1'> {details.managerEmail}</span>
                    </div>
                </div>

                {/* date */}





                <div className=" w-10/12 mx-auto">
                    <h1 className='text-3xl font-bold text-center'>About our <span className='text-[#FFAA6E]'>clubs</span></h1>
                    {wingsData && wingsData.length > 0 ? (
                        wingsData.map(wing => (
                            <Wings key={wing._id} wing={wing} />
                        ))
                    ) : (
                        <p className="text-gray-500">Loading wings...</p>
                    )}
                </div>

                {/* Membership Card */}
                <div className="flex w-8/12 mx-auto">
                    <div className="mb-8 mx-auto w-5/12 md:w-4/12">
                        <div className="card w-full shadow-sm bg-orange-300 text-white">
                            <div className="card-body">

                                <span className="badge badge-xs badge-success">Free</span>

                                <div className="flex justify-between mt-2">
                                    <h2 className="text-3xl font-bold">Free Join</h2>
                                    <span className="text-xl">$0/month</span>
                                </div>

                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li className="flex items-center">✔ Join public club events</li>
                                    <li className="flex items-center">✔ Access basic workshops</li>
                                    <li className="flex items-center">✔ Participate in community activities</li>
                                    <li className="flex items-center">✔ Receive event notifications</li>
                                    <li className="flex items-center">✔ Standard member profile</li>
                                </ul>

                                <div className="mt-6">
                                    <button onClick={handleFreeJoin} className="btn btn-block btn-neutral">
                                        Join for Free
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="mb-8 mx-auto w-5/12 md:w-4/12">
                        <div className="card w-full shadow-sm bg-orange-800 text-white">
                            <div className="card-body">

                                <span className="badge badge-xs badge-warning">Most Popular</span>

                                <div className="flex justify-between mt-2">
                                    <h2 className="text-3xl font-bold">Premium</h2>
                                    <span className="text-xl">{details.mem}/month</span>
                                </div>

                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li className="flex items-center">✔ Exclusive access to premium events</li>
                                    <li className="flex items-center">✔ Special training sessions / masterclasses</li>
                                    <li className="flex items-center">✔ Batch processing capabilities</li>
                                    <li className="flex items-center">✔ Early access to workshops</li>
                                    <li className="flex items-center">✔ Premium profile badge</li>
                                </ul>

                                <div className="mt-6">
                                    <Link to={`/dashboard/payment`} className="btn btn-block">Get Premium Access</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleClub;
