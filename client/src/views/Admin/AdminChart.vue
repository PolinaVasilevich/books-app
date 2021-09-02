<template>
  <div>
    <div>
      <Button
        label="Top 5 reserved books"
        class="p-button-text"
        icon="pi pi-book"
        @click="selectedChart = 'book'"
        :class="{ 'active-button': selectedChart === 'book' }"
      />
      <Button
        label="New users"
        class="p-button-text"
        icon="pi pi-user"
        isLoading="true"
        @click="selectedChart = 'user'"
        :class="{ 'active-button': selectedChart === 'user' }"
      />

      <Button
        label="Book actions"
        class="p-button-text"
        icon="pi pi-star-o"
        isLoading="true"
        @click="selectedChart = 'action'"
        :class="{ 'active-button': selectedChart === 'action' }"
      />
    </div>

    <div style="position: relative; width: 100%; margin-bottom: 50px">
      <transition name="fade">
        <admin-chart-books-statistics
          v-if="selectedChart === 'book'"
          style="position: absolute; top: 0; left: 0"
        />
      </transition>

      <transition name="fade">
        <admin-chart-users-statistics
          v-if="selectedChart === 'user'"
          style="position: absolute; top: 0; left: 0"
        />
      </transition>

      <transition name="fade">
        <admin-chart-book-actions
          v-if="selectedChart === 'action'"
          style="position: absolute; top: 0; left: 0"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import AdminChartBooksStatistics from "@/views/Admin/Charts/AdminChartBooksStatistics";
import AdminChartUsersStatistics from "@/views/Admin/Charts/AdminChartUsersStatistics";
import AdminChartBookActions from "@/views/Admin/Charts/AdminChartBookActions";

export default {
  name: "admin-chart",
  components: {
    AdminChartBooksStatistics,
    AdminChartUsersStatistics,
    AdminChartBookActions,
  },
  data() {
    return {
      isLoading: false,
      selectedChart: "book",
    };
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.active-button {
  background-color: #f3f3f3 !important;
  border-color: #f3f3f3 !important;
}
</style>
