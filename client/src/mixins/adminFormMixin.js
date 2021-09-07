import API from "@/utils/api";

export default {
  data() {
    return {
      message: "",
      searchQuery: "",
    };
  },
  methods: {
    async addNewRecord(path, payload, callback) {
      try {
        await API.post(path, payload);
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    async removeData(path, callback, textMessage = "Item deleted") {
      try {
        await API.delete(path);
        callback();
        this.showMessage(textMessage);
      } catch (error) {
        console.log(error);
        this.showErrorMessage(error.response.data.message);
        callback();
      }
    },

    async removeManyEntries(
      path,
      body,
      callback,
      textMessage = "Items deleted"
    ) {
      try {
        await API.delete(path, { data: { ids: body } });
        callback();
        this.showMessage(textMessage);
      } catch (error) {
        console.log(error);

        callback();
        this.showErrorMessage(error.response.data.message);
      }
    },

    async updateData(path, payload, callback) {
      try {
        await API.put(path, payload);
        callback();
      } catch (error) {
        console.log(error);
        callback();
      }
    },

    deleteItems(items, path, callback) {
      const ids = [];
      items.forEach((elem) => {
        ids.push(elem._id);
      });

      this.removeManyEntries(
        path,
        ids,
        callback,
        `Items with id [${ids}] deleted`
      );
    },

    editModal(value) {
      this.editForm = value;
      this.initialEditForm = { ...value };
      this.openEditModal();
    },

    showMessage(text) {
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: text,
        life: 3000,
      });
    },

    showErrorMessage(error) {
      this.$toast.add({
        severity: "error",
        summary: "Error Message",
        detail: error,
        life: 3000,
      });
    },
  },
};
