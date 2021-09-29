<template>
  <GoogleMap
    api-key="AIzaSyAfm1nAFdquZWc1I4Srn1_kmc0K-izNh8s"
    style="width: 100%; height: 700px"
    :zoom="11"
    :center="center"
  >
    <Marker
      :key="gmp.name"
      v-for="gmp in mapOptions"
      :options="gmp.options"
      @click="center = gmp.options"
    />
  </GoogleMap>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  props: {
    mapOptions: { type: Array, required: true },
  },
  components: { GoogleMap, Marker },

  setup() {
    const center = ref(null);

    const setLocationLatLng = () => {
      navigator.geolocation.getCurrentPosition((geolocation) => {
        center.value = {
          lat: geolocation.coords.latitude,
          lng: geolocation.coords.longitude,
        };
      });
    };

    onMounted(() => {
      setLocationLatLng();
    });

    return { center };
  },
});
</script>
