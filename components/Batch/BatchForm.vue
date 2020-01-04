<template>
  <div>
    <notification v-if="false" class="is-info">
      <div>
        <span><b>Demo only.</b> No data will be saved/updated</span>
      </div>
    </notification>
    <tiles>
      <card-component
        :title="formTitle"
        icon="account-edit"
        class="tile is-child"
      >
        <validation-observer v-slot="{ invalid, passes }" slim>
          <form @submit.prevent="passes(submitForm)">
            <ValidationProvider
              v-slot="{ errors }"
              name="Name"
              rules="required"
              slim
            >
              <b-field
                :message="errors.length ? errors[0] : ''"
                :type="errors.length ? 'is-danger' : ''"
                label="Name"
                horizontal
              >
                <b-input v-model="data.name" placeholder="" />
              </b-field>
            </ValidationProvider>
            <b-field label="Code" horizontal>
              <b-input v-model="data.code" placeholder="" />
            </b-field>
            <b-field label="Description" horizontal>
              <b-input
                v-model="data.description"
                maxlength="250"
                type="textarea"
                placeholder=""
              />
            </b-field>
            <b-field label="Batch Start" horizontal>
              <b-datepicker
                v-model="data.start_at"
                :show-week-number="true"
                placeholder="Click to select..."
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <b-field label="Batch End" horizontal>
              <b-datepicker
                v-model="data.end_at"
                :show-week-number="true"
                placeholder="Click to select..."
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <b-field label="Note" horizontal>
              <b-input v-model="data.note" type="textarea" placeholder="" />
            </b-field>
            <b-field label="Enabled" horizontal>
              <b-switch v-model="data.enable">
                {{ data.enable ? 'Yes' : 'No' }}
              </b-switch>
            </b-field>
            <hr />
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Tiles from '~/layouts/partials/Tiles'
import CardComponent from '~/components/CardComponent'
import Notification from '~/layouts/partials/Notification'

export default {
  name: 'BatchForm',
  components: {
    Tiles,
    CardComponent,
    Notification,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    redirectUrl: { type: String, default: '/setting/batches' },
    cancelUrl: { type: String, default: '/setting/batches' },
    batchId: { type: String, default: null }
  },
  data: () => {
    return {
      formTitle: 'Batch',
      isLoading: false,
      isLoadingForm: false,

      defaultData: { enable: true },
      data: {}
    }
  },
  computed: {
    isEdit() {
      return !!this.batchId
    },
    departments() {
      return this.$store.getters['references/get']('departments')
    }
  },
  mounted() {
    this.resetForm()
    this.formTitle = this.isEdit ? 'Edit Batch' : 'Add Batch'

    this.$store.dispatch('references/refData', 'departments')

    if (this.batchId) {
      this.loadBatch(this.batchId)
    }
  },
  methods: {
    resetForm() {
      this.data = this.$lodash.cloneDeep(this.defaultData)
    },
    loadBatch(id) {
      this.isLoadingForm = true
      this.$axios
        .get('/batch/' + id)
        .then((response) => {
          Object.keys(response.data.payload).map((key) => {
            this.data[key] =
              key === 'start_at' || key === 'end_at'
                ? this.$moment(
                    response.data.payload[key],
                    'YYYY-MM-DD'
                  ).toDate()
                : response.data.payload[key]
          })
          this.isLoadingForm = false
        })
        .catch(({ response }) => {
          this.$buefy.snackbar.open({
            message: response.data.message,
            type: 'is-danger',
            queue: false
          })
          this.isLoadingForm = false
        })
    },
    submitForm() {
      const data = {
        name: this.data.name || '',
        code: this.data.code || '',
        description: this.data.description || '',
        note: this.data.note || '',
        start_at: this.data.start_at
          ? this.$moment(this.data.start_at).format('YYYY-MM-DD')
          : null,
        end_at: this.data.end_at
          ? this.$moment(this.data.end_at).format('YYYY-MM-DD')
          : null,
        enable: this.data.enable || '0'
      }

      if (this.isEdit) {
        data._method = 'PUT'
      }

      const endpoint = this.isEdit ? 'batch/' + this.data.uuid : 'batch'
      this.$axios
        .post(endpoint, data)
        .then((response) => {
          this.$buefy.snackbar.open({
            message: response.data.message,
            queue: false
          })
          this.$router.push(this.redirectUrl)
        })
        .catch(({ response }) => {
          this.$buefy.snackbar.open({
            message: response.data.message,
            type: 'is-danger',
            queue: false
          })
        })
    },
    getFilteredBatches(text) {
      this.filteredPermissions = this.permissions.filter((option) => {
        return option.label
          .toString()
          .toLowerCase()
          .includes(text.toLowerCase())
      })
    }
  }
}
</script>
