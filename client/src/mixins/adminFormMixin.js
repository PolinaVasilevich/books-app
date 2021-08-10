import API from "@/utils/api";

export default {
  data() {
    return {
      message: "",
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

    async removeData(path, callback) {
      try {
        await API.delete(path);
        callback();
      } catch (error) {
        console.log(error);
        callback();
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

    async createRecord(path, payload) {
      try {
        await API.post(path, payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
