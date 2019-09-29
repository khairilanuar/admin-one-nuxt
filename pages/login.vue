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
                <!--<a href="#/" class="button is-small router-link-active">
                  Dashboard
                </a>-->
              </header>
              <div class="card-content">
                <form method="POST" @submit.prevent="login">
                  <div class="field">
                    <label class="label">E-mail Address</label>
                    <div class="control is-clearfix">
                      <input
                        v-model="email"
                        type="email"
                        autocomplete="off"
                        name="email"
                        required="required"
                        autofocus="autofocus"
                        class="input"
                        style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC"); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;'
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control is-clearfix">
                      <input
                        v-model="password"
                        type="password"
                        autocomplete="off"
                        name="password"
                        required="required"
                        class="input"
                        style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC"); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%;'
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="b-checkbox checkbox is-thin"
                      ><input type="checkbox" true-value="true" value="false" />
                      <span class="check is-black"></span>
                      <span class="control-label">
                        Remember me
                      </span></label
                    >
                  </div>
                  <hr />
                  <div class="field is-grouped">
                    <div class="control">
                      <button type="submit" class="button is-black">
                        Login
                      </button>
                    </div>
                    <div class="control">
                      <a
                        href="/password-recovery"
                        class="button is-outlined is-black"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                </form>
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
export default {
  layout: 'empty',
  name: 'Login',
  auth: false,
  data() {
    return {
      email: '',
      password: '',
      error: {}
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
  },
  computed: {},
  mounted() {
    this.$buefy.snackbar.open({
      message: 'Please login',
      queue: false
    })
  },
  methods: {
    login() {
      try {
        const data = { email: this.email, password: this.password }
        this.$store
          .dispatch('auth/login', data)
          .then(() => this.$router.push('/'))
          .catch((err) => {
            this.error = { message: err.message, error: err.error }
          })
        // await this.$auth.loginWith('local', { data })

        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
