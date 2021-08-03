export default {
  data() {
    return {
      isShowModal: false,
      isShowMessage: false,
      isShowEditModal: false,
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
  },
};
