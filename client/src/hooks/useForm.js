import { ref } from "vue";
// import useField from "@hooks/Author/useField";
import useAxios from "@/hooks/useAxios";

export default function useForm(init = {}) {
  const form = ref({});
  const toggleDialog = ref(false);

  const { fetchData } = useAxios();

  for (const [key, value] of Object.entries(init)) {
    form.value[key] = value;
  }

  const handleSubmit = async () => {
    toggleDialog.value = false;

    await fetchData({
      method: "POST",
      url: "/books/author",
      data: { ...form.value },
    });
    form.value = {};
  };

  return { form, handleSubmit, toggleDialog };
}
