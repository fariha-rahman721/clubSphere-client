import { FaUserAlt, FaDollarSign, FaUsersCog } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { MdEventAvailable } from 'react-icons/md'

const AdminStatistics = () => {
    return (
        <div className='mt-12'>
            {/* Small statistic cards */}
            <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

                {/* Total Revenue */}
                <div className='relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className='absolute -mt-4 ml-4 grid h-16 w-16 place-items-center rounded-xl bg-linear-to-tr from-orange-600 to-orange-400 text-white shadow-lg shadow-orange-500/40'>
                        <FaDollarSign className='h-6 w-6' />
                    </div>
                    <div className='p-4 text-right'>
                        <p className='text-sm text-gray-600'>Total Revenue</p>
                        <h4 className='text-2xl font-semibold text-gray-900'>$0</h4>
                    </div>
                </div>

                {/* Total Clubs */}
                <div className='relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className='absolute -mt-4 ml-4 grid h-16 w-16 place-items-center rounded-xl bg-linear-to-tr from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/40'>
                        <BsFillHouseDoorFill className='h-6 w-6' />
                    </div>
                    <div className='p-4 text-right'>
                        <p className='text-sm text-gray-600'>Total Clubs</p>
                        <h4 className='text-2xl font-semibold text-gray-900'>0</h4>
                    </div>
                </div>

                {/* Total Events */}
                <div className='relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className='absolute -mt-4 ml-4 grid h-16 w-16 place-items-center rounded-xl bg-linear-to-tr from-pink-600 to-pink-400 text-white shadow-lg shadow-pink-500/40'>
                        <MdEventAvailable className='h-6 w-6' />
                    </div>
                    <div className='p-4 text-right'>
                        <p className='text-sm text-gray-600'>Total Events</p>
                        <h4 className='text-2xl font-semibold text-gray-900'>0</h4>
                    </div>
                </div>

                {/* Total Users */}
                <div className='relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md'>
                    <div className='absolute -mt-4 ml-4 grid h-16 w-16 place-items-center rounded-xl bg-linear-to-tr from-green-600 to-green-400 text-white shadow-lg shadow-green-500/40'>
                        <FaUserAlt className='h-6 w-6' />
                    </div>
                    <div className='p-4 text-right'>
                        <p className='text-sm text-gray-600'>Total Users</p>
                        <h4 className='text-2xl font-semibold text-gray-900'>0</h4>
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>

                {/* Chart Placeholder */}
                <div className='relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md xl:col-span-2 p-6'>
                    <h3 className='mb-2 text-lg font-semibold text-gray-800'>
                        Platform Overview
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Statistics chart will appear here
                    </p>
                </div>

                {/* Admin Activity / Calendar */}
                <div className='relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md p-6'>
                    <h3 className='mb-2 text-lg font-semibold text-gray-800'>
                        Admin Activity
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Recent actions & system updates
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminStatistics
