<template>
  <div>
    <!--
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    -->
    <section class="section is-main-section">
      <tiles>
        <card-widget
          :number="512"
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          label="Clients"
        />
        <card-widget
          :number="7770"
          class="tile is-child"
          type="is-info"
          icon="cart-outline"
          prefix="$"
          label="Sales"
        />
        <card-widget
          :number="256"
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          suffix="%"
          label="Performance"
        />
      </tiles>

      <card-component
        title="Performance"
        icon="finance"
        header-icon="reload"
        @header-icon-click="fillChartData"
      >
        <div v-if="defaultChart.chartData" class="chart-area">
          <!--<zingchart :data="chartData" />-->
          <line-chart
            ref="bigChart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
            style="height: 100%"
            chart-id="big-line-chart"
          >
          </line-chart>
        </div>
      </card-component>

      <card-component title="Clients" class="has-table has-mobile-sort-spaced">
        <clients-table-sample data-url="/data-sources/clients.json" />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import zingchartVue from 'zingchart-vue'
import * as chartConfig from '~/components/Charts/chart.config'
import TitleBar from '~/layouts/partials/TitleBar'
import HeroBar from '~/layouts/partials/HeroBar'
import Tiles from '~/layouts/partials/Tiles'
import CardWidget from '~/components/CardWidget'
import CardComponent from '~/components/CardComponent'
import LineChart from '~/components/Charts/LineChart'
import ClientsTableSample from '~/layouts/partials/ClientsTableSample'

export default {
  name: 'Home',
  components: {
    ClientsTableSample,
    // eslint-disable-next-line vue/no-unused-components
    zingchart: zingchartVue,
    LineChart,
    CardComponent,
    // eslint-disable-next-line vue/no-unused-components
    CardWidget,
    Tiles,
    // eslint-disable-next-line vue/no-unused-components
    HeroBar,
    // eslint-disable-next-line vue/no-unused-components
    TitleBar,
  },
  data() {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain,
      },
      chartData: {
        type: 'bar',
        series: [
          {
            values: [4, 5, 3, 3, 4, 4, 5, 3, 8, 6, 7, 6, 11],
          },
          {
            values: [7, 8, 8, 6, 5, 7, 9, 5, 9, 8, 6, 9, 10],
          },
        ],
      },
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Dashboard']
    },
  },
  mounted() {
    this.fillChartData()

    // this.$buefy.snackbar.open({
    //   message: 'Welcome back',
    //   queue: false
    // })
  },
  methods: {
    randomChartData(n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200))
      }

      return data
    },
    fillChartData() {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9),
          },
        ],
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09'],
      }
    },
  },
}
</script>
