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
              <b-input v-model="data.description" placeholder="" />
            </b-field>
            <b-field label="Note" horizontal>
              <b-input v-model="data.note" type="textarea" />
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
  name: 'DepartmentForm',
  components: {
    Tiles,
    CardComponent,
    Notification,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    redirectUrl: { type: String, default: '/setting/departments' },
    cancelUrl: { type: String, default: '/setting/departments' },
    departmentId: { type: String, default: null }
  },
  data: () => {
    return {
      formTitle: 'Department',
      isLoading: false,
      isLoadingForm: false,

      defaultData: { confirmed: true, permissions: [] },
      data: {}
    }
  },
  computed: {
    isEdit() {
      return !!this.departmentId
    }
  },
  mounted() {
    this.resetForm()
    this.formTitle = this.isEdit ? 'Edit Department' : 'Add Department'

    if (this.departmentId) {
      this.loadDepartment(this.departmentId)
    }
  },
  methods: {
    resetForm() {
      this.data = this.$lodash.cloneDeep(this.defaultData)
    },
    loadDepartment(id) {
      this.isLoadingForm = true
      this.$axios
        .get('/department/' + id)
        .then((response) => {
          this.data = response.data.payload
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
        enable: this.data.enable || '0'
      }

      if (this.isEdit) {
        data._method = 'PUT'
      }

      const endpoint = this.isEdit
        ? 'department/' + this.data.uuid
        : 'department'
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
    getFilteredDepartments(text) {
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
