export default function useDialog() {
  const submitted = ref(false);
  const displayDialog = ref(false);

  const hideDialog = () => {
    displayDialog.value = false;
    submitted.value = false;
  };

  const showCreateNewItemDialog = () => {
    submitted.value = false;
    displayDialog.value = true;
  };

  const showEditItemDialog = (value) => {
    initialForm.value = { ...value };
    displayDialog.value = true;
  };

  return {
    submitted,
    displayDialog,
    hideDialog,
    showCreateNewItemDialog,
    showEditItemDialog,
  };
}
