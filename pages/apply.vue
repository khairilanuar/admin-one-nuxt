<template>
  <section style="margin-top: 20px;">
    <div class="container">
      <application-form />
    </div>
  </section>
</template>

<script>
import ApplicationForm from '~/components/PublicForms/ApplicationForm'

export default {
  layout: 'public',
  name: 'Main',
  components: {
    ApplicationForm,
  },
  data() {
    return {
      data: {},
      email: '',
      password: '',
      error: '',
      isLoading: false,
      isLoadingForm: false,
    }
  },
  computed: {},
  mounted() {
    /*
    this.$buefy.snackbar.open({
      message: 'Please login',
      queue: false,
    })
    */
  },
  methods: {
    submitForm() {
      const data = {
        name: this.data.name || '',
        email: this.data.email || '',
        identification_no: this.data.identification_no || '',
        aid_type_id: 1,
        note: this.data.note || '',
      }

      let promise = null

      if (this.isEdit) {
        data.roles = this.data.roles
        data._method = 'PUT'
        promise = this.$axios.put('/api/application/' + this.userUuid, data)
      } else {
        data.password = this.data.password || ''
        data.password_confirmation = this.data.password_confirmation || ''
        promise = this.$axios.post('/api/application', data)
      }

      promise
        .then((response) => {
          this.$buefy.snackbar.open({
            message: response.data.message,
            queue: false,
          })
          this.$router.push(this.redirectUrl)
        })
        .catch((error) => {
          // window.console.log(error)
          this.$buefy.snackbar.open({
            message: error.response.data.message,
            type: 'is-danger',
            queue: false,
          })
        })
    },
  },
  head() {
    return {
      title: 'Permohonan',
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
