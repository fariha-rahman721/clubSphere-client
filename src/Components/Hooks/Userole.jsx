
import { useQuery } from '@tanstack/react-query'
import UseAuth from './UseAuth'
import useAxiosSecure from './UseAxiosSecure'

const UseRole = () => {
  const { user, loading } = UseAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/role/${user?.email}`)
      
      return result.data.role
    },
  })

  
  return [role, isRoleLoading]
}

export default UseRole