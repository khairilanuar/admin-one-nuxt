<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right>
        <div class="buttons is-right">
          <b-button
            tag="nuxt-link"
            :to="localePath('/admin/applications/create')"
            type="is-primary"
            size=""
          >
            <b-icon icon="plus" custom-size="default" />
            <span>Add Application</span>
          </b-button>
          <!--
          <b-button
            :disabled="!checkedRows.length"
            type="is-danger"
            size=""
            @click="bulkDeleteUsers"
          >
            <b-icon icon="delete-alert" custom-size="default" />
            <span>Delete</span>
          </b-button>
          -->
        </div>
      </template>
    </title-bar>
    <section class="section is-main-section">
      <notification v-if="false" class="is-success">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Tightly wrapped</b> &mdash; table header becomes card header
        </div>
      </notification>

      <card-component class="has-table has-mobile-sort-spaced">
        <async-table
          ref="applicationTable"
          :checkable="true"
          :checked-rows="checkedRows"
          data-url="/api/application"
          @check="check"
        >
          <template v-slot:table="props">
            <!--
            <b-table-column label="ID" field="id" sortable>
              {{ props.row.id }}
            </b-table-column>
            -->
            <b-table-column label="Status" field="status" sortable>
              {{ props.row.status }}
            </b-table-column>
            <b-table-column label="Zone" field="aid_zone" sortable>
              {{ props.row.aid_zone }}
            </b-table-column>
            <b-table-column label="Name" field="name" sortable>
              <nuxt-link
                :to="
                  localePath({
                    name: 'admin-applications-uuid',
                    params: { uuid: props.row.uuid },
                  })
                "
                >{{ props.row.name }}</nuxt-link
              >
            </b-table-column>
            <b-table-column label="Id. No" field="identification_no" sortable>
              {{ props.row.identification_no }}
            </b-table-column>
            <b-table-column label="Email" field="email" sortable>
              {{ props.row.email }}
            </b-table-column>
            <b-table-column label="Handphone" field="handphone">
              {{ props.row.handphone }}
            </b-table-column>
            <b-table-column label="City" field="city">
              {{ props.row.city }}
            </b-table-column>
            <b-table-column label="Aid Type" field="aid_type_id" sortable>
              {{ props.row.aid_type }}
            </b-table-column>
            <!--
            <b-table-column
              label="Confirmed"
              field="confirmed"
              sortable
              centered
            >
              <b-icon v-if="props.row.confirmed" icon="shield-check" />
              <b-icon v-else icon="shield-outline" class="" />
            </b-table-column>
            -->
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
                  :to="
                    localePath({
                      name: 'admin-applications-uuid',
                      params: { uuid: props.row.uuid },
                    })
                  "
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                <!--
                <nuxt-link
                  :to="{
                    name: 'access-applications-uuid',
                    params: { uuid: props.row.uuid },
                  }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                -->
                <b-button
                  :disabled="
                    props.row.is_core ||
                    !$store.getters['auth/hasPermission']('delete-user')
                  "
                  size="is-small"
                  type="is-danger"
                  @click.prevent="deleteApplication(props.row)"
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
import AsyncTable from '~/components/AsyncTable'
import CardComponent from '~/components/CardComponent'
import TitleBar from '~/layouts/partials/TitleBar'
import HeroBar from '~/layouts/partials/HeroBar'

export default {
  name: 'Applications',
  meta: {
    // permission: 'read-application',
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    HeroBar,
    TitleBar,
    CardComponent,
    AsyncTable,
    Notification,
  },
  data: () => {
    return {
      showForm: false,
      formDefault: {},
      form: {},
      checkedRows: [],
    }
  },
  computed: {
    titleStack() {
      return ['Application']
    },
  },
  mounted() {},
  methods: {
    showAdd() {
      this.$router.redirect('/admin/application/create')
    },
    resetForm() {
      this.form = this.$lodash.clone(this.formDefault)
    },
    deleteApplication(user) {
      this.$buefy.dialog.confirm({
        title: 'Deleting application',
        message: `Are you sure you want to delete application <b>${user.name}</b> ?<br/>This action cannot be undone.`,
        confirmText: 'Delete User',
        type: 'is-danger',
        hasIcon: true,
        focusOn: 'cancel',
        onConfirm: () => {
          this.$axios
            .delete(`/api/application/${user.id}`)
            .then(({ data }) => {
              if (data.success) {
                this.$buefy.snackbar.open({
                  message: 'User ' + user.name + ' has been deleted.',
                  queue: false,
                })
                this.$refs.applicationTable.loadData()
              } else {
                this.$buefy.snackbar.open({
                  message: data.message,
                  type: 'is-danger',
                  queue: false,
                })
              }
            })
            .catch((error) => {
              this.$buefy.snackbar.open({
                message: error.response.data.message,
                type: 'is-danger',
                queue: false,
              })
            })
        },
      })
    },
    bulkDeleteUsers() {
      // TODO:
      this.$buefy.dialog.alert({
        title: 'TODO:',
        message: 'API for bulk delete',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
      })
    },
    check(checkedList, row) {
      this.checkedRows = checkedList
    },
  },
}
</script>
