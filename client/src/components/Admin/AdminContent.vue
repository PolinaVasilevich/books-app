<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />
    <div class="container admin-table">
      <div class="row">
        <div class="col-sm-20">
          <h1>{{ titleTable }}</h1>
          <hr />
          <br /><br />

          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="modalVisible = true"
          >
            Create new record
          </button>

          <div class="admin-table__modals">
            <my-modal :isShowModal="modalVisible" @close="modalVisible = false">
              <admin-form
                :form="createData.form"
                :path="createData.path"
                :callback="createData.callback"
                @close="this.modalVisible = false"
                @resetForm="resetForm"
                @showMessage="openMessage"
              >
                <slot name="create-form"></slot>
              </admin-form>
            </my-modal>

            <my-modal
              :isShowModal="editModalVisible"
              @close="$emit('update:editModalVisible', false)"
            >
              <admin-form
                :form="createData.form"
                :path="createData.path"
                :callback="createData.callback"
                @close="showEditForm = false"
                @resetForm="resetForm"
                @showMessage="openMessage"
              >
                <slot name="edit-form"></slot>
              </admin-form>
            </my-modal>
          </div>

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
  </div>
</template>

<script>
import MyAlert from "@/components/UI/MyAlert";
import AdminForm from "@/components/Admin/AdminForm";

import mixin from "@/mixins/formMixin.js";

export default {
  name: "admin-content",
  components: { MyAlert, AdminForm },
  mixins: [mixin],

  props: {
    titleTable: {
      type: String,
      required: true,
    },

    headers: {
      type: Array,
      required: true,
    },

    data: {
      type: Object,
      required: true,
    },

    createData: {
      type: Object,
      required: true,
    },

    editModalVisible: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      modalVisible: false,
      showEditForm: false,
      showMessage: false,
      message: "",
    };
  },

  methods: {
    hideModal() {
      this.modalVisible = false;
    },

    hideEditModal() {
      this.modalVisible = false;
    },

    resetForm(value) {
      this.$emit("resetForm", value);
    },

    openMessage(value) {
      this.message = value;
      this.showMessage = true;
    },
  },
};
</script>
