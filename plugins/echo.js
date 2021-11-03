import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

import authHeader from './services/auth-header'

window.Echo = new Echo({
  broadcaster: 'pusher',
  cluster: process.env.PUSHER_APP_CLUSTER,
  forceTLS: true,
  key: process.env.PUSHER_APP_KEY,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axios
          .post(
            `${process.env.API_URL}/broadcasting/auth`,
            {
              socket_id: socketId,
              channel_name: channel.name,
            },
            { headers: authHeader() }
          )
          .then((response) => {
            callback(false, response.data)
          })
          .catch((error) => {
            callback(true, error)
          })
      },
    }
  },
})
