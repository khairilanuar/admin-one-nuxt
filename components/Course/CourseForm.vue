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
            <ValidationProvider
              v-slot="{ errors }"
              name="Department"
              rules="required"
              slim
            >
              <b-field
                label="Department"
                :message="errors.length ? errors[0] : ''"
                :type="errors.length ? 'is-danger' : ''"
                horizontal
              >
                <b-select
                  v-model="data.department_id"
                  placeholder="Select a department"
                >
                  <option
                    v-for="(department, idx) in departments"
                    :key="idx"
                    :value="department.id"
                  >
                    {{ department.name }}
                  </option>
                </b-select>
              </b-field>
            </ValidationProvider>
            <b-field label="Total Semesters" horizontal>
              <b-numberinput
                v-model="data.total_semesters"
                min="1"
                max="12"
                controls-position="compact"
              />
            </b-field>
            <b-field label="Industrial Training Semester" horizontal>
              <b-numberinput
                v-model="data.industrial_training_semester"
                min="1"
                :max="data.total_semesters"
                controls-position="compact"
              />
            </b-field>
            <b-field label="Description" horizontal>
              <b-input
                v-model="data.description"
                maxlength="250"
                type="textarea"
                placeholder=""
              />
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
  name: 'CourseForm',
  components: {
    Tiles,
    CardComponent,
    Notification,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    redirectUrl: { type: String, default: '/setting/courses' },
    cancelUrl: { type: String, default: '/setting/courses' },
    courseId: { type: String, default: null }
  },
  data: () => {
    return {
      formTitle: 'Course',
      isLoading: false,
      isLoadingForm: false,

      defaultData: { enable: true },
      data: {}
    }
  },
  computed: {
    isEdit() {
      return !!this.courseId
    },
    departments() {
      return this.$store.getters['references/get']('departments')
    }
  },
  mounted() {
    this.resetForm()
    this.formTitle = this.isEdit ? 'Edit Course' : 'Add Course'

    this.$store.dispatch('references/refData', 'departments')

    if (this.courseId) {
      this.loadCourse(this.courseId)
    }
  },
  methods: {
    resetForm() {
      this.data = this.$lodash.cloneDeep(this.defaultData)
    },
    loadCourse(id) {
      this.isLoadingForm = true
      this.$axios
        .get('/course/' + id)
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
        total_semesters: this.data.total_semesters || '',
        industrial_training_semester:
          this.data.industrial_training_semester || '',
        description: this.data.description || '',
        enable: this.data.enable || '0'
      }

      if (this.isEdit) {
        data._method = 'PUT'
      }

      const endpoint = this.isEdit ? 'course/' + this.data.uuid : 'course'
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
    getFilteredCourses(text) {
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
