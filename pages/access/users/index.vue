<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right>
        <div class="buttons is-right">
          <b-button
            tag="nuxt-link"
            to="/access/users/create"
            type="is-primary"
            size=""
          >
            <b-icon icon="plus" custom-size="default" />
            <span>Add User</span>
          </b-button>
          <b-button
            :disabled="!checkedRows.length"
            @click="bulkDeleteUsers"
            type="is-danger"
            size=""
          >
            <b-icon icon="delete-alert" custom-size="default" />
            <span>Delete</span>
          </b-button>
        </div>
      </template>
    </title-bar>
    <!--
    <hero-bar>
      Users
      &lt;!&ndash;<nuxt-link slot="right" to="/" class="button">
        Dashboard
      </nuxt-link>&ndash;&gt;
    </hero-bar>
    -->
    <section class="section is-main-section">
      <notification v-if="false" class="is-success">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced">
        <async-table
          ref="userTable"
          :checkable="true"
          :checked-rows="checkedRows"
          @check="check"
          data-url="/user"
        >
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
              <b-tooltip label="core">
                <b-icon
                  v-if="props.row.is_core"
                  icon="shield-lock-outline"
                  size="is-small"
                  type="is-danger"
                />
              </b-tooltip>
            </b-table-column>
            <b-table-column label="Roles" field="roles.name">
              <small>
                <b-tag
                  v-for="(role, id) in props.row.roles"
                  :key="id"
                  type="is-grey"
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
              <b-icon v-if="props.row.confirmed" icon="shield-check" />
              <b-icon v-else icon="shield-outline" class="" />
            </b-table-column>
            <b-table-column label="Created" field="created_at" sortable>
              <small
                :title="props.row.created_at"
                class="has-text-grey is-abbr-like"
                >{{ props.row.created_at }}</small
              >
            </b-table-column>
            <b-table-column custom-key="actions" class="is-actions-cell">
              <div class="buttons is-right">
                <nuxt-link
                  :to="{
                    name: 'access-users-user-edit',
                    params: { user: props.row.uuid }
                  }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                <b-button
                  :disabled="
                    props.row.is_core ||
                      !$store.getters['auth/hasPermission']('delete-user')
                  "
                  @click.prevent="deleteUser(props.row)"
                  size="is-small"
                  type="is-danger"
                >
                  <b-icon icon="delete" size="is-small" />
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
  meta: {
    permission: 'read-user'
  },
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
      form: {},
      checkedRows: []
    }
  },
  computed: {
    titleStack() {
      return ['Access', 'Users']
    }
  },
  mounted() {},
  methods: {
    showAdd() {
      this.$router.redirect('/access/users/create')
    },
    resetForm() {
      this.form = this.$lodash.clone(this.formDefault)
    },
    deleteUser(user) {
      this.$buefy.dialog.confirm({
        title: 'Deleting user',
        message: `Are you sure you want to delete user <b>${user.full_name}</b> ?<br/>This action cannot be undone.`,
        confirmText: 'Delete User',
        type: 'is-danger',
        hasIcon: true,
        focusOn: 'cancel',
        onConfirm: () => {
          this.$axios
            .delete(`/user/${user.uuid}`)
            .then(({ data }) => {
              if (data.success) {
                this.$buefy.snackbar.open({
                  message: 'User ' + user.full_name + ' has been deleted.',
                  queue: false
                })
                this.$refs.userTable.loadData()
              } else {
                this.$buefy.snackbar.open({
                  message: data.message,
                  type: 'is-danger',
                  queue: false
                })
              }
            })
            .catch((error) => {
              this.$buefy.snackbar.open({
                message: error.response.data.message,
                type: 'is-danger',
                queue: false
              })
            })
        }
      })
      // latest swal has some css issue
      /*
      this.$swal({
        title: 'Confirmation',
        text: 'Are you sure to delete user: ' + user.first_name,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {

        }
      })
      */
    },
    bulkDeleteUsers() {
      // TODO:
      this.$buefy.dialog.alert({
        title: 'TODO:',
        message: 'API for bulk delete',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa'
      })
    },
    check(checkedList, row) {
      this.checkedRows = checkedList
    }
  }
}
</script>
