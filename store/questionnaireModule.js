const state = () => ({ blistQuestions: [], questionnairePercent: 0 });

const getters = {
  getBlistQuestions: (state) => state.blistQuestions,
  getQuestionnairePercent: (state) => state.questionnairePercent,
};

const mutations = {
  setBlistQuestions(state, payload) {
    state.blistQuestions = payload;
  },
  setQuestionnairePercent(state, payload) {
    state.questionnairePercent = payload;
  },
};

const actions = {
  async saveUserQuestionnaire({ commit, rootState }, payload) {
    const res = await this.$axios.post("api/questionnaire", { ...payload });
    // console.log(res);
    return res.data;
  },

  async saveUserEducaton({ commit, rootState }, payload) {
    const res = await this.$axios.post("api/user-eduacation-data", payload);

    return res.data;
  },

  async saveUserFamilyStatus({ commit, rootState }, payload) {
    const res = await this.$axios.post("api/user-family-status", {
      params: payload,
    });
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  },

  async fetchBlistQuestions({ commit, rootState }, payload) {
    const res = await this.$axios.get("api/questions");
    commit("setBlistQuestions", res.data);
  },

  async saveUserAnswers({ commit, rootState }, payload) {
    const res = await this.$axios.post("api/user-answers", { params: payload });
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  },

  async saveUserFamilyData({ commit, rootState }, payload) {
    const res = await this.$axios.post("api/user-family-data", {
      params: payload,
    });
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  },

  async saveFilterData({ commit, rootState }, payload) {
    const res = await this.$axios.post("api/user-preference-filter", {
      ...payload,
    });
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  },

  async saveFriendsData({ commit, rootState }, payload) {
    const res = await this.$axios.post("api/user-friends", { params: payload });
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  },

  async savePassportData({ commit, rootState }, payload) {
    const options = {
      method: "POST",
      data: payload,
      url: "api/user-passport-data",
    };

    const res = await this.$axios(options);
    return res.data;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
