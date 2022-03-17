<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export interface Postion {
  lat: number;
  lng: number;
}

const apiKey = ref(process.env.VUE_APP_MAPS_API_KEY);
const center = reactive({
  lat: 0,
  lng: 0,
});

const markerClick = (value: any) => {
  console.log("value: ", value);
};

const getPosition = reactive(
  (position: { coords: { latitude: number; longitude: number } }) => {
    console.log("onSuccess", position.coords);
    center.lat = position.coords.latitude;
    center.lng = position.coords.longitude;
  }
);

const errorPosition = reactive((error: any) => {
  console.log("onError", error);
});

navigator.geolocation.getCurrentPosition(getPosition, errorPosition);
</script>
<template>
  <GoogleMap
    :api-key="apiKey"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" v-on:click="markerClick" />
  </GoogleMap>
</template>
