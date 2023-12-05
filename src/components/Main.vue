<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import ModeList from './ModeGame/ModeList.vue';
import { IGameMode } from '../core/interfaces/model/GameMode';
import CardList from './card/CardList.vue';

defineProps<{ msg: string; }>();

const gameMode = ref<IGameMode>();

const modes: IGameMode[] = [
  {
    title: '4x4',
    rank: 'Easy',
    numberOfHorizontalItems: 4,
    numberOfVerticalItems: 4
  },
  {
    title: '6x6',
    rank: 'Normal',
    numberOfHorizontalItems: 6,
    numberOfVerticalItems: 6
  },
  {
    title: '8x8',
    rank: 'Hard',
    numberOfHorizontalItems: 8,
    numberOfVerticalItems: 8
  },
  {
    title: '10x10x',
    rank: 'Super Hard',
    numberOfHorizontalItems: 10,
    numberOfVerticalItems: 10
  }
];

function onSelectModehandler(mode: IGameMode) {
  gameMode.value = mode;
  console.log('onSelectModehandler');
}
const listCart = ref<IGameMode[]>([]);
onMounted(() => {
  listCart.value = [];
});
</script>

<template>
  <div class="main">
    <div
      v-if="!gameMode?.rank"
      class="game-menu"
    >
      <h1 class="game-title"> POKE MEMORIES </h1>
      <p> Select mode to start game </p>
      <ModeList
        :listModes="modes"
        @onSelectGameMode="onSelectModehandler"
        class="mt-5"
      />
    </div>

    <template v-if="gameMode?.rank">
      <CardList :gameMode="gameMode" />
    </template>

  </div>
</template>

<style scoped lang="postcss">
.main {
  color: #ee9d9d;
  height: 100%;

  .game-menu {
    margin: auto;
    padding-top: calc(50% - 500px);
  }

  .game-title {
    font-size: 4.5rem;
    font-weight: 600;
  }
}
</style>
