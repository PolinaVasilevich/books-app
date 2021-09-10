import { toRefs, reactive } from "vue";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/`;

export default function useAxios(params) {
  const state = reactive({
    response: [],
    error: null,
    loading: true,
  });

  const fetchData = async (fetchParams) => {
    state.loading = true;
    try {
      const result = await axios.request(fetchParams || params);
      state.response = result.data;
    } catch (errors) {
      state.error = errors;
    } finally {
      state.loading = false;
    }
  };

  return { ...toRefs(state), fetchData };
}
