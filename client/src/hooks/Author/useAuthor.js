import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

export default function useAuthor() {
  const state = reactive({
    data: [],
    error: null,
    responseMessage: null,
    loading: false,
  });

  const getAuthors = async () => {
    const { response, loading, errorMessage, fetch } = useAxios({
      method: "GET",
      url: "books/allauthors",
    });

    await fetch();

    state.data = response;
    state.error = errorMessage.value;
    state.loading = loading;
  };

  const createAuthor = async (author) => {
    const { response, errorMessage, fetch } = useAxios({
      method: "POST",
      url: "books/author",
      data: author,
    });

    await fetch();
    state.responseMessage = response.value?.message;
    state.error = errorMessage.value;
  };

  const updateAuthor = async (id, author) => {
    const { response, errorMessage, fetch } = useAxios({
      method: "PUT",
      url: `books/updateauthor/${id}`,
      data: author,
    });
    await fetch();
    state.responseMessage = response.value?.message;
    state.error = errorMessage.value;
  };

  const deleteAuthor = async (id) => {
    const { response, errorMessage, fetch } = useAxios({
      method: "DELETE",
      url: `books/deleteauthor/${id}`,
    });
    await fetch();
    state.responseMessage = response.value?.message;
    state.error = errorMessage.value;
  };

  return {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    ...toRefs(state),
  };
}
