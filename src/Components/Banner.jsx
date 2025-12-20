import React from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const CategorySwiper = ({ data }) => {

    // Collect categories from data (unique)
    const allCategories = [...new Set(data.map(item => item.category))];

    return (
        <div className="my-8 w-11/12 mx-auto ">
            <h2 className="text-3xl font-bold mb-6 text-center mt-10 ">Explore by <span className='text-[#FFAA6E]'>Categories</span></h2>

            <Swiper
                
                modules={[Autoplay]}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                spaceBetween={12}
                slidesPerView={3}
                breakpoints={{
                    640: { slidesPerView: 4 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 7 }
                }}
            >
                {allCategories.map((cat, index) => (
                    <SwiperSlide key={index}>
                        <div className="px-4 m-10 py-2 p-6 btn btn-dash btn-warning rounded-xl text-center font-medium shadow-sm">
                            {cat}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategorySwiper;
