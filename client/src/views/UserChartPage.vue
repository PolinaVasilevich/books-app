<template>
  <div
    style="
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <div v-if="topBooks?.data.length">
      <h2 style="text-align: center">{{ title }}</h2>
      <div>
        <!-- <div>
        <Button
          label="All time"
          @click="
            selectedItem = 'all';
            title = `Top 5 books of all time`;
          "
          class="p-button-text"
          style="font-size: 1.3rem"
        />
        <Button
          label="Current month"
          @click="
            selectedItem = 'month';
            title = `Top 5 books of ${currentMonth}`;
          "
          class="p-button-text"
          style="font-size: 1.3rem"
        />
      </div> -->

        <!-- <chart
          v-if="topBooks && selectedItem === 'all'"
          type="bar"
          :topData="topBooks"
        />
        <chart
          v-if="topBooks && selectedItem === 'month'"
          type="bar"
          :topData="topBooksCurrentMonth"
        /> -->

        <chart
          v-if="statisticsUserByMonth"
          type="bar"
          :topData="statisticsUserByMonth"
        />
      </div>
    </div>
    <p v-else style="font-size: 1.2rem">You have not reserved any books yet.</p>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import API from "@/utils/api";

export default {
  components: { Chart },
  data() {
    return {
      topBooks: null,
      statisticsUserByMonth: null,
      selectedItem: "all",
      title: "Statistics",
    };
  },

  methods: {
    async getTopBooks() {
      try {
        const topBooks = await API.get(
          `books/topbooksuser/${this.$route.params.id}`
        );
        this.topBooks = topBooks.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getStatisticsUserByMonth() {
      try {
        const data = await API.get(
          `books/statisticsuserbymonth/${this.$route.params.id}`
        );
        this.statisticsUserByMonth = data.data;

        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getTopBooks();
    this.getStatisticsUserByMonth();
  },
};
</script>
