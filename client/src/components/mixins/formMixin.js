import API from "@/utils/api";

export default {
  data() {
    return {
      isShowModal: false,
      isShowMessage: false,
      isShowEditModal: false,
      message: "",
    };
  },

  methods: {
    showModal() {
      this.isShowModal = !this.isShowModal;
    },
    showMessage() {
      this.isShowMessage = !this.isShowMessage;
    },
    showEditModal() {
      this.isShowEditModal = !this.isShowEditModal;
    },

    async addNewRecord(path, payload) {
      try {
        await API.post(path, payload);
        this.message = "New Record added!";
        this.showMessage();
      } catch (error) {
        console.log(error);
      }
    },

    async removeRecord(path) {
      try {
        await API.delete(path);
        this.message = "Record removed!";
        this.showMessage();
      } catch (error) {
        console.log(error);
      }
    },

    async updateRecord(path, payload) {
      try {
        await API.put(path, payload);
        this.message = "Book updated!";
        this.showMessage();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
