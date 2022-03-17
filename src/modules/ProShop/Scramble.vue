<script setup lang="ts">
import { ref } from "vue";

const scramble = ref({
  headCount: 0,
  dates: null,
});
</script>
<template>
  <StandardCard>
    <template #content>
      <InputText id="email" type="email" v-model="user.email" />
    </template>
  </StandardCard>
</template>
