import { reactive, toRefs } from "vue";

import { Author } from "./api";
import AuthorType from "../models/authorType";

export default function useData() {
  const state = reactive({
    data: [],
    error: null,
    responseMessage: null,
    loading: false,
  });

  //   const getData = async (url) => {
  //     const { response, loading, errorMessage, fetch } = useAxios({
  //       method: "GET",
  //       url,
  //     });
  //     await fetch();

  //     state.data = response;
  //     state.error = errorMessage.value;
  //     state.loading = loading;
  //   };

  //   const createItem = async (url, data) => {
  //     const { response, errorMessage, fetch } = useAxios({
  //       method: "POST",
  //       url,
  //       data,
  //     });
  //     await fetch();
  //     state.responseMessage = response.value?.message;
  //     state.error = errorMessage.value;
  //   };

  //   const updateItem = async (url, data) => {
  //     const { response, errorMessage, fetch } = useAxios({
  //       method: "PUT",
  //       url,
  //       data,
  //     });
  //     await fetch();
  //     state.responseMessage = response.value?.message;
  //     state.error = errorMessage.value;
  //   };

  //   const removeItem = async (url) => {
  //     const { response, errorMessage, fetch } = useAxios({
  //       method: "DELETE",
  //       url,
  //     });
  //     await fetch();
  //     state.responseMessage = response.value?.message;
  //     state.error = errorMessage.value;
  //   };

  return { getData, createItem, updateItem, removeItem, ...toRefs(state) };
}
