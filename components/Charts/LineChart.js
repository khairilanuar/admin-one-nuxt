import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'line-chart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    extraOptions: Object
  },
  data () {
    return {
      ctx: null
    }
  },
  mounted () {
    this.$watch(
      'chartData',
      (_, oldVal) => {
        if (!oldVal) {
          this.renderChart(this.chartData, this.extraOptions)
        }
      },
      { immediate: true }
    )
  }
}
