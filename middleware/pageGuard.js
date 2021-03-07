export default function ({ redirect, store }) {
  if (!store.state.auth.isAuthenticated) { redirect('/auth?type=signIn'); }
}
