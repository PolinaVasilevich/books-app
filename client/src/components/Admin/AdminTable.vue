<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
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
