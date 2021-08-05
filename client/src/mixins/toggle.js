export default {
  data() {
    return {
      displayModal: false,
      displayEditModal: false,
      showMessage: false,
    };
  },

  methods: {
    openModal() {
      this.displayModal = true;
    },

    closeModal() {
      this.displayModal = false;
    },

    openEditModal() {
      this.displayEditModal = true;
    },

    closeEditModal() {
      this.displayEditModal = false;
    },

    openMessage() {
      this.showMessage = true;
    },

    closeMessage() {
      this.showMessage = false;
    },
  },
};
