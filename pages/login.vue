<template>
  <section class="section hero is-fullheight is-error-section">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <div class="card has-card-header-background">
              <header class="card-header">
                <p class="card-header-title">
                  <span class="icon"><i class="mdi mdi-lock default"></i></span
                  ><span>Login</span>
                </p>
              </header>
              <div class="card-content">
                <ValidationObserver v-slot="{ invalid, passes }" slim>
                  <form @submit.prevent="passes(login)" method="POST">
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
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="Password"
                      rules="required"
                      slim
                    >
                      <b-field
                        :message="errors.length ? errors[0] : ''"
                        :type="errors.length ? 'is-danger' : ''"
                        label="Password"
                      >
                        <b-input
                          v-model="password"
                          type="password"
                          autocomplete="off"
                          name="password"
                        ></b-input>
                      </b-field>
                    </ValidationProvider>
                    <div class="field">
                      <label class="b-checkbox checkbox is-thin"
                        ><input
                          type="checkbox"
                          true-value="true"
                          value="false"
                        />
                        <span class="check is-black"></span>
                        <span class="control-label">
                          Remember me
                        </span></label
                      >
                    </div>
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
                          type="is-primary"
                          value="Login"
                        >
                        </b-button>
                      </div>
                      <div class="control">
                        <b-button
                          tag="nuxt-link"
                          to="/forgot-password"
                          type="is-text"
                        >
                          Forgot Password?
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
  name: 'Login',
  components: { ValidationProvider, ValidationObserver },
  middleware: 'anonymous',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
  },
  computed: {},
  mounted() {
    /*
    this.$buefy.snackbar.open({
      message: 'Please login',
      queue: false
    })
    */
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
            // eslint-disable-next-line no-console
            console.log(err.response.data)
            this.error = err.response.data.message
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
