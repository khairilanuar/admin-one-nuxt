<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ heroTitle }}
      <nuxt-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <span><b>Demo only.</b> No data will be saved/updated</span>
        </div>
      </notification>
      <tiles>
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <form @submit.prevent="submit">
            <b-field label="ID" horizontal>
              <b-input
                v-model="form.id"
                custom-class="is-static"
                readonly
              ></b-input>
            </b-field>
            <hr />
            <b-field label="Avatar" horizontal>
              <file-picker />
            </b-field>
            <hr />
            <b-field label="Name" message="Client name" horizontal>
              <b-input
                v-model="form.name"
                placeholder="e.g. John Doe"
                required
              ></b-input>
            </b-field>
            <b-field label="Company" message="Client's company name" horizontal>
              <b-input
                v-model="form.company"
                placeholder="e.g. Berton & Steinway"
                required
              ></b-input>
            </b-field>
            <b-field label="City" message="Client's city" horizontal>
              <b-input
                v-model="form.city"
                placeholder="e.g. Geoffreyton"
                required
              ></b-input>
            </b-field>
            <b-field label="Created" horizontal>
              <b-datepicker
                v-model="form.created_date"
                @input="input"
                placeholder="Click to select..."
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <hr />
            <b-field label="Progress" horizontal>
              <b-slider v-model="form.progress"></b-slider>
            </b-field>
            <hr />
            <b-field horizontal>
              <b-button
                :loading="isLoading"
                type="is-primary"
                native-type="submit"
                >Submit</b-button
              >
            </b-field>
          </form>
        </card-component>
        <card-component
          v-if="isProfileExists"
          title="Client Profile"
          icon="account"
          class="tile is-child"
        >
          <user-avatar
            :avatar="form.file"
            class="image has-max-width is-aligned-center"
          />
          <hr />
          <b-field label="Name">
            <b-input
              :value="form.name"
              custom-class="is-static"
              readonly
            ></b-input>
          </b-field>
          <b-field label="Company">
            <b-input
              :value="form.company"
              custom-class="is-static"
              readonly
            ></b-input>
          </b-field>
          <b-field label="City">
            <b-input
              :value="form.city"
              custom-class="is-static"
              readonly
            ></b-input>
          </b-field>
          <b-field label="Created">
            <b-input
              :value="createdReadable"
              custom-class="is-static"
              readonly
            ></b-input>
          </b-field>
          <hr />
          <b-field label="Progress">
            <progress
              :value="form.progress"
              class="progress is-small is-primary"
              max="100"
              >{{ form.progress }}</progress
            >
          </b-field>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import find from 'lodash/find'
import TitleBar from '~/layouts/partials/TitleBar'
import HeroBar from '~/layouts/partials/HeroBar'
import Tiles from '~/layouts/partials/Tiles'
import CardComponent from '~/components/CardComponent'
import FilePicker from '~/components/FilePicker'
import UserAvatar from '~/layouts/partials/UserAvatar'
import Notification from '~/layouts/partials/Notification'

export default {
  name: 'ClientForm',
  components: {
    UserAvatar,
    FilePicker,
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar,
    Notification
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    id: {
      default: null
    }
  },
  data() {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false
    }
  },
  computed: {
    titleStack() {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'New client'
      }

      return ['Admin', 'Clients', lastCrumb]
    },
    heroTitle() {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Create Client'
      }
    },
    heroRouterLinkTo() {
      if (this.isProfileExists) {
        return { name: 'client.new' }
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel() {
      if (this.isProfileExists) {
        return 'New client'
      } else {
        return 'Dashboard'
      }
    },
    formCardTitle() {
      if (this.isProfileExists) {
        return 'Edit Client'
      } else {
        return 'New Client'
      }
    }
  },
  watch: {
    id(newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
      } else {
        this.getData()
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getClearFormObject() {
      return {
        id: null,
        name: null,
        company: null,
        city: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null,
        progress: 0
      }
    },
    getData() {
      if (this.id) {
        axios
          .get('/data-sources/data.json')
          .then((r) => {
            const item = find(
              r.data.data,
              (item) => item.id === parseInt(this.id)
            )

            if (item) {
              this.isProfileExists = true
              this.form = item
              this.form.created_date = new Date(item.created_mm_dd_yyyy)
              this.createdReadable = moment(new Date(item.created_mm_dd_yyyy))
                .format('MMM D, Y')
                .toString()
            } else {
              this.$router.push({ name: 'client.new' })
            }
          })
          .catch((e) => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    input(v) {
      this.createdReadable = moment(v)
        .format('MMM D, Y')
        .toString()
    },
    submit() {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Demo only',
          queue: false
        })
      }, 500)
    }
  }
}
</script>
