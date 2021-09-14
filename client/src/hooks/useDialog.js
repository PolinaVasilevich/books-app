import { ref } from "vue";

export default function useDialog() {
  const submitted = ref(false);
  const displayDialog = ref(false);

  const hideDialog = () => {
    displayDialog.value = false;
    submitted.value = false;
  };

  const showDialog = () => {
    displayDialog.value = true;
    submitted.value = false;
  };

  return {
    submitted,
    displayDialog,
    hideDialog,
    showDialog,
  };
}
