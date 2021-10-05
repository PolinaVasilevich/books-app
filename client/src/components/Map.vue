<template>
  <GMapMap
    style="width: 100vw; height: 700px"
    :zoom="zoomMap"
    :center="currentPoint"
  >
    <GMapMarker
      :key="m.name"
      v-for="m in markers"
      :options="m.options"
      @click="changeCurrentPoint(m)"
      :clickable="true"
      :draggable="true"
      :icon="m._id === currentLibraryID ? activeIcon : defaultIcon"
    />
  </GMapMap>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  props: {
    markers: { type: Array, required: true },
    currentPoint: { type: Object },
    currentLibraryID: { type: [String, Number] },
  },

  emits: ["changeCurrentPoint"],

  setup(props, { emit }) {
    const zoomMap = ref(12);

    const defaultIcon = {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      scaledSize: { width: 40, height: 40 },
      // labelOrigin: { x: 16, y: -10 },
    };

    const activeIcon = {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      scaledSize: { width: 45, height: 45 },
    };

    const changeCurrentPoint = (point) => {
      emit("changeCurrentPoint", point);
      zoomMap.value = 13;
    };

    return { zoomMap, defaultIcon, activeIcon, changeCurrentPoint };
  },
});
</script>
