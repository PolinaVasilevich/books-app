<template>
  <div class="container admin-table">
    <div class="row">
      <div class="col-sm-20">
        <h1>{{ titleTable }}</h1>
        <hr />
        <br /><br />
        <slot name="modal"></slot>
        <br /><br />
        <table class="table table-hover">
          <thead>
            <tr>
              <th v-for="(header, index) in headers" :key="index">
                {{ header }}
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <slot name="data"></slot>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },

  props: {
    titleTable: {
      type: String,
      default: "Books",
    },
    headers: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.admin-table {
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
