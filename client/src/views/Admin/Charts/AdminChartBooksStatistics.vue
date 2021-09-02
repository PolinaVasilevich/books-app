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
      <chart
        v-if="topDataAllTime && selectedItem === 'all'"
        type="bar"
        :topData="topDataAllTime"
      />
      <chart
        v-if="topDataCurrentMonth && selectedItem === 'month'"
        type="bar"
        :topData="topDataCurrentMonth"
      />
    </template>
  </admin-chart-wrapper>
</template>

<script>
import AdminChartWrapper from "@/components/AdminChartWrapper.vue";
import Chart from "@/components/Chart.vue";
import adminChartMixin from "@/mixins/adminChartMixin";

export default {
  name: "admin-chart",
  mixins: [adminChartMixin],
  components: {
    Chart,
    AdminChartWrapper,
  },

  data() {
    return {
      title: "Top 5 books reserved books for all time",
    };
  },

  mounted() {
    this.getTopDataAllTime("books/topbooks");
    this.getTopDataCurrentMonth("books/topbookscurrentmonth");
  },
};
</script>
