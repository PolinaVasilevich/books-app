<template>
  <admin-chart-wrapper
    :title="title"
    @showAllData="
      selectedItem = 'all';
      title = 'Top 5 books reserved books for all time';
    "
    @showMonthData="
      selectedItem = 'month';
      title = `Top 5 books reserved books for ${currentMonth}`;
    "
  >
    <template #title>
      <h2 style="text-align: center">{{ title }}</h2>
    </template>
    <template #chart>
      <div style="width: 50vw; margin-bottom: 100px">
        <vue3-chart-js
          v-if="chart"
          :id="chart.id"
          :type="chart.type"
          :data="chart.data"
          :options="chart.data.options"
        ></vue3-chart-js>
      </div>
    </template>
  </admin-chart-wrapper>
</template>

<script>
import API from "@/utils/api";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import ChartJsPluginDataLabels from "chartjs-plugin-datalabels";
Vue3ChartJs.registerGlobalPlugins([ChartJsPluginDataLabels]);

import AdminChartWrapper from "@/components/AdminChartWrapper.vue";
import adminChartMixin from "@/mixins/adminChartMixin";

export default {
  name: "admin-chart",
  mixins: [adminChartMixin],
  components: {
    AdminChartWrapper,
    Vue3ChartJs,
  },

  data() {
    return {
      title: "Top 5 books reserved books for all time",
      chart: null,
    };
  },

  methods: {
    fillChartObject(data) {
      this.chart = {
        id: `chart-bar`,
        type: "bar",
        data: {
          labels: data?.titles,
          datasets: [
            {
              label: "Reserved",
              data: data?.data1,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,

              datalabels: {
                // align: "top",
                // anchor: "end",
                font: {
                  color: "#333",
                  size: 18,
                  family: "Cormorant Garamond",
                  weight: "bold",
                },
              },
            },
            {
              label: "Returned",
              data: data?.data2,
              borderColor: "rgb(255, 159, 64)",
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderWidth: 1,

              datalabels: {
                // align: "top",
                // anchor: "end",
                font: {
                  color: "#333",
                  size: 18,
                  family: "Cormorant Garamond",
                  weight: "bold",
                },
              },
            },
            {
              label: "Canceled",
              data: data?.data3,
              borderColor: "rgb(54, 162, 235)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderWidth: 1,

              datalabels: {
                // align: "top",
                // anchor: "end",
                font: {
                  color: "#333",
                  size: 18,
                  family: "Cormorant Garamond",
                  weight: "bold",
                },
              },
            },
          ],
          options: {
            responsive: true,
            scales: {
              y: {
                min: 0,
                suggestedMax: 10,
                // max: +props.topData.data[0] + 1,
                ticks: {
                  font: {
                    color: "#333",
                    size: 16,
                    family: "Cormorant Garamond",
                  },
                },
              },

              x: {
                ticks: {
                  font: {
                    color: "#333",
                    size: 16,
                    family: "Cormorant Garamond",
                  },
                },
              },
            },
          },
        },
      };
    },

    async getTopDataAllTime() {
      try {
        const data = await API.get(
          "books/statistics-reserved-books-current-year"
        );
        this.fillChartObject(data.data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getTopDataAllTime();
  },
};
</script>
