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
            <b-field label="Profile Image" horizontal>
              <file-picker />
            </b-field>
            <hr />
            <ValidationProvider
              v-slot="{ errors }"
              name="First Name"
              rules="required"
              slim
            >
              <b-field
                :message="errors.length ? errors[0] : ''"
                :type="errors.length ? 'is-danger' : ''"
                label="First Name"
                horizontal
              >
                <b-input v-model="data.first_name" placeholder=""></b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Last Name"
              rules="required"
              slim
            >
              <b-field
                :message="errors.length ? errors[0] : ''"
                :type="errors.length ? 'is-danger' : ''"
                label="Last Name"
                horizontal
              >
                <b-input v-model="data.last_name" placeholder=""></b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
              slim
            >
              <b-field
                :message="errors.length ? errors[0] : ''"
                :type="errors.length ? 'is-danger' : ''"
                label="Email"
                horizontal
              >
                <b-input v-model="data.email" placeholder=""></b-input>
              </b-field>
            </ValidationProvider>
            <b-field label="Role(s)" horizontal>
              <b-taginput
                v-model="data.roles"
                :data="filteredRoles"
                :allow-new="false"
                :open-on-focus="true"
                autocomplete
                field="name"
                icon="label"
                placeholder="Select role"
                @typing="getFilteredRoles"
              >
              </b-taginput>
            </b-field>
            <ValidationProvider
              v-if="!isEdit"
              v-slot="{ errors }"
              name="Password"
              rules="required|verify_password"
              vid="password"
              slim
            >
              <b-field
                :message="errors.length ? errors[0] : ''"
                :type="errors.length ? 'is-danger' : ''"
                label="Password"
                horizontal
              >
                <b-input
                  v-model="data.password"
                  type="password"
                  placeholder=""
                ></b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              v-if="!isEdit"
              v-slot="{ errors }"
              name="Password Confirmation"
              rules="required|confirmed:password"
              slim
            >
              <b-field
                :message="errors.length ? errors[0] : ''"
                :type="errors.length ? 'is-danger' : ''"
                label="Password Confirmation"
                horizontal
              >
                <b-input
                  v-model="data.password_confirmation"
                  type="password"
                  placeholder=""
                ></b-input>
              </b-field>
            </ValidationProvider>
            <b-field label="User confirmed" horizontal>
              <b-switch v-model="data.confirmed">
                {{ data.confirmed ? 'Yes' : 'No' }}
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
            ></b-loading>
          </form>
        </validation-observer>
      </card-component>
      <card-component
        v-if="isProfileExists"
        title="Client Profile"
        icon="account"
        class="tile is-child"
      >
        <user-avatar
          :avatar="data.file"
          class="image has-max-width is-aligned-center"
        />
        <hr />
        <b-field label="Name">
          <b-input
            :value="data.name"
            custom-class="is-static"
            readonly
          ></b-input>
        </b-field>
        <b-field label="Company">
          <b-input
            :value="data.company"
            custom-class="is-static"
            readonly
          ></b-input>
        </b-field>
        <b-field label="City">
          <b-input
            :value="data.city"
            custom-class="is-static"
            readonly
          ></b-input>
        </b-field>
        <b-field label="Created">
          <b-input value="" custom-class="is-static" readonly></b-input>
        </b-field>
        <hr />
        <b-field label="Progress">
          <progress
            :value="data.progress"
            class="progress is-small is-primary"
            max="100"
          >
            {{ data.progress }}
          </progress>
        </b-field>
      </card-component>
    </tiles>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Tiles from '~/layouts/partials/Tiles'
import CardComponent from '~/components/CardComponent'
import FilePicker from '~/components/FilePicker'
import UserAvatar from '~/layouts/partials/UserAvatar'
import Notification from '~/layouts/partials/Notification'

export default {
  name: 'UserForm',
  components: {
    Tiles,
    CardComponent,
    UserAvatar,
    Notification,
    FilePicker,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    redirectUrl: { type: String, default: '/access/users' },
    cancelUrl: { type: String, default: '/access/users' },
    userUuid: { type: String, default: null }
  },
  data: () => {
    return {
      formTitle: 'User',
      isLoading: false,
      isLoadingForm: false,
      isProfileExists: false,

      roles: [],
      filteredRoles: [],

      defaultData: { confirmed: true },
      data: {}
    }
  },
  computed: {
    isEdit() {
      return !!this.userUuid
    }
  },
  mounted() {
    this.resetForm()
    this.formTitle = 'Add User'

    this.loadRoles()

    if (this.userUuid) {
      this.loadUser(this.userUuid)
    }
  },
  methods: {
    resetForm() {
      this.data = this.$lodash.cloneDeep(this.defaultData)
    },
    loadRoles() {
      this.$axios
        .get('role', { params: { per_page: 100 } })
        .then((response) => {
          this.roles = response.data.payload.data
        })
        .catch()
    },
    loadUser(uuid) {
      this.isLoadingForm = true
      this.$axios
        .get('/user/' + uuid)
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
        email: this.data.email || '',
        first_name: this.data.first_name || '',
        last_name: this.data.last_name || ''
      }

      let promise = null

      if (this.isEdit) {
        data.roles = this.data.roles
        data._method = 'PUT'
        promise = this.$axios.put('user/' + this.userUuid, data)
      } else {
        data.password = this.data.password || ''
        data.password_confirmation = this.data.password_confirmation || ''
        promise = this.$axios.post('user/register', data)
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
    },
    getFilteredRoles(text) {
      this.filteredRoles = this.roles.filter((option) => {
        return option.name
          .toString()
          .toLowerCase()
          .includes(text.toLowerCase())
      })
    }
  }
}
</script>
