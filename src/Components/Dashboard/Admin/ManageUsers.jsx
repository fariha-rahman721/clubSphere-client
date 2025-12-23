import { useQuery } from '@tanstack/react-query'
import UseAuth from '../../Hooks/UseAuth'
import useAxiosSecure from '../../Hooks/UseAxiosSecure'
import Loading from '../../Loading'

const ManageUsers = () => {
  const { loading } = UseAuth()   
  const axiosSecure = useAxiosSecure()

  const {
    data: users = [],
    isLoading,
  } = useQuery({
    enabled: !loading,
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user')
      return res.data
    },
  })

  if (isLoading) return <Loading />

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                    Role
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td className="px-5 py-4 border-b bg-white text-sm">
                      {u.email}
                    </td>

                    <td className="px-5 py-4 flex gap-3 border-b bg-white text-sm capitalize">
                      {u.role || 'member'}
                      <button className="btn btn-xs bg-orange-500 text-white hover:bg-orange-800">
                        Update Role
                      </button>
                    </td>

                    <td className="px-5 py-4 border-b bg-white text-sm space-x-2">
                      <button className="btn btn-xs bg-orange-500 text-white hover:bg-orange-800">
                        Make Manager
                      </button>
                      <button className="btn btn-xs btn-outline">
                        Remove Role
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
  )
}

export default ManageUsers
