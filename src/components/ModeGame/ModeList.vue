<script setup lang="ts">
import { IGameMode } from '../../../src/core/interfaces/model/GameMode';
import { reactive, ref } from 'vue';

defineProps<{ listModes: IGameMode[]; }>();
const emit = defineEmits<{ onSelectGameMode: [mode: IGameMode]; }>();

const count = ref(0);

function selectMode(mode: IGameMode) {
  emit('onSelectGameMode', mode);
}

</script>

<template>
  <ul class="list-none flex justify-center gap-10">
    <li
      v-for="mode in listModes"
      :key="mode.title"
      @click="selectMode(mode)"
      class="mode-game-item"
    >
      <p>{{ mode.title }}</p>
      <p class="text-xl">{{ mode.rank }}</p>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.mode-game-item {
  width: 150px;
  height: 150px;
  border: 1px solid #ee9d9d;
  border-radius: 20px;
  padding-top: 30px;
  transition: all .3s;
  cursor: pointer;

  &:hover {
    background-color: #ee9d9d;
    color: #7e405f;
  }
}
</style>
