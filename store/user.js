const state = () => ({
  messages: [],
  sentOffers: [],
  receivedOffers: [],
  allOffers: [],
  relatedUsers: [],
  newMessageNotifications: [],
  otherNotifications: [],
  userPhone: null,
})

const getters = {
  getMessages: (state) => state.messages,
  getSentOffers: (state) => state.sentOffers,
  getReceivedOffers: (state) => state.receivedOffers,
  getAllOffers: (state) => state.allOffers,
  getRelatedUsers: (state) => state.relatedUsers,
  newMessageNotifications: (state) => state.newMessageNotifications,
  otherNotifications: (state) => state.otherNotifications,
  getUserPhone: (state) => state.userPhone,
}

const mutations = {
  setMessages(state, payload) {
    state.messages = payload
  },

  setUserSentOffers(state, payload) {
    state.sentOffers = payload
  },

  setUserReceivedOffers(state, payload) {
    state.receivedOffers = payload
  },

  setUserAllOffers(state, payload) {
    state.allOffers = payload
  },

  setRelatedUsers(state, payload) {
    state.relatedUsers = payload
  },

  newMessageNotifications(state, payload) {
    state.newMessageNotifications = payload
  },

  otherNotifications(state, payload) {
    state.otherNotifications = payload
  },

  setUserPhone(state, payload) {
    state.userPhone = payload
  },
}

const actions = {
  async fetchMessages({ commit }) {
    const response = await this.$axios.get('messages', {
      headers: authHeader(),
    })
    commit('setMessages', response.data)
  },

  async fetchAddFavourite({ commit }, payload) {
    const response = await this.$axios.post(
      'add-favourite',
      { user_id: payload },
      { headers: authHeader() }
    )
  },
  async fetchAddBlock({ commit }, payload) {
    const response = await this.$axios.post(
      'add-block',
      { user_id: payload },
      { headers: authHeader() }
    )
  },

  async fetchUserOffers({ commit }) {
    const response = await this.$axios.get('offers')
    commit('setUserSentOffers', response.data.sent_offers)
    commit('setUserReceivedOffers', response.data.received_offers)
    commit('setUserAllOffers', response.data.all_offers)
  },

  async fetchRelatedUsers({ commit }) {
    const response = await this.$axios.get('related-users', {
      headers: authHeader(),
    })
    commit('setRelatedUsers', response.data)
  },

  async fetchUnreadNotifications({ commit }) {
    const res = await this.$axios.get('unread-notifications', {
      headers: authHeader(),
    })

    const newMessageNotifications = []
    const otherNotifications = []

    await res.data.forEach((notification) => {
      if (notification.type == 'App\\Notifications\\MessageCreatedNotification')
        newMessageNotifications.push(notification)
      else otherNotifications.push(notification)
    })

    commit('newMessageNotifications', newMessageNotifications)
    commit('otherNotifications', otherNotifications)
  },

  setAccessToken({ commit }, payload) {
    localStorage.setItem('accessToken', JSON.stringify(payload))
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
