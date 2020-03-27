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
            <b-field label="Description" horizontal>
              <b-input v-model="data.description" placeholder="" />
            </b-field>
            <b-field label="Permissions" horizontal>
              <div class="field-body">
                <div class="field">
                  <tiles :max-per-row="1">
                    <div
                      v-for="(permission, idx) in permissions"
                      :key="idx"
                      class="box"
                      style="width: 100%; padding: 10px;"
                    >
                      <b-checkbox
                        v-model="data.permissions"
                        :native-value="permission.id"
                        size=""
                      >
                        <strong>{{ permission.label }}</strong>
                      </b-checkbox>
                      <tiles :max-per-row="3">
                        <div
                          v-for="(subPermission, idx2) in permission.children"
                          :key="idx2"
                          style="margin-left: 20px;"
                        >
                          <b-checkbox
                            v-model="data.permissions"
                            :native-value="subPermission.id"
                            size="is-small"
                          >
                            <strong style="font-size: 115%;">{{
                              subPermission.label
                            }}</strong>
                          </b-checkbox>
                          <div
                            v-for="(subPermission2,
                            idx3) in subPermission.children"
                            :key="idx3"
                            style="margin-left: 20px;"
                          >
                            <b-checkbox
                              v-model="data.permissions"
                              :native-value="subPermission2.id"
                              size="is-small"
                            >
                              {{ subPermission2.label }}
                            </b-checkbox>
                          </div>
                        </div>
                      </tiles>
                      <span style="clear: both;" />
                    </div>
                  </tiles>
                </div>
              </div>
            </b-field>
            <b-field label="Role enabled" horizontal>
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
  name: 'RoleForm',
  components: {
    Tiles,
    CardComponent,
    Notification,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    redirectUrl: { type: String, default: '/access/roles' },
    cancelUrl: { type: String, default: '/access/roles' },
    roleId: { type: String, default: null },
  },
  data: () => {
    return {
      formTitle: 'Role',
      isLoading: false,
      isLoadingForm: false,

      permissions: [],
      filteredPermissions: [],

      defaultData: { confirmed: true, permissions: [] },
      data: {},
    }
  },
  computed: {
    isEdit() {
      return !!this.roleId
    },
  },
  mounted() {
    this.resetForm()
    this.formTitle = this.isEdit ? 'Edit Role' : 'Add Role'

    this.loadPermissions()

    if (this.roleId) {
      this.loadRole(this.roleId)
    }
  },
  methods: {
    resetForm() {
      this.data = this.$lodash.cloneDeep(this.defaultData)
    },
    loadPermissions() {
      this.$axios
        .get('/api/permission', { params: { getRef: 1 } })
        .then((response) => {
          this.permissions = response.data.payload
        })
        .catch()
    },
    loadRole(id) {
      this.isLoadingForm = true
      this.$axios
        .get('/api/role/' + id)
        .then((response) => {
          this.data = response.data.payload
          const permissions = []
          response.data.payload.permissions.forEach((v, i) => {
            permissions.push(v.id)
          })
          this.data.permissions = permissions
          this.isLoadingForm = false
        })
        .catch(({ response }) => {
          this.$buefy.snackbar.open({
            message: response.data.message,
            type: 'is-danger',
            queue: false,
          })
          this.isLoadingForm = false
        })
    },
    submitForm() {
      const data = {
        name: this.data.name || '',
        guard_name: 'web',
        description: this.data.description || '',
        enable: this.data.enable || '0',
        permissions: this.data.permissions,
      }

      if (this.isEdit) {
        data._method = 'PUT'
      }

      const endpoint = this.isEdit ? '/api/role/' + this.data.id : '/api/role'
      this.$axios
        .post(endpoint, data)
        .then((response) => {
          this.$buefy.snackbar.open({
            message: response.data.message,
            queue: false,
          })
          this.$router.push(this.redirectUrl)
        })
        .catch(({ response }) => {
          this.$buefy.snackbar.open({
            message: response.data.message,
            type: 'is-danger',
            queue: false,
          })
        })
    },
    getFilteredRoles(text) {
      this.filteredPermissions = this.permissions.filter((option) => {
        return option.label
          .toString()
          .toLowerCase()
          .includes(text.toLowerCase())
      })
    },
  },
}
</script>
