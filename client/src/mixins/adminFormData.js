export default {
  props: {
    typeForm: {
      type: String,
    },

    dataForm: {
      type: Object,
      required: true,
    },

    path: {
      type: String,
      required: true,
    },

    callback: {
      type: Function,
      required: true,
    },
  },
};
