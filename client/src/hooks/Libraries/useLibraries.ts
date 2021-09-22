import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

import Library from "@/models/Library";
import { AxiosState } from "@/hooks/useAxios";

export default function useAuthor() {
  const state = reactive<AxiosState<Library>>({
    response: [],
    errorMessage: "",
    responseMessage: "",
    loading: false,
  });

  const getLibraries = async () => {
    const { response, loading, errorMessage, fetch } = useAxios({
      method: "GET",
      url: "books/libraries",
    });

    await fetch();
    state.response = response.value;
    state.errorMessage = errorMessage.value;
    state.loading = loading.value;
  };

  const addBookToLibrary = async (id, data) => {
    const { responseMessage, errorMessage, fetch } = useAxios({
      method: "PUT",
      url: `books/library/add-books/${id}`,
      data,
    });
    await fetch();
    state.responseMessage = responseMessage.value;
    state.errorMessage = errorMessage.value;
  };

  return {
    getLibraries,
    addBookToLibrary,
    ...toRefs(state),
  };
}
