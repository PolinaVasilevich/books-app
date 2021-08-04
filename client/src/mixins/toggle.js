export default {
  data() {
    return {
      displayModal: false,
    };
  },

  methods: {
    openModal() {
      this.displayModal = true;
    },

    closeModal() {
      this.displayModal = false;
    },
  },
};
