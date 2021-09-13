import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

export default function useAuthors() {
  const data = reactive({ authors: [], error: null, loading: false });

  const getData = () => {
    const { response, loading, error, fetch } = useAxios({
      method: "GET",
      url: "/books/allauthors",
    });

    fetch();

    data.authors = response;
    data.error = error;
    data.loading = loading;
  };

  return { getData, ...toRefs(data) };
}
