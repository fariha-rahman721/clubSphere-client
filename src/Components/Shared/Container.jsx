import React from 'react';

const Container = ({children}) => {
    return (
        <div className='w-11/12 mx-auto md:w-11/12 lg:w-11/12'>
            {children}
        </div>
    );
};

export default Container;