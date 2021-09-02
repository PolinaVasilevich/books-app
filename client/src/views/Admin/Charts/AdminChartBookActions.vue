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
      <div style="width: 50vw" v-if="dataAllTime">
        <vue3-chart-js
          :id="chart.id"
          :type="chart.type"
          :data="chart.data"
          :options="chart.data.options"
          ref="chartRef"
        ></vue3-chart-js>
      </div>
      {{ dataAllTime }}
    </template>
  </admin-chart-wrapper>
</template>

<script>
import { onMounted, ref } from "vue";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import ChartJsPluginDataLabels from "chartjs-plugin-datalabels";
Vue3ChartJs.registerGlobalPlugins([ChartJsPluginDataLabels]);
import API from "@/utils/api";
import AdminChartWrapper from "@/components/AdminChartWrapper.vue";
import adminChartMixin from "@/mixins/adminChartMixin";

export default {
  name: "admin-chart",
  mixins: [adminChartMixin],
  components: {
    AdminChartWrapper,
  },

  data() {
    return {
      title: "Top 5 books reserved books for all time",
    };
  },

  setup() {
    let dataAllTime = ref({});

    const chart = {
      id: `chart-bar`,
      type: "bar",
      data: {
        labels: dataAllTime.value.titles,
        datasets: [
          {
            label: "Dataset 1",
            data: dataAllTime.value.data1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            stack: "Stack 0",
          },
          {
            label: "Dataset 2",
            data: dataAllTime.value.data2,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            stack: "Stack 0",
          },
          {
            label: "Dataset 3",
            data: dataAllTime.value.data3,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            stack: "Stack 1",
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
          plugins: {
            // title: {
            //   display: true,
            //   text: props.title,
            //   color: "#333",
            //   font: {
            //     size: 36,
            //     family: "Cormorant Garamond",
            //     weight: "normal",
            //   },
            // },

            legend: {
              display: false,
            },
          },
        },
      },
    };

    const getData = async () => {
      try {
        const data = await API.get(
          "books/statistics-reserved-books-current-year"
        );
        dataAllTime.value = data.data;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getData();
    });

    return {
      chart,
      dataAllTime,
    };
  },
};
</script>
