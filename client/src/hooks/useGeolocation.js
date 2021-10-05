import { ref } from "vue";

export default function useGeolocation() {
  const currentPoint = ref({ lat: null, lng: null });

  const setLocationLatLng = (coords) => {
    navigator.geolocation.watchPosition(getPosition, handleError);

    function getPosition(position) {
      const { latitude: lat, longitude: lng } = position.coords;

      // const R = 6371;
      // const distances = [];
      // const closest = -1;

      // coords.value.reduce((prev, curr) => {
      //   let { lat: mlat, lng: mlng } = curr.options.position;
      // });

      // coords.value.reduce(function (prev, curr) {
      //   var cpos = new google.maps.geometry.spherical.computeDistanceBetween(
      //     { latitude: lat, longitude: lng },
      //     curr.position
      //   );
      //   var ppos = new google.maps.geometry.spherical.computeDistanceBetween(
      //     { latitude: lat, longitude: lng },
      //     prev.position
      //   );

      //   return cpos < ppos ? curr : prev;
      // }).position;

      setCurrentPoint({
        lat,
        lng,
      });
    }

    function handleError(error) {
      console.error(error.message);
      setCurrentPoint(coords.value[0].options.position);
    }
  };

  const setCurrentPoint = (loc) => {
    currentPoint.value = loc;
  };

  return { currentPoint, setCurrentPoint, setLocationLatLng };
}
