import { reactive } from "vue";
import useField from "@/hooks/useField";

export default function useForm(init = {}) {
  const form = reactive({});

  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }

  return form;
}
