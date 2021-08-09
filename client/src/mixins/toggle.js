export default {
  data() {
    return {
      displayModal: false,
      displayEditModal: false,
      displayMessage: false,
      displayErrorMessage: false,
      displayEditForm: false,
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

    openErrorMessage() {
      this.displayErrorMessage = true;
    },

    closeErrorMessage() {
      this.displayErrorMessage = false;
    },

    showErrorMessage(value) {
      this.message = value;
      this.openErrorMessage();
    },

    closeEditForm() {
      this.displayEditForm = false;
    },
  },
};
