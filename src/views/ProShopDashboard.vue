<script setup lang="ts">
import { RouteNames } from "@/router/routes";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const startScramble = ref(() => {
  router.push({
    name: RouteNames.ProShop.Scramble,
  });
});
</script>
<template>
  <StandardCard>
    <template #content>
      <p-button :onclick="startScramble">Start Scramble</p-button><br />
      <p-button>Another Button</p-button><br />
      <p-button>Button...</p-button>
    </template>
  </StandardCard>
</template>
