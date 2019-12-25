<template>
  <div>
    <title-bar :title-stack="titleStack">
      <template #left> </template>
      <template #right>
        <div class="buttons is-right">
          <b-button
            tag="nuxt-link"
            to="/setting/units/create"
            type="is-primary"
            size=""
          >
            <b-icon icon="plus" custom-size="default" />
            <span>Add Unit</span>
          </b-button>
          <b-button
            :disabled="!checkedRows.length"
            type="is-danger"
            size=""
            @click="bulkDeleteUnits"
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
          ref="unitTable"
          :checkable="true"
          :checked-rows="checkedRows"
          data-url="/unit"
          @check="check"
        >
          <template v-slot:table="props">
            <b-table-column label="Name" field="name" sortable>
              {{ props.row.name }}
              <b-tooltip label="core">
                <b-icon
                  v-if="props.row.is_core"
                  icon="shield-lock-outline"
                  size="is-small"
                  type="is-danger"
                />
              </b-tooltip>
            </b-table-column>
            <b-table-column label="Code" field="code" sortable>
              {{ props.row.code }}
            </b-table-column>
            <b-table-column label="Description" field="description" sortable>
              {{ props.row.description }}
            </b-table-column>
            <b-table-column label="Enabled" field="Enabled" sortable centered>
              <b-icon v-if="props.row.enable" icon="shield-check" />
              <b-icon v-else icon="shield-outline" class="" />
            </b-table-column>
            <b-table-column label="Created" field="created_at" sortable>
              <small
                :title="props.row.created_at"
                class="has-text-grey is-abbr-like"
                >{{ props.row.created_at }}</small
              >
            </b-table-column>
            <b-table-column
              label="Actions"
              custom-key="actions"
              class="is-actions-cell"
              centered
            >
              <div class="buttons is-right">
                <nuxt-link
                  :to="{
                    name: 'setting-units-unit-edit',
                    params: { unit: props.row.uuid }
                  }"
                  class="button is-small is-primary"
                  title="Edit"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                <b-button
                  :disabled="
                    props.row.is_core ||
                      !$store.getters['auth/hasPermission']('delete-role')
                  "
                  size="is-small"
                  type="is-danger"
                  title="Delete"
                  @click.prevent="deleteUnit(props.row)"
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
  name: 'Units',
  meta: {
    permission: 'read-role'
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
      return ['Setting', 'Units']
    }
  },
  mounted() {},
  methods: {
    showAdd() {
      this.$router.redirect('/setting/units/create')
    },
    resetForm() {
      this.form = this.$lodash.clone(this.formDefault)
    },
    deleteUnit(unit) {
      this.$buefy.dialog.confirm({
        title: 'Deleting unit',
        message: `Are you sure you want to delete unit <b>${unit.name}</b> ?<br/>This action cannot be undone.`,
        confirmText: 'Delete Unit',
        type: 'is-danger',
        hasIcon: true,
        focusOn: 'cancel',
        onConfirm: () => {
          this.$axios
            .delete(`/unit/${unit.uuid}`)
            .then(({ data }) => {
              if (data.success) {
                this.$buefy.snackbar.open({
                  message: 'Unit ' + unit.name + ' has been deleted.',
                  queue: false
                })
                this.$refs.unitTable.loadData()
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
      // latest swal has some issue
      /*
      this.$swal({
        title: 'Confirmation',
        text: 'Are you sure to delete role: ' + role.name,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {

        }
      })
      */
    },
    bulkDeleteUnits() {
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
