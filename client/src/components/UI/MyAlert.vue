<template>
  <div class="alert alert-success" role="alert">{{ message }}</div>
</template>

<script>
export default {
  name: "my-alert",
  props: ["message"],
};
</script>
