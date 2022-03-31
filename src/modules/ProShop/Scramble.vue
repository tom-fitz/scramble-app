<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { userStore } from "../User/store/index";

const store = userStore();

const proShopUser = store.GetUser;

interface IScramble {
  NumberOfTeams: number;
  MaxGolfersPerTeam: number;
  TotalGolfers: number;
  Date: string;
}

const numberOfTeams = ref(0.0);

const maxGolfersPerTeam = ref(0.0);

const totalGolfers = computed(() => {
  return maxGolfersPerTeam.value * numberOfTeams.value;
});

const date = ref();

const time = ref(null);
</script>
<template>
  <StandardCard>
    <template #content>
      <div>
        <div>
          <label for="numberOfTeams">Number of teams</label>
        </div>
        <p-input-number
          id="numberOfTeams"
          v-model="numberOfTeams"
        ></p-input-number>
      </div>
      <div>
        <div>
          <label for="maxGolfers">Max golfers per team</label>
        </div>
        <p-input-number id="maxGolfers" v-model="maxGolfersPerTeam" />
      </div>
      <div>Total golfers: {{ totalGolfers }}</div>
      <div>
        <p-calendar id="basic" autocomplete="off" v-model="date"></p-calendar>
      </div>
      <div>
        <p-calendar
          v-model="time"
          :showTime="true"
          hourFormat="12"
          :timeOnly="true"
        ></p-calendar>
      </div>
    </template>
  </StandardCard>
</template>
