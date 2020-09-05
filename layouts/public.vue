<template>
  <div id="app">
    <section class="hero is-primary is-bold is-small">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <b-navbar type="is-dark" wrapper-class="container">
          <template slot="brand">
            <b-navbar-item tag="router-link" :to="localePath('/')">
              <img src="~assets/logo-only-red.png" alt="logo" />
            </b-navbar-item>
          </template>
          <template slot="start">
            <nuxt-link
              :to="localePath('/')"
              exact-active-class="is-active"
              class="navbar-item"
            >
              <strong>{{ $t('menu.home') }}</strong>
            </nuxt-link>
          </template>
          <template slot="end">
            <b-navbar-item tag="span">
              {{ $t('common.language') }}&nbsp;
              <a :href="switchLocalePath('en')" class="has-text-light"> En </a>
              &nbsp;|&nbsp;
              <a :href="switchLocalePath('ms')" class="has-text-light"> Ms </a>
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
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  created() {},
  head() {
    return this.$nuxtI18nSeo()
  },
}
</script>
