import { reactive, toRefs } from "vue";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

axios.defaults.baseURL = `http://localhost:3000/`;

export interface AxiosState<T = any> {
  response: T[];
  responseMessage: string;
  errorMessage: string;
  isError?: boolean;
  loading: boolean;
}

export default function useAxios(config: AxiosRequestConfig) {
  const state = reactive<AxiosState>({
    response: [],
    errorMessage: "",
    responseMessage: "",
    isError: false,
    loading: true,
  });

  const fetch = async () => {
    state.loading = true;
    try {
      const result: AxiosResponse = await axios.request({ ...config });
      state.response = result.data;
      if (result.data.message) {
        state.responseMessage = result.data.message;
      }
    } catch (err) {
      state.isError = true;

      if (axios.isAxiosError(err) && err.response) {
        state.errorMessage = err.response.data.message;
      } else {
        console.log(err);
      }
    } finally {
      state.loading = false;
    }
  };

  return { ...toRefs(state), fetch };
}
