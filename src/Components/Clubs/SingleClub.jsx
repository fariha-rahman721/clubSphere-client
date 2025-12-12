import { Calendar, Clock, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import Wings from './Wings';




const SingleClub = ({ details }) => {
    const [wingsData, setWingsData] = useState([]);

    const imgSrc = details.bannerImage;
    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
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
                    <span>Created: {formatDate(details.createdAt)}</span>
                </div>

                {/* Updated Date */}
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Updated: {formatDate(details.updatedAt)}</span>
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
                    <div className="flex items-center text-slate-500 text-sm font-medium">
                        <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                        Located at <span className='text-[#FFAA6E] ml-1'> {details.location}</span>
                    </div>

                    {/* Manager Email */}
                    <div className="flex items-center text-slate-500 text-sm font-medium">
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
                <div className="mb-8 mx-auto w-10/12 md:w-8/12">
                    <div className="card w-full shadow-sm bg-orange-800 text-white">
                        <div className="card-body">

                            <span className="badge badge-xs badge-warning">Most Popular</span>

                            <div className="flex justify-between mt-2">
                                <h2 className="text-3xl font-bold">Premium</h2>
                                <span className="text-xl">$29/month</span>
                            </div>

                            <ul className="mt-6 flex flex-col gap-2 text-xs">
                                <li className="flex items-center">✔ Exclusive access to premium events</li>
                                <li className="flex items-center">✔ Special training sessions / masterclasses</li>
                                <li className="flex items-center">✔ Batch processing capabilities</li>
                                <li className="flex items-center">✔ Early access to workshops</li>
                                <li className="flex items-center">✔ Premium profile badge</li>
                            </ul>

                            <div className="mt-6">
                                <button className="btn btn-block">Choose Plan</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SingleClub;
