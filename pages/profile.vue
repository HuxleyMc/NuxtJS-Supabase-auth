<template>
  <div>
    <p class="text-center">
      UserID: {{ user.id }}
    </p>
  </div>
</template>

<script>
export default {
  middleware: ['pageGuard'],
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
