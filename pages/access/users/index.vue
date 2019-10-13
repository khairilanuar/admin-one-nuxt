<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #right>
        <div class="buttons is-right">
          <b-button
            tag="nuxt-link"
            to="/access/users/create"
            type="is-primary"
            size=""
          >
            <b-icon icon="credit-card" custom-size="default"></b-icon>
            <span>Add User</span>
          </b-button>
          <b-button tag="nuxt-link" to="/" type="is-danger" size="">
            <b-icon icon="credit-card" custom-size="default"></b-icon>
            <span>Delete</span>
          </b-button>
        </div>
      </template>
    </title-bar>
    <!--<hero-bar>
      Users
      <nuxt-link slot="right" to="/" class="button">
        Dashboard
      </nuxt-link>
    </hero-bar>-->
    <section class="section is-main-section">
      <notification v-if="false" class="is-success">
        <div>
          <b-icon icon="buffer" custom-size="default"></b-icon>
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced">
        <async-table data-url="/user" :checkable="true">
          <template v-slot:table="props">
            <!--
            <b-table-column label="ID" field="id" sortable>
              {{ props.row.id }}
            </b-table-column>
            -->
            <b-table-column label="First Name" field="first_name" sortable>
              {{ props.row.first_name }}
            </b-table-column>
            <b-table-column label="Last Name" field="last_name" sortable>
              {{ props.row.last_name }}
            </b-table-column>
            <b-table-column label="Email" field="email" sortable>
              {{ props.row.email }}
            </b-table-column>
            <b-table-column label="Roles" field="roles">
              <small>
                <b-tag
                  v-for="(role, id) in props.row.roles"
                  :key="id"
                  type="is-dark"
                >
                  {{ role.name }}
                </b-tag>
              </small>
            </b-table-column>
            <b-table-column
              label="Confirmed"
              field="confirmed"
              sortable
              centered
            >
              <b-icon v-if="props.row.confirmed" icon="check-outline"></b-icon>
              <b-icon v-else icon="shield-outline" class=""></b-icon>
            </b-table-column>
            <b-table-column label="Created" field="created_at" sortable>
              <small
                class="has-text-grey is-abbr-like"
                :title="props.row.created_at"
                >{{ props.row.created_at }}</small
              >
            </b-table-column>
            <b-table-column custom-key="actions" class="is-actions-cell">
              <div class="buttons is-right">
                <nuxt-link
                  :to="{ name: 'index', params: { id: props.row.id } }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small"></b-icon>
                </nuxt-link>
                <b-button
                  size="is-small"
                  type="is-danger"
                  @click.prevent="trashModal(props.row)"
                >
                  <b-icon icon="trash-can" size="is-small"></b-icon>
                </b-button>
              </div>
            </b-table-column>
          </template>
        </async-table>
      </card-component>
    </section>
  </div>
</template>

<script>
import Notification from '~/layouts/partials/Notification'
import AsyncTable from '~/layouts/partials/AsyncTable'
import CardComponent from '~/components/CardComponent'
import TitleBar from '~/layouts/partials/TitleBar'
import HeroBar from '~/layouts/partials/HeroBar'

export default {
  name: 'Users',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    HeroBar,
    TitleBar,
    CardComponent,
    AsyncTable,
    Notification
  },
  data: () => {
    return {
      showForm: false,
      formDefault: {},
      form: {}
    }
  },
  computed: {
    titleStack() {
      return ['Access', 'Users']
    }
  },
  methods: {
    showAdd() {
      this.$router.redirect('/access/users/create')
    },
    resetForm() {
      this.form = this.$lodash.clone(this.formDefault)
    }
  }
}
</script>
