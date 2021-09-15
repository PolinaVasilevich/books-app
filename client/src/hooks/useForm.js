import { ref, reactive, computed } from "vue";
import useField from "@/hooks/useField";

export default function useForm(init = {}) {
  const form = reactive({});
  const formData = reactive({});
  let validForm = ref(false);
  const submitted = ref(false);

  validForm = computed(() => {
    return !Object.keys(form).filter((key) => !form[key].valid).length;
  });

  const initForm = () => {
    for (const [key, value] of Object.entries(init)) {
      form[key] = useField(value);
    }
  };

  initForm();

  const getFormData = () => {
    for (const [key, value] of Object.entries(form)) {
      formData[key] = value.value;
    }
  };

  const submitForm = async (emit) => {
    if (validForm.value) {
      getFormData();
      emit("submitForm", formData);
      submitted.value = true;
    }
  };

  const resetForm = () => {
    initForm();
  };

  return { form, submitForm, resetForm, validForm };
}
