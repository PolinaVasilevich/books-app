<template>
  <div style="height: 600px; width: 600px; margin: 0 auto">
    <vue3-chart-js
      :id="chart.id"
      :type="chart.type"
      :data="chart.data"
      :options="chart.data.options"
    ></vue3-chart-js>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  name: "chart",
  components: {
    Vue3ChartJs,
  },

  props: {
    type: {
      type: String,
    },

    labels: {
      type: Array,
    },

    data: {
      type: Array,
    },

    title: {
      type: String,
    },
  },

  setup(props) {
    const chart = {
      id: `chart-${props.type}`,
      type: props.type,

      data: {
        labels: props.labels,
        datasets: [
          {
            label: "Books",
            data: props.data,
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
          },
        ],

        options: {
          responsive: true,
          scales: {
            y: {
              min: 0,
              max: 10,
            },
          },
          plugins: {
            title: {
              display: true,
              text: props.title,
            },
          },
        },
      },
    };

    const beforeRenderLogic = () => {
      //...
      //if(a === b) {
      //  event.preventDefault()
      //}
    };

    return {
      chart,
      beforeRenderLogic,
    };
  },
};
</script>
