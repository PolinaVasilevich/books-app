import { reactive, toRefs } from "vue";
import useAxios from "@/hooks/useAxios";

export default function useReservedBooks() {
  const state = reactive({
    data: [],
    allNotReturnedBooks: [],
    allMustReturnTodayBooks: [],
    loadingNotReturnedBooks: false,
    loadingMustReturnTodayBooks: false,
    error: null,
    responseMessage: null,
    loading: false,
  });

  const getReservedBooks = async () => {
    const { response, loading, errorMessage, fetch } = useAxios({
      method: "GET",
      url: "books/modifiedreservedbooks",
    });

    await fetch();

    state.data = response;
    state.error = errorMessage.value;
    state.loading = loading;
  };

  const getAllNotReturnedBooks = async () => {
    const { response, loading, errorMessage, fetch } = useAxios({
      method: "GET",
      url: "books/all-not-returned-books",
    });

    await fetch();

    state.allNotReturnedBooks = response;
    // state.error = errorMessage.value;
    state.loadingNotReturnedBooks = loading;
  };

  const getAllMustReturnTodayBooks = async () => {
    const { response, loading, errorMessage, fetch } = useAxios({
      method: "GET",
      url: "books/all-return-today-books",
    });

    await fetch();

    state.allMustReturnTodayBooks = response;
    // state.error = errorMessage.value;
    state.loadingMustReturnTodayBooks = loading;
  };

  const getCountNewReservedBooks = async () => {
    const { response, loading, errorMessage, fetch } = useAxios({
      method: "GET",
      url: "books/new-reserved-books",
    });

    await fetch();

    state.data = response;
    state.error = errorMessage.value;
    state.loading = loading;
  };

  const giveOutBook = async (book) => {
    const { response, errorMessage, fetch } = useAxios({
      method: "POST",
      url: "books/giveoutbook",
      data: book,
    });

    await fetch();
    state.responseMessage = response.value?.message;
    state.error = errorMessage.value;
  };

  const returnBook = async (book) => {
    const { response, errorMessage, fetch } = useAxios({
      method: "POST",
      url: "books/returnbook",
      data: book,
    });

    await fetch();
    state.responseMessage = response.value?.message;
    state.error = errorMessage.value;
  };

  const reserveBook = async (data) => {
    const { response, errorMessage, fetch } = useAxios({
      method: "POST",
      url: "books/reservebook",
      data,
    });

    await fetch();
    state.responseMessage = response.value?.message;
    state.error = errorMessage.value;
  };

  return {
    getReservedBooks,
    giveOutBook,
    returnBook,
    reserveBook,
    getAllNotReturnedBooks,
    getAllMustReturnTodayBooks,
    getCountNewReservedBooks,

    ...toRefs(state),
  };
}
