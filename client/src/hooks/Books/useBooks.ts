import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

import Book from "@/models/Book";
import { AxiosState } from "@/hooks/useAxios";

export default function useAuthor() {
  const state = reactive<AxiosState<Book>>({
    response: [],
    errorMessage: "",
    responseMessage: "",
    loading: false,
  });

  const getBooks = async () => {
    const { response, loading, errorMessage, fetch } = useAxios({
      method: "GET",
      url: "books/allbooks",
    });

    await fetch();
    state.response = response.value;
    state.errorMessage = errorMessage.value;
    state.loading = loading.value;
  };

  return {
    getBooks,
    ...toRefs(state),
  };
}
