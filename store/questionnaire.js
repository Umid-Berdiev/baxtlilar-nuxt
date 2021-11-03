const state = () => ({ blistQuestions: [], questionnairePercent: 0 })

const getters = {
  getBlistQuestions: (state) => state.blistQuestions,
  getQuestionnairePercent: (state) => state.questionnairePercent,
}

const mutations = {
  setBlistQuestions(state, payload) {
    state.blistQuestions = payload
  },
  setQuestionnairePercent(state, payload) {
    state.questionnairePercent = payload
  },
}

const actions = {
  async saveUserQuestionnaire({ commit, rootState }, payload) {
    const res = await this.$axios.post(
      'questionnaire',
      { ...payload },
      { headers: authHeader() }
    )
    // console.log(res);
    return res.data
  },

  async saveUserEducaton({ commit, rootState }, payload) {
    const res = await this.$axios.post('user-eduacation-data', payload, {
      headers: authHeader(),
    })

    return res.data
  },

  async saveUserFamilyStatus({ commit, rootState }, payload) {
    const res = await this.$axios.post(
      'user-family-status',
      { params: payload },
      { headers: authHeader() }
    )
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data
  },

  async fetchBlistQuestions({ commit, rootState }, payload) {
    const res = await this.$axios.post(
      'questions',
      {},
      { headers: authHeader() }
    )
    commit('setBlistQuestions', res.data)
  },

  async saveUserAnswers({ commit, rootState }, payload) {
    const res = await this.$axios.post(
      'user-answers',
      { params: payload },
      { headers: authHeader() }
    )
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data
  },

  async saveUserFamilyData({ commit, rootState }, payload) {
    const res = await this.$axios.post(
      'user-family-data',
      { params: payload },
      { headers: authHeader() }
    )
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data
  },

  async saveFilterData({ commit, rootState }, payload) {
    const res = await this.$axios.post(
      'user-preference-filter',
      { params: payload },
      { headers: authHeader() }
    )
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data
  },

  async saveFriendsData({ commit, rootState }, payload) {
    const res = await this.$axios.post(
      'user-friends',
      { params: payload },
      { headers: authHeader() }
    )
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data
  },

  async savePassportData({ commit, rootState }, payload) {
    const options = {
      method: 'POST',
      headers: authHeader(),
      data: payload,
      url: 'user-passport-data',
    }

    const res = await this.$axios(options)
    return res.data
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
