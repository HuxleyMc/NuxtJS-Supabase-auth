
export default async function ({ $axios, redirect, store }) {
  const data = await $axios.$post('/api/rest/user');
  const { user = null } = data;

  if (!store.state.auth.user !== user) {
    store.commit('auth/setUser', user);
  }
}
