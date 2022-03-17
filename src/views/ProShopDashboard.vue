<script setup lang="ts">
import { RouteNames } from "@/router/routes";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = ref(useRouter());

const startScramble = ref(() => {
  return router.value.push({
    name: RouteNames.ProShop.Scramble,
  });
});
</script>
<template>
  <StandardCard>
    <p-button :click="startScramble">Start Scramble</p-button><br />
    <p-button></p-button><br />
    <p-button></p-button>
  </StandardCard>
</template>
