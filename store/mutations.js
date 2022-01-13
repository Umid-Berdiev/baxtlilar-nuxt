const mutations = {
  setRegions(state, payload) {
    state.regions = payload;
  },
  setReligions(state, payload) {
    state.religions = payload;
  },
  setСountries(state, payload) {
    state.countries = payload;
  },
  setSelectedCountry(state, payload) {
    state.selectedCountry = payload;
  },
  setLanguages(state, payload) {
    state.languages = payload;
  },
  setLoadingState(state, payload) {
    state.isLoading = payload;
  },
  setMainFilterResult(state, payload) {
    state.mainFilterResult = payload;
  },
  setMainFilterDefaultForm(state, payload) {
    state.mainFilterDefaultForm = payload;
  },
  setFavourites(state, payload) {
    state.favourites = payload;
  },
  setUserImages(state, payload) {
    state.userImages = payload;
  },
  setCurrentUser(state, payload) {
    state.currentUser = payload;
  },
  setNews(state, payload) {
    state.news = payload;
  },
  setNewsDetail(state, payload) {
    state.newsDetail = payload;
  },
  setFaq(state, payload) {
    state.faq = payload;
  },
  setSupportCategoryWithChavos(state, payload) {
    state.supportCategoryChavos = payload;
  },
  setFooterList(state, payload) {
    state.footerList = payload;
  },
  setFooterListOne(state, payload) {
    state.footerListOne = payload;
  },
  setTariffList(state, payload) {
    state.tariffList = payload;
  },
  setGuest(state, payload) {
    state.guest = payload;
  },
  setActiveFilterSection(state, payload) {
    state.activeFilterSection = payload;
  },
  isTermsReading(state, payload) {
    state.isTermsReading = payload;
  },
};

export default mutations;
