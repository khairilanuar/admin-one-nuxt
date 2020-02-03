<template>
  <section class="section hero is-fullheight is-error-section">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-7">
            <div class="card has-card-header-background">
              <header class="card-header">
                <p class="card-header-title">
                  <span class="icon"><i class="mdi mdi-lock default"></i></span
                  ><span>Account recovery</span>
                </p>
              </header>
              <div class="card-content">
                <ValidationObserver v-slot="{ invalid, passes }" slim>
                  <form method="POST" @submit.prevent="passes(recoverPassword)">
                    <div class="content">
                      <p>
                        Please enter your registered email to proceed with
                        account recovery.
                      </p>
                      <p>
                        We will send you an email with a link to start recover
                        your account
                      </p>
                      <p>
                        If you forgot your registerd email kindly contact system
                        administrator to recover your account.
                      </p>
                    </div>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required|email"
                      slim
                    >
                      <b-field
                        :message="errors.length ? errors[0] : ''"
                        :type="errors.length ? 'is-danger' : ''"
                        label="E-mail Address"
                      >
                        <b-input
                          v-model="email"
                          autocomplete="off"
                          name="email"
                          autofocus="autofocus"
                        ></b-input>
                      </b-field>
                    </ValidationProvider>
                    <hr />
                    <b-notification
                      v-if="error.length"
                      type="is-danger"
                      has-icon
                      aria-close-label="Close notification"
                      role="alert"
                    >
                      <h3>Unable to login:</h3>
                      <p>
                        {{ error }}
                      </p>
                    </b-notification>
                    <div class="field is-grouped">
                      <div class="control">
                        <b-button
                          :loading="isLoading"
                          :disabled="invalid"
                          tag="input"
                          native-type="submit"
                          type="is-black"
                          value="Recover my password"
                        >
                        </b-button>
                      </div>
                      <div class="control">
                        <b-button tag="nuxt-link" to="/login" type="is-text">
                          Back to login
                        </b-button>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot has-text-centered"><div class="logo"></div></div>
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  layout: 'empty',
  name: 'ForgotPassword',
  components: { ValidationProvider, ValidationObserver },
  middleware: 'anonymous',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      info: {
        hasInfo: false,
        messages: []
      },
      isLoading: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    recoverPassword() {
      try {
        this.isLoading = true
        this.error = ''
        const data = { email: this.email }

        this.$axios
          .post('/api/auth/forgot-password', data)
          .then((response) => {
            this.isLoading = false
            this.$router.push('/')
          })
          .catch((error) => {
            this.error = error.response.data.message
            this.isLoading = false
          })

        this.$router.push('/')
      } catch (e) {}
    }
  },
  head() {
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
