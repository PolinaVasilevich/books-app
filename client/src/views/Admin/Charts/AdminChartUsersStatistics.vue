<template>
  <admin-chart-wrapper
    :title="title"
    @showAllData="
      selectedItem = 'all';
      title = 'Number of new users for the current year by months';
    "
    @showMonthData="
      selectedItem = 'month';
      title = `Number of new users for ${currentMonth}`;
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
      title: "Number of new users for the current year by months",
    };
  },

  mounted() {
    this.getTopDataAllTime("books/statistics-uses");
    this.getTopDataCurrentMonth("books/statistics-uses-current-month");
  },
};
</script>
