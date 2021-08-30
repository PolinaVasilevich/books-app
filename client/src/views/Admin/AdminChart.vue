<template>
  <chart
    type="doughnut"
    title="Top 10 books"
    :labels="['first', 'second', 3, 4]"
    :data="[20, 30, 1, 32]"
  />
</template>

<script>
import Chart from "@/components/Chart.vue";

export default {
  name: "admin-chart",
  components: {
    Chart,
  },
};
</script>
