import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

export default function useAuthors() {
  const data = reactive({ authors: [], error: null, loading: false });

  const getData = async () => {
    const { response, loading, error, fetchData } = useAxios({
      method: "GET",
      url: "/books/allauthors",
    });
    fetchData();
    data.authors = response;
    data.error = error;
    data.loading = loading;
  };

  return { getData, ...toRefs(data) };
}
