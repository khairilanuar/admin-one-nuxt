<template>
  <div>
    <b-table
      :checked-rows.sync="checked"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="true"
      :per-page="perPage"
      :striped="true"
      :narrowed="false"
      :hoverable="true"
      :data="data"
      :total="total"
      style="font-size: 85%;"
      pagination-size="is-small"
      default-sort="id"
      default-sort-direction="desc"
      sort-icon-size="is-small"
      backend-pagination
      backend-sorting
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @sort="goSort"
      @page-change="goPage"
      @check="goCheck"
      @click="goClick"
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
              <b-icon icon="emoticon-sad" size="is-medium" />
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
          Showing {{ from }} to {{ to }} of {{ total }} records.
        </small>
        <small>&nbsp;Go to page:&nbsp;</small>
        <b-select v-model="page" size="is-small" @change.native="goPage(page)">
          <option v-for="(pg, idx) in pages" :key="idx" :value="pg">
            {{ pg }}
          </option>
        </b-select>
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
      default: null,
    },
    search: {
      type: String,
      default: null,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    checkedRows: {
      type: Array,
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      data: [],
      checked: this.checkedRows,
      isLoading: false,
      paginated: false,
      page: this.currentPage,
      pages: 0,
      pageLength: this.perPage,
      lastPage: null,
      sortBy: 'id',
      sortDir: 'desc',
      from: 0,
      to: 0,
      total: 0,
    }
  },
  computed: {},
  watch: {
    search(newSearch, oldSearch) {
      this.debouncedLoadData()
    },
  },
  mounted() {
    if (this.dataUrl) {
      this.loadData()
    }

    this.page = this.currentPage

    this.debouncedLoadData = this.$lodash.debounce(this.loadData, 300)
  },
  methods: {
    loadData() {
      this.isLoading = true
      const params = {
        sortBy: this.sortBy,
        sortDir: this.sortDir,
        page: this.page,
        perPage: this.pageLength,
        search: this.search ? this.search : null,
      }
      this.$axios
        .get(this.dataUrl, { params })
        .then((response) => {
          if (response.data && response.data.success) {
            this.data = response.data.payload.data
            if (response.data.payload.meta) {
              // using presenter
              this.total = response.data.payload.meta.pagination.total
              this.lastPage = Math.ceil(this.total / this.perPage)
              this.pageLength = response.data.payload.meta.pagination.per_page
              this.page = response.data.payload.meta.pagination.current_page
              this.from = this.page * this.pageLength - (this.pageLength - 1)
              this.to =
                this.page * this.pageLength -
                this.pageLength +
                response.data.payload.meta.pagination.count
              this.pages = Array.from(
                { length: this.lastPage },
                (v, k) => k + 1
              )
            } else {
              // no presenter
              this.from = response.data.payload.from
              this.to = response.data.payload.to
              this.total = response.data.payload.total
              this.lastPage = response.data.payload.last_page
              this.pageLength = response.data.payload.per_page
              this.page = response.data.payload.current_page
              this.pages = Array.from(
                { length: response.data.payload.last_page },
                (v, k) => k + 1
              )
            }
          }

          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${error.message}`,
            type: 'is-danger',
          })
        })
    },
    goPage(page) {
      this.page = page
      this.loadData()
      this.$emit('page-change', page)
    },
    goSort(field, order) {
      this.sortBy = field
      this.sortDir = order
      this.loadData()
      this.$emit('sort', field, order)
    },
    goCheck(checkedList, row) {
      this.$emit('check', checkedList, row)
    },
    goClick(row) {
      // eslint-disable-next-line no-console
      console.log(row)
      this.$emit('click', row)
    },
  },
}
</script>
