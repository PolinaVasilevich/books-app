import { reactive, computed } from "vue";
import useField from "@/hooks/useField";

export default function useForm(init = {}) {
  const form = reactive({});
  const validKey = "valid";

  const initForm = () => {
    for (const [key, value] of Object.entries(init)) {
      form[key] = useField(value);
    }
  };

  initForm();

  const withoutValid = (k) => k !== validKey;

  form[validKey] = computed(() => {
    return Object.keys(form)
      .filter(withoutValid)
      .reduce((acc, key) => {
        acc = form[key].valid;
        return acc;
      }, true);
  });

  const resetForm = () => {
    initForm();
  };

  return { form, resetForm };
}
