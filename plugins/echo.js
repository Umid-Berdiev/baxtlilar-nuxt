import Vue from "vue";
import Echo from "laravel-echo";

export default function ({ $echo, $axios }) {
  // Echo is available here
  Vue.prototype.$pusher = require("pusher-js");
  $echo = new Echo({
    broadcaster: "pusher",
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    // forceTLS: true,
    encrypted: true,
    key: process.env.MIX_PUSHER_APP_KEY,
    disableStats: false,
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          $axios
            .post(`/api/broadcasting/auth`, {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then((response) => {
              callback(false, response.data);
            })
            .catch((error) => {
              callback(true, error);
            });
        },
      };
    },
  });
}
