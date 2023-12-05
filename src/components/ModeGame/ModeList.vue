<script setup lang="ts">
import { IGameMode } from '../../../src/core/interfaces/model/GameMode';
import { reactive, ref } from 'vue';

defineProps<{ listModes: IGameMode[]; }>();
const emit = defineEmits<{ selectedMode: [mode: IGameMode]; }>();

const count = ref(0);

function selectMode(mode: IGameMode) {
  emit('selectedMode', mode);
}

</script>

<template>
  <ul class="list-none flex justify-center gap-10">
    <li
      v-for="mode in listModes"
      :key="mode.title"
      @click="selectMode(mode)"
      class="card"
    >
      <p>{{ mode.title }}</p>
      <p>{{ mode.rank }}</p>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.card {
  width: 150px;
  height: 150px;
  border: 1px solid #ee9d9d;
  border-radius: 20px;
}
</style>
