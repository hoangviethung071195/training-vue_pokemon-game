<script setup lang="ts">
import { IGameMode } from 'src/core/interfaces/model/GameMode';
import { GAME_MODE } from 'src/core/constants/game';

const emit = defineEmits<{ onSelectGameMode: [mode: IGameMode]; }>();

const selectMode = (mode: IGameMode) => {
  emit('onSelectGameMode', mode);
};

</script>

<template>
  <ul class="mode-game">
    <li
      v-for="mode in GAME_MODE"
      :key="mode.rank"
      @click="selectMode(mode)"
      class="mode-game__item"
    >
      <p>{{ mode.numberOfHorizontalItems + 'x' + mode.numberOfVerticalItems }}</p>
      <p class="text-xl">{{ mode.rank }}</p>
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.mode-game {
  display: flex;
  justify-content: center;
  gap: 30px;

  .mode-game__item {
    width: 150px;
    height: 150px;
    border: 1px solid var(--content-color);
    border-radius: 20px;
    padding-top: 30px;
    transition: all .3s;
    cursor: pointer;

    &:hover {
      background-color: var(--content-color);
      color: var(--bg-color);
    }
  }
}
</style>
