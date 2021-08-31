<template>
  <div style="width: 70vw">
    <vue3-chart-js
      :id="chart.id"
      :type="chart.type"
      :data="chart.data"
      :options="chart.data.options"
      ref="chartRef"
    ></vue3-chart-js>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import ChartJsPluginDataLabels from "chartjs-plugin-datalabels";
Vue3ChartJs.registerGlobalPlugins([ChartJsPluginDataLabels]);

export default {
  name: "chart",
  components: {
    Vue3ChartJs,
  },

  props: {
    type: {
      type: String,
    },

    title: {
      type: String,
    },
    currentMonth: {
      type: String,
    },

    topData: {
      type: Object,
    },
  },

  setup(props) {
    const chart = {
      id: `chart-${props.type}`,
      type: props.type,
      data: {
        labels: props.topData.titles,
        datasets: [
          {
            label: "Books",
            data: props.topData.data,

            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,

            datalabels: {
              align: "top",
              anchor: "end",
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

    return {
      chart,
    };
  },
};
</script>
