import React from 'react';
import { useLoaderData } from 'react-router';
import Hero from '../../Components/Hero';
import Clubs from '../../Components/Clubs/Clubs';
import HowClubSphereWorks from '../HowClubSphereWorks/HowClubSphereWorks';
import Banner from '../../Components/Banner';



const Home = () => {
    const data = useLoaderData();


    return (
        <div>
            <Hero data={data} />
            <Banner data={data}></Banner>
            <Clubs data={data}></Clubs>
            <HowClubSphereWorks data={data}></HowClubSphereWorks>
        </div>
    );
};

export default Home;
