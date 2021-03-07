export const state = () => ({
  user: null,
  isAuthenticated: false
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
    state.isAuthenticated = !!payload;
  }
};
