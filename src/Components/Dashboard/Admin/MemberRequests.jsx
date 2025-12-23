import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading';

const MemberRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth()
    const {
        data: requests = [],
        isLoading,
    } = useQuery({
        queryKey: ['Member Requests', user?.email],
        enabled: !!user?.email,   
        queryFn: async () => {
            const result = await axiosSecure.get('/allMemberRequest');
            return result.data;
        },
    });



    if (isLoading) return <Loading></Loading>
    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Email
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req._id}>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            {req.email}
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <button className='btn btn-xs bg-orange-500 text-white'>
                                                Approve
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberRequests;