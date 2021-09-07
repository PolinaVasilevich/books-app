import API from "@/utils/api";

export default {
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],

      currentMonth: "",
      selectedItem: "all",
      isLoading: false,
      topDataAllTime: null,
      topDataCurrentMonth: null,
    };
  },

  methods: {
    async getTopDataAllTime(path) {
      try {
        const data = await API.get(path);
        this.topDataAllTime = data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getTopDataCurrentMonth(path) {
      try {
        const data = await API.get(path);
        this.topDataCurrentMonth = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.currentMonth = this.months[+new Date().getMonth()];
  },
};
