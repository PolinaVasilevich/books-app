import { reactive, toRefs } from "vue";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/`;

export default function useAxios(config = {}) {
  const state = reactive({
    response: null,
    data: null,
    errorMessage: null,
    isError: false,
    loading: true,
  });

  const fetch = async () => {
    state.loading = true;
    try {
      const result = await axios.request({ ...config });
      state.response = result?.data;
    } catch (err) {
      state.isError = true;
      state.errorMessage = err?.response?.data?.message;
    } finally {
      state.loading = false;
    }
  };

  return { ...toRefs(state), fetch };
}
