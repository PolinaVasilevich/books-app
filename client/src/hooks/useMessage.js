import { useToast } from "primevue/usetoast";

export default function useMessage() {
  const toast = useToast();

  const showErrorMessage = (error) => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
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
