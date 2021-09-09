import { onMounted } from "vue";
import useAxios from "@/hooks/useAxios";

export default function useAuthors() {
  const { response: authors, loading, error, fetchData } = useAxios();

  onMounted(async () => {
    await fetchData({
      method: "GET",
      url: "/books/allauthors",
    });
  });

  return { authors, loading, error };
}
