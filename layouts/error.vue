<template>
  <section class="section hero is-fullheight is-error-section">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <div class="has-text-centered">
              <div>
                <div class="error-page-icon">
                  <span
                    class="icon"
                  ><i class="mdi mdi-power-plug default" /></span>
                </div>
                <div class="error-page-caption">
                  <h1 v-if="error.statusCode === 404">
                    Page not found
                  </h1>
                  <h1 v-else>
                    An error occurred
                  </h1>
                </div>
                <div class="error-page-action">
                  <div class="buttons is-centered">
                    <button type="button" class="button is-black">
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot has-text-centered">
      <div class="logo" />
    </div>
  </section>
</template>

<script>
export default {
  layout: 'empty',
  name: 'Error',
  props: {
    error: { type: Object, default: null }
  },
  auth: false,
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {},
  head () {
    return {
      title: 'Login',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ],
      htmlAttrs: {
        lang: 'en',
        class: 'has-aside-mobile-transition has-aside-expanded'
      }
    }
  }
}
</script>
