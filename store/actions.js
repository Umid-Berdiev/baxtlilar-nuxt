const lang = localStorage.getItem("language");

const actions = {
  async fetchCountries({ commit }) {
    commit("setLoadingState", true);
    const response = await this.$axios.post("countries", { lang });
    commit("setСountries", response.data);
    commit("setLoadingState", false);
  },
  async fetchRegions({ commit }, payload) {
    const response = await this.$axios.post("regions", {
      country_id: payload,
      lang,
    });
    commit("setRegions", response.data);
  },
  async fetchReligions({ commit }) {
    const response = await this.$axios.post("religions", { lang });
    commit("setReligions", response.data);
  },
  async fetchLanguages({ commit }) {
    const response = await this.$axios.post("languages");
    commit("setLanguages", response.data);
  },
  async fetchMainFilterResult({ commit }, payload) {
    commit("setMainFilterResult", []);
    const response = await this.$axios.post("main-filter", payload);
    commit("setMainFilterResult", response.data);
  },
  async fetchMainFilterDefaultForm({ commit }) {
    const response = await this.$axios.post("main-filter-default-form", {});
    commit("setMainFilterDefaultForm", response.data);
    commit("setSelectedCountry", response.data.country);
    return response.data;
  },
  async fetchFavourites({ commit }) {
    commit("setFavourites", []);
    const response = await this.$axios.post("favourites", {});
    commit("setFavourites", response.data);
  },

  async fetchUserImages({ commit }, payload) {
    const response = await this.$axios.post("user-images", payload);
    // commit("setUserImages", response.data);
    return response.data;
  },
  async fetchDeleteImage({ commit }, payload) {
    const response = await this.$axios.post("delete-image", payload);
    // commit("setUserImages", response.data);
    // return response.data;
  },

  async fetchAnswers({ commit }, payload) {
    const response = await this.$axios.post("user-answers-by-user", {
      user_id: payload,
    });
    return response.data;
  },

  async fetchRelatives({ commit }, payload) {
    const response = await this.$axios.post("user-relatives-by-user", {
      user_id: payload,
    });
    return response.data;
  },

  async fetchUserById({ commit }, payload) {
    const response = await this.$axios.post("user-by-id", { user_id: payload });
    commit("setCurrentUser", response.data);
    return response.data;
  },

  async fetchChangePassword({ commit }, payload) {
    const response = await this.$axios.post("change-password", {
      password: payload,
    });
    return response.data;
  },

  async fetchOffer({ commit }, payload) {
    const response = await this.$axios.post("offer", payload);

    try {
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async fetchRelativesForSetting({ commit }) {
    const response = await this.$axios.get("relatives");
    return response.data;
  },
  async fetchChatId({ commit }, payload) {
    const response = await this.$axios.post("chat-id", payload);
    return response.data;
  },
  async fetchNews({ commit }) {
    const response = await this.$axios.get("api/news-list");
    commit("setNews", response.data);
  },
  async fetchNewsDetail({ commit }, payload) {
    const response = await this.$axios.get("news-detail/" + payload);
    commit("setNewsDetail", response.data);
  },
  async fetchFaq({ commit }) {
    const response = await this.$axios.get("api/chavo-list");
    commit("setFaq", response.data);
  },
  async fetchSupportCategoryWithChavos({ commit }) {
    const response = await this.$axios.get("category-support-chavo");
    commit("setSupportCategoryWithChavos", response.data);
  },
  async fetchCheckPhone({ commit }, payload) {
    const response = await this.$axios.post("check-phone", { phone: payload });
    return response.data;
  },
  async fetchCheckSmsCode({ commit }, payload) {
    const response = await this.$axios.post("check-sms-code", payload);
    return response.data;
  },
  async fetchFooterList({ commit }, payload) {
    const response = await this.$axios.get("api/pages/list?lang=" + payload);
    commit("setFooterList", response.data);
  },
  async fetchFooterListOne({ commit }, payload) {
    const response = await this.$axios.get("pages/one", {
      params: payload,
    });
    commit("setFooterListOne", response.data);
  },

  async fetchComplaint({ commit }, payload) {
    const response = await this.$axios.post("complaint", payload);
    return response.data;
  },
  async fetchTariffList({ commit }, payload) {
    const response = await this.$axios.get("tariff/list", {
      params: { lang: payload },
    });
    commit("setTariffList", response.data);
    return response.data;
  },
  async fetchFreeTariff({ commit }, payload) {
    const response = await this.$axios.post("free-tariff", payload);
    return response.data;
  },
  async fetchCreatePayment({ commit }, payload) {
    const response = await this.$axios.post("create-payment", payload);
    return response.data;
  },

  fetchUserInfo({ commit }) {
    return UserService.getCurrentUserInfo().then(
      (data) => {
        commit("setUser", data);
        return Promise.resolve(data);
      },
      (error) => {
        commit("loginFailure");
        return Promise.reject(error);
      }
    );
  },

  async register({ commit }, user) {
    const res = await this.$axios
      .post("auth/register", {
        username: user.username,
        gender: user.gender,
        phone: user.phone,
        password: user.password,
        lang: user.lang,
      })
      .then(
        (response) => {
          if (response.data.message == "Success") {
            return Promise.resolve(response.data);
          } else {
            // commit("registerFailure");
            return Promise.reject(response.data.errors);
          }
        },
        (error) => {
          // commit("registerFailure");
          return Promise.reject(error);
        }
      );
  },
};

export default actions;
