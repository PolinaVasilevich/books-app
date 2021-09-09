import { ref, reactive, watch } from "vue";

export default function useField(field) {
  const valid = ref(true);
  const value = ref(field.value);
  const errors = reactive({});

  const reassing = (val) => {
    valid.value = true;
    Object.keys(field.validators ?? {}).map((vname) => {
      const isValid = field.validators[vname](val);
      errors[vname] = !isValid;

      if (!isValid) {
        valid.value = false;
      }
    });
  };

  watch(value, reassing);
  reassing(value.value);

  return { value, valid, errors };
}
