import { onMounted, ref } from "vue";

export default function useGeolocation() {
  const currentPoint = ref({});

  const setLocationLatLng = () => {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      currentPoint.value = {
        lat: geolocation.coords.latitude,
        lng: geolocation.coords.longitude,
      };
    });
  };

  const setCurrentPoint = (loc) => {
    currentPoint.value = loc;
  };

  onMounted(() => {
    setLocationLatLng();
  });

  return { currentPoint, setCurrentPoint };
}
