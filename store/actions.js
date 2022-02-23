import userService from "~/plugins/services/user.service";

// const lang = this.$i18n.locale;

const actions = {
  async fetchCountries({ commit }) {
    // commit("setLoadingState", true);
    try {
      const response = await this.$axios.$post("/api/countries", {
        lang: this.$i18n.locale,
      });
      commit("setСountries", response);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // console.error("Error while fetching data: ", message);
      // this.app.$toast.error("Error while fetching data: ", message);
    }
    // commit("setLoadingState", false);
  },
  async fetchRegions({ commit }, payload) {
    const response = await this.$axios.post("/api/regions", {
      country_id: payload,
      lang: this.$i18n.locale,
    });
    commit("setRegions", response.data);
  },
  async fetchReligions({ commit }) {
    const response = await this.$axios.post("/api/religions", {
      lang: this.$i18n.locale,
    });
    commit("setReligions", response.data);
  },
  async fetchLanguages({ commit }) {
    const response = await this.$axios.post("/api/languages");
    commit("setLanguages", response.data);
  },
  async fetchMainFilterResult({ commit }, payload) {
    commit("setMainFilterResult", []);
    const response = await this.$axios.post("/api/main-filter", payload);
    commit("setMainFilterResult", response.data);
  },
  async fetchMainFilterDefaultForm({ commit }) {
    try {
      const response = await this.$axios.$post("/api/main-filter-default-form");
      commit("setMainFilterDefaultForm", response);
      commit("setSelectedCountry", response.country);

      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.error("Error while fetching data: ", message);
      // this.app.$toast.error("Error while fetching data: ", message);
    }
  },
  async fetchFavourites({ commit }) {
    // commit("setFavourites", []);
    const response = await this.$axios.$get("/api/favourites");
    commit("setFavourites", response.data);
  },

  async fetchDeleteImage({ commit }, payload) {
    const response = await this.$axios.post("/api/delete-image", payload);
    // commit("setUserImages", response.data);
    // return response.data;
  },

  async fetchAnswers({ commit }, payload) {
    try {
      const response = await this.$axios.post("/api/user-answers-by-user", {
        user_id: payload,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.app.$toast.error("Error while fetching data: ", message);
    }
  },

  async fetchRelatives({ commit }, payload) {
    try {
      const response = await this.$axios.post("/api/user-relatives-by-user", {
        user_id: payload,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.app.$toast.error("Error while fetching data: ", message);
    }
  },

  async fetchUserById({ commit }, payload) {
    try {
      const response = await this.$axios.get("/api/user-by-id", {
        params: { user_id: payload },
      });
      commit("setCurrentUser", response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.app.$toast.error("Error while fetching data: ", message);
    }
  },

  async fetchChangePassword({ commit }, payload) {
    try {
      const response = await this.$axios.post("/api/change-password", {
        password: payload,
      });
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.app.$toast.error("Error while fetching data: ", message);
    }
  },

  async fetchOffer({ commit }, payload) {
    try {
      const response = await this.$axios.post("/api/offer", payload);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.app.$toast.error("Error while fetching data: ", message);
    }
  },

  async fetchRelativesForSetting({ commit }) {
    try {
      const response = await this.$axios.get("/api/relatives");
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.app.$toast.error("Error while fetching data: ", message);
    }
  },
  async fetchChatId({ commit }, payload) {
    const response = await this.$axios.post("/api/chat-id", payload);
    return response.data;
  },
  async fetchNews({ commit }) {
    const response = await this.$axios.get("/api/news-list");
    commit("setNews", response.data);
  },
  async fetchNewsDetail({ commit }, payload) {
    const response = await this.$axios.get("/api/news-detail/" + payload);
    commit("setNewsDetail", response.data);
  },
  async fetchFaq({ commit }) {
    const response = await this.$axios.get("/api/chavo-list");
    commit("setFaq", response.data);
  },
  async fetchSupportCategoryWithChavos({ commit }) {
    const response = await this.$axios.get("/api/category-support-chavo");
    commit("setSupportCategoryWithChavos", response.data);
  },
  async fetchCheckPhone({ commit }, payload) {
    const response = await this.$axios.post("/api/check-phone", {
      phone: payload,
    });
    return response.data;
  },
  async fetchCheckSmsCode({ commit }, payload) {
    const response = await this.$axios.post("/api/check-sms-code", payload);
    return response.data;
  },
  async fetchFooterList({ commit }, payload) {
    const response = await this.$axios.get("/api/pages/list?lang=" + payload);
    commit("setFooterList", response.data);
  },
  async fetchFooterListOne({ commit }, payload) {
    const response = await this.$axios.get("/api/pages/one", {
      params: payload,
    });
    commit("setFooterListOne", response.data);
  },

  async fetchComplaint({ commit }, payload) {
    const response = await this.$axios.post("/api/complaint", payload);
    return response.data;
  },
  async fetchTariffList({ commit }, payload) {
    const response = await this.$axios.get("/api/tariff/list", {
      params: { lang: payload },
    });
    commit("setTariffList", response.data);
    return response.data;
  },
  async fetchFreeTariff({ commit }, payload) {
    const response = await this.$axios.post("/api/free-tariff", payload);
    return response.data;
  },
  async fetchCreatePayment({ commit }, payload) {
    const response = await this.$axios.post("/api/create-payment", payload);
    return response.data;
  },

  fetchUserInfo({ commit }) {
    return userService.getCurrentUserInfo().then(
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
    try {
      const res = await this.$axios.post("/api/auth/register", {
        ...user,
      });

      if (res.data.message == "Success") {
        return Promise.resolve(res);
      } else {
        // commit("registerFailure");
        return Promise.reject(res.data.errors);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default actions;
