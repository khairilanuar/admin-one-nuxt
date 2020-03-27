<template>
  <section></section>
</template>

<script>
export default {
  layout: 'public',
  name: 'Main',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false,
    }
  },
  computed: {},
  mounted() {
    this.$buefy.snackbar.open({
      message: 'Please login',
      queue: false,
    })
  },
  methods: {
    login() {
      try {
        this.isLoading = true
        this.error = ''
        const data = { email: this.email, password: this.password }
        this.$store
          .dispatch('auth/login', data)
          .then(() => {
            this.isLoading = false
            this.$router.push('/')
          })
          .catch((err) => {
            window.console.log(err.response)
            this.error = err.response.data.message
            this.isLoading = false
          })

        this.$router.push('/')
      } catch (e) {}
    },
  },
  head() {
    return {
      title: 'Home',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
      htmlAttrs: {
        lang: 'en',
        class: 'has-aside-mobile-transition has-aside-expanded',
      },
    }
  },
}
</script>
