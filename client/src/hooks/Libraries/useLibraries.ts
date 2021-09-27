import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

import Library from "@/models/Library";
import BookLibrary from "@/models/BookLibrary";
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

  const addLibrary = async (data: Library) => {
    const { responseMessage, errorMessage, fetch } = useAxios({
      method: "POST",
      url: "books/library",
      data,
    });

    await fetch();
    state.responseMessage = responseMessage.value;
    state.errorMessage = errorMessage.value;
  };

  const addBookToLibrary = async (id: number | string, data: BookLibrary) => {
    const { responseMessage, errorMessage, fetch } = useAxios({
      method: "PUT",
      url: `books/library/add-books/${id}`,
      data,
    });
    await fetch();
    state.responseMessage = responseMessage.value;
    state.errorMessage = errorMessage.value;
  };

  const deleteBookLibrary = async (
    libraryid: number | string,
    bookid: number | string
  ) => {
    const { responseMessage, errorMessage, fetch } = useAxios({
      method: "DELETE",
      url: `books/delete-book-library/${libraryid}&${bookid}`,
    });

    await fetch();
    state.responseMessage = responseMessage.value;
    state.errorMessage = errorMessage.value;
  };

  const deleteLibrary = async (id: number | string) => {
    const { responseMessage, errorMessage, fetch } = useAxios({
      method: "DELETE",
      url: `books/delete-library/${id}`,
    });

    await fetch();
    state.responseMessage = responseMessage.value;
    state.errorMessage = errorMessage.value;
  };

  return {
    getLibraries,
    addBookToLibrary,
    addLibrary,
    deleteBookLibrary,
    deleteLibrary,
    ...toRefs(state),
  };
}
