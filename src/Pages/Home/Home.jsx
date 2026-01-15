import React from 'react';
import { useLoaderData } from 'react-router';
import Hero from '../../Components/Hero';
import Clubs from '../../Components/Clubs/Clubs';
import HowClubSphereWorks from '../HowClubSphereWorks/HowClubSphereWorks';
import Banner from '../../Components/Banner';
import WhyJoinClub from '../WhyJoinClub/WhyJoinClub';
import Testimonial from '../Testimonial/Testimonial';
import Statistics from '../Statistics/Statistics';



const Home = () => {
    const data = useLoaderData();

    return (
        <div className='section'>
            <Hero data={data} />
            <Banner data={data}></Banner>
            <Clubs data={data}></Clubs>
            <WhyJoinClub></WhyJoinClub>
            <HowClubSphereWorks data={data}></HowClubSphereWorks>
            <Statistics></Statistics>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;
