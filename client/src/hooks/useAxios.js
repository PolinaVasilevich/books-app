import { ref } from "vue";
import axios from "axios";

axios.defaults.baseURL = `http://localhost:3000/`;

export default function useAxios() {
  const response = ref(null);
  const error = ref("");
  const loading = ref(true);

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params);
      response.value = result.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { response, error, loading, fetchData };
}
