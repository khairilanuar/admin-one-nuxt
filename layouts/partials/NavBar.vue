<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a
        class="navbar-item is-hidden-desktop"
        @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" />
      </a>
      <div class="navbar-item">
        <!--
        <div class="control">
          <input class="input" placeholder="Search everywhere..." />
        </div>
        -->
      </div>
    </div>
    <div class="navbar-brand is-right">
      <a
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="menuNavBarToggle"
      >
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
      </a>
    </div>
    <div
      :class="{ 'is-active': isMenuNavBarActive }"
      class="navbar-menu fadeIn animated faster"
    >
      <div class="navbar-end">
        <nav-bar-menu class="has-divider">
          <b-icon icon="menu" custom-size="default" />
          <span> </span>
          <div slot="dropdown" class="navbar-dropdown">
            <nuxt-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>My Profile</span>
            </nuxt-link>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default" />
              <span>Settings</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="email" custom-size="default" />
              <span>Messages</span>
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              <b-icon icon="logout" custom-size="default" />
              <span>Log Out</span>
            </a>
          </div>
        </nav-bar-menu>
        <nav-bar-menu class="has-divider has-user-avatar">
          <user-avatar />
          <div class="is-user-name">
            <span>{{ userName }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <a class="navbar-item">
              <b-icon icon="account" custom-size="default" />
              <span>My Profile</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default" />
              <span>Settings</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="email" custom-size="default" />
              <span>Messages</span>
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item" @click="logout">
              <b-icon icon="logout" custom-size="default" />
              <span>Log Out</span>
            </a>
          </div>
        </nav-bar-menu>
        <!--
        <a
          href="https://justboil.me/bulma-admin-template/one"
          class="navbar-item has-divider is-desktop-icon-only"
          title="Help"
        >
          <b-icon icon="help-circle-outline" custom-size="default" />
          <span>Help</span>
        </a>
        <a
          class="navbar-item is-desktop-icon-only"
          title="Log out"
          @click="logout"
        >
          <b-icon icon="logout" custom-size="default" />
          <span>Log out</span>
        </a>
        -->
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '~/layouts/partials/NavBarMenu'
import UserAvatar from '~/layouts/partials/UserAvatar'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu,
  },
  data() {
    return {
      isMenuNavBarActive: false,
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    ...mapState({
      isNavBarVisible: (state) => state.isNavBarVisible,
      isAsideMobileExpanded: (state) => state.isAsideMobileExpanded,
      userName: (state) => state.auth.user.full_name,
    }),
  },
  methods: {
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => {
          this.$router.push('/?logout')
        })
        .catch(() => {
          // this.error = { message: err.message, error: err.error }
          // this.$buefy.snackbar.open({
          //   message: 'Log out error!',
          //   queue: false
          // })
          this.$store.commit('auth/CLEAR_USER')
          this.$router.push('/?logout')
        })
    },
  },
}
</script>
