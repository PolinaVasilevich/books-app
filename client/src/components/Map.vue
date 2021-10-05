<template>
  <GMapMap style="height: 700px" :zoom="zoomMap" :center="centerPosition">
    <GMapMarker
      :key="m.name"
      v-for="m in markers"
      :options="m.options"
      @click="changeCurrentPoint(m)"
      :clickable="true"
      :draggable="true"
      :icon="m._id === currentLibraryID ? activeIcon : defaultIcon"
    />
    <GMapMarker :position="currentPosition" :icon="currentPositionIcon">
      <GMapInfoWindow>
        <div>You are here</div>
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  props: {
    markers: { type: Array, required: true },
    centerPosition: { type: Object },
    currentLibraryID: { type: [String, Number] },
    currentPosition: { type: Object },
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

    const currentPositionIcon = {
      url: "https://icon-library.com/images/marker-icon/marker-icon-12.jpg",
      scaledSize: { width: 60, height: 60 },
    };

    const changeCurrentPoint = (point) => {
      emit("changeCurrentPoint", point);
      zoomMap.value = 13;
    };

    return {
      zoomMap,
      defaultIcon,
      activeIcon,
      currentPositionIcon,
      changeCurrentPoint,
    };
  },
});
</script>
