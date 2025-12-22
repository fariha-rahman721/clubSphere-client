import { useQuery } from '@tanstack/react-query'
import Loading from '../../Loading'

import useAxiosSecure from '../../Hooks/UseAxiosSecure'
import toast from 'react-hot-toast'

const ClubRegRequests = () => {
    
    const axiosSecure = useAxiosSecure()

    const {
        data: requests = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['club-manager-requests'],
        queryFn: async () => {
            const result = await axiosSecure('/seller-requests')
            return result.data
        },
    })

    const handleApprove = async (req) => {
        try {
            await axiosSecure.patch(`/user/role/${req.userId}`, {
                role: 'Club Manager',
            })

            await axiosSecure.delete(`/member-requests/${req._id}`)

            toast.success('User promoted to Club Manager')
            refetch()
        } catch (error) {
            toast.error('Failed to approve request',error)
        }
    }

    const handleReject = async (id) => {
        try {
            await axiosSecure.delete(`/member-requests/${id}`)
            toast.success('Request rejected')
            refetch()
        } catch (error) {
            toast.error(error)
        }
    }

    if (isLoading) return <Loading />

    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <h2 className='text-2xl font-bold mb-6'>
                    Club Manager Requests
                </h2>

                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-semibold'>
                                        Email
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-semibold'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req._id}>
                                        <td className='px-5 py-4 border-b bg-white text-sm'>
                                            {req.email}
                                        </td>
                                        <td className='px-5 py-4 border-b bg-white text-sm flex gap-2'>
                                            <button
                                                onClick={() => handleApprove(req)}
                                                className='btn btn-xs btn-success'
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(req._id)}
                                                className='btn btn-xs btn-error'
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {requests.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="2"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No pending requests
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClubRegRequests
