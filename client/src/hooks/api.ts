// import { reactive, toRefs } from "vue";
import axios, { AxiosResponse } from "axios";

import AuthorType from "../models/authorType";

const instance = axios.create({
  baseURL: "http://localhost:3000/books/",
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Author = {
  getAuthors: (): Promise<AuthorType[]> => requests.get("allauthors"),
  createAuthor: (author: AuthorType): Promise<AuthorType> =>
    requests.post("author", author),
  updateAuthor: (author: AuthorType, id: string): Promise<AuthorType> =>
    requests.put(`updateauthor/${id}`, author),
  deleteAuthor: (id: string): Promise<void> =>
    requests.delete(`deleteauthor/${id}`),
};

// export default function useAxios(config: object) {
//   const state = reactive({
//     response: null,
//     data: null,
//     errorMessage: null,
//     isError: false,
//     loading: true,
//   });

//   const fetch = async () => {
//     state.loading = true;
//     try {
//       const result = await axios.request({ ...config });
//       state.response = result?.data;
//     } catch (err) {
//       state.isError = true;
//       state.errorMessage = err?.response?.data?.message;
//     } finally {
//       state.loading = false;
//     }
//   };

//   return { ...toRefs(state), fetch };
// }
