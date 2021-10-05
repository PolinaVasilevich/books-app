import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

import Author from "@/models/Author";
import { AxiosState } from "@/hooks/useAxios";

export default function useAuthor() {
  const state = reactive<AxiosState<Author>>({
    response: [],
    errorMessage: "",
    responseMessage: "",
    loading: false,
  });

  const getAuthors = async () => {
    const { response, loading, errorMessage, fetch } = useAxios({
      method: "GET",
      url: "books/allauthors",
    });

    await fetch();
    state.response = response.value;
    state.errorMessage = errorMessage.value;
    state.loading = loading.value;
  };

  const createAuthor = async (author) => {
    const { responseMessage, errorMessage, fetch } = useAxios({
      method: "POST",
      url: "books/author",
      data: author,
    });

    await fetch();
    state.responseMessage = responseMessage.value;
    state.errorMessage = errorMessage.value;
  };

  const updateAuthor = async (id, author) => {
    const { responseMessage, errorMessage, fetch } = useAxios({
      method: "PUT",
      url: `books/updateauthor/${id}`,
      data: author,
    });
    await fetch();
    state.responseMessage = responseMessage.value;
    state.errorMessage = errorMessage.value;
  };

  const deleteAuthor = async (id) => {
    const { responseMessage, errorMessage, fetch } = useAxios({
      method: "DELETE",
      url: `books/deleteauthor/${id}`,
    });
    await fetch();
    state.responseMessage = responseMessage.value;
    state.errorMessage = errorMessage.value;
  };

  return {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    ...toRefs(state),
  };
}
