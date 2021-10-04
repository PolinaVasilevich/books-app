import { onMounted, ref } from "vue";

export default function useGeolocation() {
  const currentPoint = ref({ lat: 51.093048, lng: 6.84212 });

  const setLocationLatLng = () => {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      if (geolocation) {
        currentPoint.value = {
          lat: geolocation.coords.latitude,
          lng: geolocation.coords.longitude,
        };
      }
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
