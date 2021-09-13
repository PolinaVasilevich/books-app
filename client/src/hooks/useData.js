import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

export default function useData() {
  const data = reactive({ data: [], error: null, loading: false });

  const getData = async (url) => {
    const { response, loading, error } = await useAxios({
      method: "GET",
      url,
    });
    data.data = response;
    data.error = error;
    data.loading = loading;
  };

  const createItem = async (url, data) => {
    const { loading, error } = await useAxios({
      method: "POST",
      url,
      data,
    });
    data.error = error;
    data.loading = loading;
  };

  const updateItem = async (url, data) => {
    const { loading, error } = await useAxios({
      method: "PUT",
      url,
      data,
    });
    data.error = error;
    data.loading = loading;
  };

  const removeItem = async (url, data) => {
    const { loading, error } = await useAxios({
      method: "DELETE",
      url,
      data,
    });
    data.error = error;
    data.loading = loading;
  };

  return { getData, createItem, updateItem, removeItem, ...toRefs(data) };
}
