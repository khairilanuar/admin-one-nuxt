<template>
  <div>
    <notification v-if="false" class="is-info">
      <div>
        <span><b>Demo only.</b> No data will be saved/updated</span>
      </div>
    </notification>
    <tiles>
      <card-component
        :title="$t('application.title')"
        icon="account-edit"
        class="tile is-child"
      >
        <validation-observer v-slot="{ invalid, passes }" slim>
          <form @submit.prevent="passes(submitForm)">
            <ValidationProvider
              v-slot="{ errors }"
              :name="$t('application.name')"
              rules="required"
              slim
            >
              <b-field
                :message="errors.length ? errors[0] : ''"
                :type="errors.length ? 'is-danger' : ''"
                :label="$t('application.name')"
                horizontal
              >
                <b-input v-model="data.first_name" placeholder="" />
              </b-field>
            </ValidationProvider>

            <b-field :label="$t('application.email')" horizontal>
              <b-input type="email" placeholder="email@saya.com" maxlength="30" />
            </b-field>

            <b-field
              :label="$t('application.identification_no')"
              type="is-success"
              message=""
              horizontal
            >
              <b-input placeholder="123456-78-0123" maxlength="30" />
            </b-field>

            <b-field :label="$t('application.aid_type')" horizontal>
              <b-select placeholder="Sila pilih jenis bantuan yang diperlukan">
                <option
                  v-for="option in data"
                  :key="option.id"
                  :value="option.id"
                >
                  {{ option.user.first_name }}
                </option>
              </b-select>
            </b-field>

            <b-field label="Nota tambahan" horizontal>
              <b-input maxlength="512" type="textarea" />
            </b-field>
            <hr>
            <b-field horizontal>
              <div class="buttons">
                <b-button
                  :loading="isLoading"
                  :disabled="invalid"
                  type="is-primary"
                  native-type="submit"
                >
                  Submit
                </b-button>
                <b-button :to="cancelUrl" tag="nuxt-link" type="is-text">
                  Cancel
                </b-button>
              </div>
            </b-field>
            <b-loading
              :is-full-page="false"
              :active.sync="isLoadingForm"
              :can-cancel="false"
            />
          </form>
        </validation-observer>
      </card-component>
    </tiles>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import CardComponent from '~/components/CardComponent'
import Tiles from '~/layouts/partials/Tiles'

export default {
  name: 'AppicationForm',
  components: {
    Tiles,
    CardComponent,
    Notification,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    redirectUrl: { type: String, default: '/application/success' },
    cancelUrl: { type: String, default: '/' },
    registrationId: { type: String, default: null }
  },
  data () {
    return {
      data: {},
      email: '',
      password: '',
      error: '',
      isLoading: false,
      isLoadingForm: false
    }
  },
  computed: {
    isEdit () {
      return !!this.registrationId
    }
  },
  mounted () {
    /*
    this.$buefy.snackbar.open({
      message: 'Please login',
      queue: false,
    })
    */
    return import('vee-validate/dist/locale/ms_MY.json').then((locale) => {
      localize('ms', locale)
    })
  },
  methods: {
    submitForm () {
      const data = {
        name: this.data.name || '',
        email: this.data.email || '',
        identification_no: this.data.identification_no || '',
        aid_type_id: 1,
        note: this.data.note || ''
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
            queue: false
          })
          this.$router.push(this.redirectUrl)
        })
        .catch((error) => {
          // window.console.log(error)
          this.$buefy.snackbar.open({
            message: error.response.data.message,
            type: 'is-danger',
            queue: false
          })
        })
    }
  }
}
</script>
