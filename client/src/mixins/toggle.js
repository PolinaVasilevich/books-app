export default {
  data() {
    return {
      displayModal: false,
      displayEditModal: false,
      displayMessage: false,
      message: "",
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
      this.displayMessage = true;
    },

    closeMessage() {
      this.displayMessage = false;
    },

    showMessage(value) {
      this.message = value;
      this.openMessage();
    },
  },
};
