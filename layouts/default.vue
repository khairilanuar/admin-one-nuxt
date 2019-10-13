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
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/data-sources/avatars/annie-spratt-121576-unsplash.jpg'
    })
  }
}
</script>
