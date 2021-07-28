import API from "./api";

export async function postData(path, payload) {
  try {
    await API.post(path, payload);
  } catch (error) {
    console.log(error);
  }
}
