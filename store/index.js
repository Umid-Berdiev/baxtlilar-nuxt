// import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
// import { auth } from "./modules/auth.module";
// import questionnaireModule from "./modules/questionnaire.module";
// import userModule from "./modules/user.module";

export const state = () => ({
  user: null,
  guest: null,
  isLoading: false,
  regions: [],
  languages: [],
  religions: [],
  countries: [],
  selectedCountry: null,
  districts: [],
  currencies: [],
  additionalQuestions: [],
  genders: [],
  forumList: [],
  aboutList: [],
  mainFilterResult: [],
  mainFilterDefaultForm: {},
  favourites: [],
  userImages: [],
  currentUser: {},
  activeFilterSection: false,
  news: [],
  newsDetail: {},
  faq: [],
  supportCategoryChavos: [],
  footerList: [],
  footerListOne: {},
  tariffList: [],
  isTermsReading: false,
});

export const getters = {
  getRegions: (state) => state.regions,
  getReligions: (state) => state.religions,
  getCountries: (state) => state.countries,
  getSelectedCountry: (state) => state.selectedCountry,
  getMainFilterResult: (state) => state.mainFilterResult,
  getMainFilterDefaultForm: (state) => state.mainFilterDefaultForm,
  getFavourites: (state) => state.favourites,
  getUserImages: (state) => state.userImages,
  isLoading: (state) => state.isLoading,
  getCurrentUser: (state) => state.currentUser,
  getNews: (state) => state.news,
  getNewsDetail: (state) => state.newsDetail,
  getFaq: (state) => state.faq,
  getSupportCategoryWithChavos: (state) => state.supportCategoryChavos,
  getFooterList: (state) => state.footerList,
  getFooterListOne: (state) => state.footerListOne,
  getTariffList: (state) => state.tariffList,
  getGuest: (state) => state.guest,
};

export { mutations, actions };
