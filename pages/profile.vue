<template>
  <div>
    <p class="text-center">
      UserID: {{ user.id }}
    </p>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, redirect }) {
    const data = await $axios.$post('/api/rest/user')
    const { user = null, error = null } = data;
    if (!user || error) {
      if (error) { console.error(error) }
      redirect('/auth')
    }
    return {
      user
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
