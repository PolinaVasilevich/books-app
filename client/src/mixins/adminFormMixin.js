import API from "@/utils/api";

export default {
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

    resetForm(dataForm) {
      const newDataForm = {};
      Object.keys(dataForm).forEach((item) => (dataForm[item] = ""));
      return newDataForm;
    },
  },
};
