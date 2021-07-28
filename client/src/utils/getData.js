import API from "./api";

export async function getData(path) {
  try {
    const data = await API.get(path);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
