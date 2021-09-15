import { ref, reactive, watch } from "vue";

export default function useField(field) {
  const valid = ref(true);
  const value = ref(field.value);
  const errors = reactive({});
  const touched = ref(false);

  const reassing = (val) => {
    valid.value = true;
    Object.keys(field.validators ?? {}).forEach((vname) => {
      const isValid = field.validators[vname](val);
      errors[vname] = !isValid;

      if (!isValid) {
        valid.value = false;
      }
    });
  };

  watch(value, reassing);
  reassing(value.value);

  return { value, valid, errors, touched, blur: () => (touched.value = true) };
}
