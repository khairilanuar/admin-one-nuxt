<template>
  <div id="app">
    <section class="hero is-primary is-bold is-small">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <b-navbar type="is-dark" wrapper-class="container" spaced>
          <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <img src="~assets/logo-only-red.png" alt="logo" />
            </b-navbar-item>
          </template>
          <template slot="start">
            <!--
            <b-navbar-item href="#">
              Home
            </b-navbar-item>
            <b-navbar-item href="#">
              Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
              <b-navbar-item href="#">
                About
              </b-navbar-item>
              <b-navbar-item href="#">
                Contact
              </b-navbar-item>
            </b-navbar-dropdown>
            -->
          </template>
          <template slot="end">
            <b-navbar-item tag="div">
              <div class="buttons">
                <nuxt-link to="/apply" class="button is-primary" prefetch>
                  <strong>Mohon Bantuan</strong>
                </nuxt-link>
                <!--<a class="button is-light">
                  Log in
                </a>-->
              </div>
            </b-navbar-item>
          </template>
        </b-navbar>
      </div>

      <!-- Hero content: will be in the middle -->
      <!--
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Title
          </h1>
          <h2 class="subtitle">
            Subtitle
          </h2>
        </div>
      </div>
      -->

      <!-- Hero footer: will stick at the bottom -->
      <!--
      <div class="hero-foot">
        <nav class="tabs">
          <div class="container">
            <ul>
              <li class="is-active"><a>Overview</a></li>
              <li><a>Modifiers</a></li>
              <li><a>Grid</a></li>
              <li><a>Elements</a></li>
              <li><a>Components</a></li>
              <li><a>Layout</a></li>
            </ul>
          </div>
        </nav>
      </div>
      -->
    </section>
    <nuxt />
    <footer class="footer">
      <div class="container-fluid">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <small>&copy; {{ year }} | Infinitum Tech.</small>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <div class="logo">
                <a href="https://infinitum.com.my">
                  <img src="~assets/logo-only-red.png" alt="logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Empty',
  components: {},
  computed: {
    year() {
      return moment().year()
    },
  },
  created() {},
}
</script>
