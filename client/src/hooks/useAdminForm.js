import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import useAxios from "@/hooks/useAxios";

export default function useAdminForm(init = {}) {
  const toast = useToast();
  const submitted = ref(false);
  const displayDialog = ref(false);
  const initialForm = ref(init);

  const { fetchData, response, loading, error } = useAxios();

  const getData = async (url) => {
    await fetchData({
      method: "GET",
      url,
    });
  };

  const updateItem = async (url, data) => {
    await fetchData({
      method: "PUT",
      url: `${url}/${initialForm.value._id}`,
      data: { ...initialForm.value, ...data },
    });

    if (error.value) {
      showErrorMessage(error);
    } else {
      showSuccessfulMessage("Item updated");
    }
  };

  const createNewItem = async (url, data) => {
    await fetchData({
      method: "POST",
      url,
      data,
    });
    if (error.value) {
      showErrorMessage(error);
    } else {
      showSuccessfulMessage("Item created");

      initialForm.value = {};
    }
  };

  const removeItem = async (url, data) => {
    await fetchData({
      method: "DELETE",
      url: `${url}/${data._id}`,
    });

    if (error.value) {
      showErrorMessage(error);
    } else {
      showSuccessfulMessage("Item deleted");
    }
  };

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

  const showErrorMessage = (error) => {
    error.value.response.data.message
      ? toast.add({
          severity: "error",
          summary: "Error",
          detail: error.value.response.data.message,
          life: 3000,
        })
      : console.log(error);
    console.log(error.value);
  };

  const showSuccessfulMessage = (message) => {
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: message,
      life: 3000,
    });
  };

  return {
    hideDialog,
    showErrorMessage,
    showSuccessfulMessage,
    showCreateNewItemDialog,
    showEditItemDialog,
    createNewItem,
    updateItem,
    displayDialog,
    submitted,
    initialForm,
    removeItem,
    getData,
    response,
    loading,
  };
}
