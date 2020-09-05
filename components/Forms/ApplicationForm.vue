<template>
  <div>
    <notification v-if="false" class="is-info">
      <div>
        <span><b>Demo only.</b> No data will be saved/updated</span>
      </div>
    </notification>
    <card-component class="tile is-child">
      <div class="columns is-centered" style="margin: 20px 0">
        <div class="column is-11">
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
                  horizontal
                >
                  <template slot="label">
                    {{ $t('application.name') }}
                    <b-tooltip
                      type="is-danger"
                      :label="$t('common.required')"
                      class="has-text-danger"
                    >
                      *
                    </b-tooltip>
                  </template>
                  <b-input v-model="data.name" placeholder="" />
                </b-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('application.identification_no')"
                rules="required"
                slim
              >
                <b-field
                  :message="errors.length ? errors[0] : ''"
                  :type="errors.length ? 'is-danger' : ''"
                  horizontal
                >
                  <template slot="label">
                    {{ $t('application.identification_no') }}
                    <b-tooltip
                      type="is-danger"
                      :label="$t('common.required')"
                      class="has-text-danger"
                    >
                      *
                    </b-tooltip>
                  </template>
                  <b-input
                    v-model="data.identification_no"
                    placeholder="123456-78-0123"
                    maxlength="30"
                  />
                </b-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('application.aid_type')"
                rules="required"
                slim
              >
                <b-field
                  :message="errors.length ? errors[0] : ''"
                  :type="errors.length ? 'is-danger' : ''"
                  horizontal
                >
                  <template slot="label">
                    {{ $t('application.aid_type') }}
                    <b-tooltip
                      type="is-danger"
                      :label="$t('common.required')"
                      class="has-text-danger"
                    >
                      *
                    </b-tooltip>
                  </template>
                  <b-select
                    v-model="data.aid_type_id"
                    :placeholder="$t('application.aid_type_placeholder')"
                  >
                    <option
                      v-for="option in $store.getters['references/get'](
                        'aid_types'
                      )"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.name }}
                    </option>
                  </b-select>
                </b-field>
              </ValidationProvider>

              <b-field :label="$t('application.dependents')" horizontal>
                <b-input
                  v-model="data.dependents"
                  type="number"
                  step="1"
                  min="0"
                />
              </b-field>

              <b-field :label="$t('application.others')" horizontal>
                <b-checkbox
                  v-model="data.is_oku"
                  true-value="1"
                  false-value="0"
                >
                  {{ $t('application.is_oku') }}
                </b-checkbox>
                <b-checkbox
                  v-model="data.is_unhealthy"
                  true-value="1"
                  false-value="0"
                >
                  {{ $t('application.is_unhealthy') }}
                </b-checkbox>
              </b-field>

              <b-field :label="$t('application.aid_zone')" horizontal>
                <b-select v-model="data.aid_zone_id">
                  <option
                    v-for="option in $store.getters['references/get'](
                      'aid_zones'
                    )"
                    :key="option.id"
                    :value="option.id"
                  >
                    {{ option.name }}
                  </option>
                </b-select>
              </b-field>

              <hr />
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('application.address.line1')"
                rules="required"
                slim
              >
                <b-field
                  :message="errors.length ? errors[0] : ''"
                  :type="errors.length ? 'is-danger' : ''"
                  horizontal
                >
                  <template slot="label">
                    {{ $t('application.address.line1') }}
                    <b-tooltip
                      type="is-danger"
                      :label="$t('common.required')"
                      class="has-text-danger"
                    >
                      *
                    </b-tooltip>
                  </template>
                  <b-input v-model="data.address.line1" maxlength="128" />
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('application.address.line2')"
                rules="required"
                slim
              >
                <b-field
                  :message="errors.length ? errors[0] : ''"
                  :type="errors.length ? 'is-danger' : ''"
                  horizontal
                >
                  <template slot="label">
                    {{ $t('application.address.line2') }}
                    <b-tooltip
                      type="is-danger"
                      :label="$t('common.required')"
                      class="has-text-danger"
                    >
                      *
                    </b-tooltip>
                  </template>
                  <b-input v-model="data.address.line2" maxlength="128" />
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('application.address.city')"
                rules="required"
                slim
              >
                <b-field
                  :message="errors.length ? errors[0] : ''"
                  :type="errors.length ? 'is-danger' : ''"
                  horizontal
                >
                  <template slot="label">
                    {{ $t('application.address.city') }}
                    <b-tooltip
                      type="is-danger"
                      :label="$t('common.required')"
                      class="has-text-danger"
                    >
                      *
                    </b-tooltip>
                  </template>
                  <b-autocomplete
                    v-model="data.address.city"
                    :data="cityData"
                    field="name"
                    :loading="isFetching"
                    @typing="getCityData"
                    @select="(option) => (selectedCity = option)"
                  >
                    <template slot-scope="props">
                      {{ props.option.name }}, {{ props.option.state }}
                      <!-- div class="media">
                        <div class="media-left">
                          <img
                            width="32"
                            :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`"
                          />
                        </div>
                        <div class="media-content">
                          {{ props.option.title }}
                          <br />
                          <small>
                            Released at {{ props.option.release_date }}, rated
                            <b>{{ props.option.vote_average }}</b>
                          </small>
                        </div>
                      </div -->
                    </template>
                  </b-autocomplete>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('application.address.postcode')"
                rules="required"
                slim
              >
                <b-field
                  :message="errors.length ? errors[0] : ''"
                  :type="errors.length ? 'is-danger' : ''"
                  horizontal
                >
                  <template slot="label">
                    {{ $t('application.address.postcode') }}
                    <b-tooltip
                      type="is-danger"
                      :label="$t('common.required')"
                      class="has-text-danger"
                    >
                      *
                    </b-tooltip>
                  </template>
                  <b-input v-model="data.address.postcode" maxlength="5" />
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                :name="$t('application.address.state')"
                rules="required"
                slim
              >
                <b-field
                  :message="errors.length ? errors[0] : ''"
                  :type="errors.length ? 'is-danger' : ''"
                  horizontal
                >
                  <template slot="label">
                    {{ $t('application.address.state') }}
                    <b-tooltip
                      type="is-danger"
                      :label="$t('common.required')"
                      class="has-text-danger"
                    >
                      *
                    </b-tooltip>
                  </template>
                  <b-select v-model="data.address.state_id">
                    <option
                      v-for="option in $store.getters['references/get'](
                        'states'
                      )"
                      :key="option.id"
                      :value="option.id"
                    >
                      {{ option.name }}
                    </option>
                  </b-select>
                </b-field>
              </ValidationProvider>
              <b-field :label="$t('application.contact.handphone')" horizontal>
                <b-input v-model="data.contact.handphone" maxlength="15" />
              </b-field>
              <b-field :label="$t('application.email')" horizontal>
                <b-input
                  v-model="data.email"
                  type="email"
                  placeholder="email@saya.com"
                  maxlength="32"
                >
                </b-input>
              </b-field>

              <hr />
              <b-field :label="$t('application.occupation')" horizontal>
                <b-input v-model="data.occupation" maxlength="64" />
              </b-field>
              <b-field :label="$t('application.employment_type')" horizontal>
                <b-select v-model="data.employment_type">
                  <option
                    v-for="option in employmentTypes"
                    :key="option"
                    :value="option"
                  >
                    {{ $t(`application.employmentTypes.${option}`) }}
                  </option>
                </b-select>
              </b-field>
              <b-field :label="$t('application.employer_name')" horizontal>
                <b-input v-model="data.employer_name" maxlength="64" />
              </b-field>
              <b-field :label="$t('application.income')" horizontal>
                <b-input v-model="data.income" type="number" min="0" />
              </b-field>
              <b-field :label="$t('application.income_type')" horizontal>
                <b-select v-model="data.income_type">
                  <option
                    v-for="option in incomeTypes"
                    :key="option"
                    :value="option"
                  >
                    {{ $t(`application.incomeTypes.${option}`) }}
                  </option>
                </b-select>
              </b-field>
              <hr />
              <b-field label="Nota tambahan" horizontal>
                <b-input v-model="data.note" maxlength="1024" type="textarea" />
              </b-field>
              <hr />
              <b-field horizontal>
                <div class="buttons">
                  <b-button
                    :loading="isLoading"
                    :disabled-off="invalid"
                    type="is-primary"
                    native-type="submit"
                  >
                    {{ $t('common.submit') }}
                  </b-button>
                  <b-button :to="cancelUrl" tag="nuxt-link" type="is-text">
                    {{ $t('common.cancel') }}
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
        </div>
      </div>
    </card-component>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import debounce from 'lodash/debounce'
import CardComponent from '~/components/CardComponent'
import Notification from '~/layouts/partials/Notification'

export default {
  name: 'ApplicationForm',
  components: {
    CardComponent,
    Notification,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    redirectUrl: { type: String, default: '/success' },
    cancelUrl: { type: String, default: '/' },
    registrationId: { type: String, default: null },
  },
  data() {
    return {
      employmentTypes: ['self-employed', 'employed', 'unemployed'],
      incomeTypes: ['daily', 'weekly', 'monthly'],
      defaultData: {
        employment_type: 'employed',
        dependents: 0,
        address: {},
        contact: {},
      },
      data: { address: {}, contact: {} },
      error: '',
      isLoading: false,
      isLoadingForm: false,

      // city data
      selectedCity: {},
      cityData: [],
      isFetching: false,
    }
  },
  computed: {
    isEdit() {
      return !!this.registrationId
    },
  },
  watch: {
    selectedCity(val) {
      this.data.address.state_id = val ? val.state_id : null
    },
  },
  mounted() {
    this.$store.dispatch('references/refData', { ref: 'aid_types' })
    this.$store.dispatch('references/refData', { ref: 'aid_zones' })
    this.$store.dispatch('references/refData', { ref: 'states' })
    this.resetForm()
    /*
    this.$buefy.snackbar.open({
      message: 'Please login',
      queue: false,
    })
    */
    /*
    return import(`vee-validate/dist/locale/ms_MY.json`).then((locale) => {
      localize('ms', locale)
    })
    */
  },
  methods: {
    resetForm() {
      this.data = this.$lodash.cloneDeep(this.defaultData)
    },
    submitForm() {
      const data = {
        name: this.data.name || '',
        email: this.data.email || '',
        identification_no: this.data.identification_no || '',
        aid_type_id: this.data.aid_type_id || '',
        dependents: this.data.dependents || 0,
        is_oku: this.data.is_oku || 0,
        is_unhealthy: this.data.is_unhealthy || 0,
        address: {
          line1: this.data.address.line1 || '',
          line2: this.data.address.line1 || '',
          city: this.data.address.city || '',
          postcode: this.data.address.postcode || '',
          state_id: this.data.address.state_id || '',
        },
        contact: {
          handphone: this.data.contact.handphone || '',
        },
        aid_zone_id: this.data.aid_zone_id || '',
        occupation: this.data.occupation || '',
        employment_type: this.data.employment_type || '',
        employer_name: this.data.employer_name || '',
        income: this.data.income || '',
        income_type: this.data.income_type || '',
        note: this.data.note || '',
      }

      let promise = null

      if (this.isEdit) {
        data._method = 'PUT'
        promise = this.$axios.put(
          '/api/public/application-edit/' + this.registrationId,
          data
        )
      } else {
        promise = this.$axios.post('/api/public/application-post', data)
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
    getCityData: debounce(function (name) {
      if (!name.length) {
        this.cityData = []
        return
      }
      this.isFetching = true
      this.$axios
        // `https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${name}`
        .get('/api/public/city?search=name:' + name)
        .then(({ data }) => {
          this.cityData = []
          data.payload.data.forEach((item) => this.cityData.push(item))
        })
        .catch((error) => {
          this.cityData = []
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 400),
  },
}
</script>
