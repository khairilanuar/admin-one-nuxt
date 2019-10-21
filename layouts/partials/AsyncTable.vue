<template>
  <div>
    <b-table
      :checked-rows.sync="checked"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="true"
      pagination-size="is-small"
      :per-page="perPage"
      :striped="true"
      :narrowed="false"
      :hoverable="true"
      default-sort="id"
      default-sort-direction="desc"
      sort-icon-size="is-small"
      :data="data"
      :total="total"
      backend-pagination
      backend-sorting
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @sort="goSort"
      @page-change="goPage"
      @check="goCheck"
    >
      <template #default="props">
        <slot :row="props.row" name="table" />
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <!--
            <p>
              <b-icon icon="dots-horizontal" size="is-large"></b-icon>
            </p>
            -->
            <p>Fetching data...</p>
          </template>
          <template v-if="!isLoading">
            <p>
              <b-icon icon="emoticon-sad" size="is-medium"></b-icon>
            </p>
            <p><small>No data&hellip;</small></p>
          </template>
        </div>
      </section>
      <template #bottom-left>
        <small v-if="checked.length > 0">
          <b>Total checked</b>: {{ checked.length }}
        </small>
        <small v-else>
          Showing records {{ from }} of {{ to }} of {{ total }} records
        </small>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'AsyncTable',
  components: {},
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    },
    checkedRows: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: [],
      checked: this.checkedRows,
      isLoading: false,
      paginated: false,
      perPage: 10,
      page: 1,
      lastPage: null,
      sortBy: 'id',
      sortDir: 'desc',
      from: 0,
      to: 0,
      total: 0
    }
  },
  computed: {},
  mounted() {
    if (this.dataUrl) {
      this.loadData()
    }
  },
  methods: {
    loadData() {
      this.isLoading = true
      const params = {
        sortBy: this.sortBy,
        sortDir: this.sortDir,
        page: this.page
      }
      this.$axios
        .get(this.dataUrl, { params })
        .then((r) => {
          if (r.data && r.data.success) {
            this.from = r.data.payload.from
            this.to = r.data.payload.to
            this.total = r.data.payload.total
            this.data = r.data.payload.data
            this.lastPage = r.data.payload.last_page
            this.perPage = r.data.payload.per_page
            this.page = r.data.payload.current_page
          }

          this.isLoading = false
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    },
    goPage(page) {
      this.page = page
      this.loadData()
    },
    goSort(field, order) {
      this.sortBy = field
      this.sortDir = order
      this.loadData()
    },
    goCheck(checkedList, row) {
      this.$emit('check', checkedList, row)
    }
  }
}
</script>
