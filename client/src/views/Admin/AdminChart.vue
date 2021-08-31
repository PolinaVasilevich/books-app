<template>
  <div
    style="
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    "
  >
    <h2 style="text-align: center">{{ title }}</h2>
    <div>
      <div>
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
      </div>

      <chart
        v-if="topBooks && selectedItem === 'all'"
        type="bar"
        :topData="topBooks"
      />
      <chart
        v-if="topBooks && selectedItem === 'month'"
        type="bar"
        :topData="topBooksCurrentMonth"
      />
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";
import API from "@/utils/api";
import { ref, onMounted } from "vue";

export default {
  name: "admin-chart",
  components: {
    Chart,
  },

  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],

      currentMonth: "",
      selectedItem: "all",
      title: "Top 5 books of all time",
    };
  },

  setup() {
    const topBooks = ref(null);
    const topBooksCurrentMonth = ref(null);

    const getTopBooks = async () => {
      try {
        const data = await API.get("books/topbooks");
        topBooks.value = data.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getTopBooksCurrentMonth = async () => {
      try {
        const data = await API.get("books/topbookscurrentmonth");
        topBooksCurrentMonth.value = data.data;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getTopBooks();
      getTopBooksCurrentMonth();
    });

    return {
      topBooks,
      topBooksCurrentMonth,
      getTopBooks,
      getTopBooksCurrentMonth,
    };
  },

  created() {
    this.currentMonth = this.months[+new Date().getMonth()];
  },
};
</script>
