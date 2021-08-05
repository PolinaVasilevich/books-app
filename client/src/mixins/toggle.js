export default {
  data() {
    return {
      displayModal: false,
      displayEditModal: false,
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
  },
};
