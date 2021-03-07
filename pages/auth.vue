<template>
  <b-container>
    <div>
      <b-row align-v="center" class="vh-100">
        <b-col>
          <b-card>
            <div>
              <b-input v-model="email" placeholder="email" type="email" />
              <b-input v-model="password" placeholder="password" type="password" />
              <b-input v-if="type === 'signUp'" v-model="passwordConfirm" type="password" placeholder="passwordConfirm" />
            </div>

            <br>
            <b-row cols="2">
              <b-col v-if="type === 'signUp'">
                <b-button class="fixed-width-button" @click="type='signIn'">
                  signIn
                </b-button>
              </b-col>

              <b-col v-if="type === 'signIn'">
                <b-button class="fixed-width-button" @click="type='signUp'">
                  signUp
                </b-button>
              </b-col>

              <b-col>
                <b-button class="fixed-width-button" @click="handleAuth">
                  Submit
                </b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      type: 'signIn',
      email: null,
      password: null,
      passwordConfirm: null
    }
  },
  created () {
    this.$supabase.auth.onAuthStateChange(async (event, session) => {
      await this.request({ event, session })
    })
  },
  async mounted() {
    const { type = null } = this.$route.query;
    if (type && (type === 'signIn' || type === 'signUp' || type === 'signOut')) {
      this.type = type;
      if (type === 'signOut') {
        await this.signOut()
      }
    }
  },
  methods: {
    async handleAuth() {
      if (this.type === 'signIn') {
        await this.signIn()
      }
      if (this.type === 'signUp') {
        await this.signUp()
      }
    },
    async signIn() {
      const { email, password } = this;
      const { error } = await this.$supabase.auth.signIn({ email, password })
      if (error) {
        // Handle error
        console.error(error)
      }
    },
    async signUp() {
      const { email, password, passwordConfirm } = this;
      if (password !== passwordConfirm) {
        console.error('Passwords dont match')
        return
      }
      const { error } = await this.$supabase.auth.signUp({ email, password })
      if (error) {
        // Handle error
        console.error(error)
      }
    },
    async signOut() {
      const { error } = await this.$supabase.auth.signOut()
      if (error) {
        // Handle error
        console.error(error)
      }
    },
    handleRedirect(event) {
      switch (event) {
        case 'SIGNED_IN':
          this.$router.push('/profile')
          break;
        case 'SIGNED_OUT':
          this.$router.push('/')
          break;

        default:
          console.log({ event })
          break;
      }
    },
    async request({ event, session }) {
      if (!event) { throw new Error('Missing event') }
      await this.$axios.post('/api/rest/auth', { event, session })
        .then(() => {
          this.handleRedirect(event)
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style scoped>
.fixed-width-button {
  width: 100px;
}
</style>
