import { createStore } from 'vuex';

// Regarding store "left overs" please refer to README.md
export default createStore({
  state: {
    selectedCard: null,
  },
  getters: {
  },
  mutations: {
    updateSelectedCard(state, selectedCard) {
      state.selectedCard = selectedCard;
    },
  },
  actions: {
  },
  modules: {
  },
});
