<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
import NavBar from '~/layouts/partials/NavBar'
import AsideMenu from '~/layouts/partials/AsideMenu'
import FooterBar from '~/layouts/partials/FooterBar'
import menu from '~/static/menu'

export default {
  name: 'Home',
  middleware: ['authenticated'],
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  data: () => {
    return {
      menu: menu.items
    }
  },
  computed: {},
  created() {
    // this.$store.commit('user', {
    //   name: '',
    //   email: '',
    //   avatar: '/data-sources/avatars/annie-spratt-121576-unsplash.jpg'
    // })
  },
  onIdle() {
    const idleDuration = (process.env.IDLE_TIMEOUT || 20) * 60 * 1000
    const timeDiff =
      Math.round(new Date().getTime()) -
      this.$storage.getLocalStorage('lastActive')

    window.console.log('idle detected')
    window.console.log(idleDuration)
    window.console.log(+new Date())
    window.console.log(this.$storage.getLocalStorage('lastActive'))
    window.console.log(timeDiff)

    if (timeDiff >= idleDuration) {
      // logout this window/tab
      this.$buefy.snackbar.open({
        message: 'Idle session detected, logging out!',
        queue: false
      })
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.$store.commit('auth/CLEAR_USER')
          this.$router.push('/login')
        })
        .catch((err) => {
          this.$store.commit('auth/CLEAR_USER')
          window.console.log(err.response.data)
          this.$router.push('/login')
        })
    } else {
      this.$storage.setLocalStorage('lastActive', +new Date())
      this.$store.commit('idleVue/IDLE_CHANGED', 'false')
    }
  },
  onActive() {
    window.console.log('not idle')
  }
}
</script>
