import React from 'react';
import { useLoaderData } from 'react-router';
import Hero from '../../Components/Hero';
import Clubs from '../../Components/Clubs/Clubs';
import HowClubSphereWorks from '../HowClubSphereWorks/HowClubSphereWorks';



const Home = () => {
    const data = useLoaderData();


    return (
        <div>
            <Hero data={data} />
            <Clubs data={data}></Clubs>
            <HowClubSphereWorks data={data}></HowClubSphereWorks>
        </div>
    );
};

export default Home;
