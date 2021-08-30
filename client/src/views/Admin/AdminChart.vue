<template>
  <chart
    v-if="topBooks"
    type="bar"
    title="Top 10 books"
    :labels="topBooks?.titles"
    :data="topBooks?.data"
  />
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

  setup() {
    const topBooks = ref(null);
    const getTopBooks = async () => {
      try {
        const data = await API.get("books/topbooks");
        topBooks.value = data.data;
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(getTopBooks);

    return { topBooks, getTopBooks };
  },
};
</script>
