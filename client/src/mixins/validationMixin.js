export default {
  data() {
    return {
      isFormValid: true,
    };
  },

  methods: {
    checkForm() {
      this.v$.form.$touch();
      if (!this.v$.user.$error) {
        console.log("ok");
      }
    },
  },
};
