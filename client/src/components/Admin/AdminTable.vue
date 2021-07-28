<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>{{ titleTable }}</h1>
        <hr />
        <br /><br />
        <button
          type="button"
          class="btn btn-success btn-sm"
          @click="showModal = true"
        >
          Create new record
        </button>
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
            <tr v-for="(item, index) in items" :key="index">
              <slot name="data"></slot>
              <td>
                <button type="button" class="btn btn-warning btn-sm">
                  Update
                </button>
                <button type="button" class="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleTable: {
      type: String,
      default: "Books",
    },
  },
};
</script>
