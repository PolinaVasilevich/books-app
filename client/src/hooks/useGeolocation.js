import { ref, onMounted } from "vue";

export default function useGeolocation(coords) {
  const centerPosition = ref({ lat: 53.893009, lng: 27.567444 });
  const currentPosition = ref(null);

  const trackPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(successPosition, handleError, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
    } else {
      console.log(`Browser doesn't support Geolocation`);
    }

    function successPosition(position) {
      centerPosition.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      currentPosition.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    }

    function handleError(err) {
      console.error(
        "Error Code: " + err.code + " Error Message: " + err.message
      );
      // setCenterPosition(coords.value[0].options.position);
    }
  };

  const setCenterPosition = (loc) => {
    centerPosition.value = loc;
  };

  return { centerPosition, currentPosition, setCenterPosition, trackPosition };
}
