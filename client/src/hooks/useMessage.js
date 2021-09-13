import { useToast } from "primevue/usetoast";

export default function useMessage() {
  const toast = useToast();

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

  return { showErrorMessage, showSuccessfulMessage };
}
