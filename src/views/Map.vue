<script setup lang="ts">
import { ref, Ref, reactive, watch, defineProps, EmitsOptions } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { LatLng, AddressEvt } from "@/modules/User/User";

const props = defineProps({
  isInputOnly: {
    type: Boolean,
    default: false,
  },
});

interface Postion {
  lat: number;
  lng: number;
}

// reference to the map element
const mapRef: Ref<HTMLElement | null> = ref({} as HTMLElement);
// starting position for map
const center = { lat: 40.689247, lng: -74.044502 };

const apiKey = ref(process.env.VUE_APP_MAPS_API_KEY);

/* eslint-disable  @typescript-eslint/no-explicit-any */
const markerClick = (value: any) => {
  console.log("value: ", value);
};

// place to store user lat/lng
const userLocation = reactive({
  lat: 0,
  lng: 0,
});
// when this component runs attempt to get the User's location
// provide a callback to handle the provided position
navigator.geolocation.getCurrentPosition((pos) => {
  // update the User's location
  userLocation.lat = pos.coords.latitude;
  userLocation.lng = pos.coords.longitude;
});
// watch for changes to the User's Location
watch(
  [userLocation, () => mapRef.value?.ready],
  ([loc, isReady]) => {
    if (isReady && loc.lat && loc.lng) {
      // if the map is ready and the userLocation has been set/changed,
      // let's use the component's internal method for moving the map
      mapRef.value?.map.panTo(loc);
    }
  },
  {}
);

// a reference to the input element so the Places API knows where to render DOM updates
const inputRef = ref(null);
// any custom options that we may want to pass along to the autocomplete instance
const inputOptions = {};

const inputValue = ref("");

const emit = defineEmits<{ (e: "address-select", evt: AddressEvt): void }>();

// const inputValue = ref("");
watch(
  () => mapRef.value?.ready,
  (isReady) => {
    if (!isReady) return;
    // initialize the autocomplete searchbox, returns an object with methods and properties
    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.value,
      inputOptions
    );
    // listen for a selected place, and act upon it
    autocomplete.addListener("place_changed", () => {
      // get the selected place
      const place = autocomplete.getPlace();
      // uncomment the line below to see what the data looks like
      console.info({ place });

      const latLng: LatLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      const evt: AddressEvt = {
        address: place.address_components,
        location: latLng,
      };

      emit("address-select", evt);

      /**
       * We update our userLocation, and we have a watcher above that
       * will react to it changing and update our map for us.
       */
      userLocation.lat = place.geometry.location.lat();
      userLocation.lng = place.geometry.location.lng();
    });
  },
  {}
);
</script>
<template>
  <GoogleMap
    v-if="!isInputOnly"
    ref="mapRef"
    :api-key="apiKey"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>

  <input v-if="!isInputOnly" ref="inputRef" type="text" v-model="inputValue" />
</template>
