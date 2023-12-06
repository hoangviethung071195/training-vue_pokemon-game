<script setup lang="ts">
import { ref } from 'vue';
import { IGameMode } from '../core/interfaces/model/GameMode';
import ModeGame from './ModeGame.vue';
import Result from './Result.vue';
import CardList from './card/CardList.vue';

const gameMode = ref<IGameMode>();
const completionTime = ref(0)
const startTime = ref(0)

function selectGameModehandler(mode: IGameMode) {
  gameMode.value = mode;
  startTime.value = Date.now()
}

function resetGameHandler() {
  startTime.value = Date.now();
  completionTime.value = 0
}

function endGameHandler() {
  const miliSecondToSecond = 1000;
  completionTime.value = Math.round((Date.now() - startTime.value) / miliSecondToSecond);
}

</script>

<template>
  <main class="main">
    <div v-if="!startTime && !completionTime" class="game-menu">
      <h1 class="game-title">POKE MEMORIES</h1>
      <p>Select mode to start game</p>
      <ModeGame @onSelectGameMode="selectGameModehandler" class="mt-5" />
    </div>

    <template v-if="startTime && !completionTime">
      <CardList :gameMode="gameMode" @on-end-game="endGameHandler" />
    </template>

    <Result v-if="completionTime" :completionTime="completionTime" @on-reset-game="resetGameHandler" />
  </main>
</template>

<style scoped lang="postcss">
.main {
  color: var(--content-color);
  height: auto;
  min-height: 100%;
  display: flex;
  justify-content: center;
  padding: 50px 0;
  align-items: center;

  .game-title {
    font-size: 4.5rem;
    font-weight: 600;
  }
}
</style>
