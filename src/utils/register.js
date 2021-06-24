import axios from 'axios'

export const register = async args => {
   try {
      const { data, status } = await axios({
         data: args,
         method: 'POST',
         url: `${window._env_.PLATFORM_URL}/api/dailykit/users`,
      })
      if (status === 200 && data?.success) {
         return data
      }
   } catch (error) {
      console.log(error)
   }
}
