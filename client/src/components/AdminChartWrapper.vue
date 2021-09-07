<template>
  <div
    style="
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    "
  >
    <slot name="title"></slot>

    <div>
      <div>
        <Button
          label="All time"
          @click="$emit('showAllData')"
          class="p-button-text"
          style="font-size: 1.3rem"
        />
        <Button
          label="Current month"
          @click="$emit('showMonthData')"
          class="p-button-text"
          style="font-size: 1.3rem"
        />
      </div>
      <slot name="chart"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-chart-wrapper",
};
</script>
