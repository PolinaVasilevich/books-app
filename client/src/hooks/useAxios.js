import { ref } from "vue";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/`;

export default function useAxios(config = {}) {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetch = async () => {
    loading.value = true;
    try {
      const result = await axios.request({ ...config });
      response.value = result?.data;
    } catch (errors) {
      error.value = errors;
    } finally {
      loading.value = false;
    }
  };

  fetch();
  return { response, error, loading, fetch };
}
