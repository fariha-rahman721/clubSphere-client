// Clubs.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

import ClubCard from "./ClubCard";

// Swiper CSS (required)

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Clubs = ({ data = [] }) => {
    if (!data || !data.length) return null;

    return (
        <div className="w-11/12 mx-auto my-16">
            <h1 className="text-3xl font-bold text-[#FFAA6E] mt-8 text-center">
                Featured Clubs
            </h1>
            <p className="text-center mb-8">Join the most active communities in your area.</p>

            <Swiper
                slidesPerView={1}
                centeredSlides={false}
                slidesPerGroupSkip={1}
                grabCursor={true}
                keyboard={{
                    enabled: true,
                }}
                breakpoints={{
                    769: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                }}
                scrollbar={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                className="mySwiper"
            >
                {data.map((club) => (

                    <SwiperSlide key={club._id || club.clubName} >
                        <div className="w-11/12 mx-auto">

                            <ClubCard club={club} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
};

export default Clubs;
