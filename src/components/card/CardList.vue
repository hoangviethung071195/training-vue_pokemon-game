<script setup lang="ts">
import { ICard } from '@core/interfaces/model/Card';
import { IGameMode } from '@core/interfaces/model/GameMode';
import { onMounted, ref } from 'vue';
import { shuffleArray } from '../../core/utils/array';
import CardItem from './CardItem.vue';
import { cloneDeep } from 'lodash';

const prop = defineProps<{ gameMode: IGameMode; }>();

const displayedCard = ref<ICard[]>([]);

const flipedCard = ref<ICard[]>([]);

const listCard = Array(64).fill(null).map((_, i) => ({
  url: `/src/assets/images/${i + 1}.png`,
}));

onMounted(() => {
  const { numberOfHorizontalItems, numberOfVerticalItems } = prop.gameMode;
  const totalCards = numberOfHorizontalItems * numberOfVerticalItems;
  const shuffleCards = shuffleArray(listCard.slice(0, totalCards / 2));
  displayedCard.value = shuffleCards.concat(cloneDeep(shuffleCards)).map((card, index) => ({
    ...card,
    index
  }));

});

function flipCardHandler(card: ICard) {
  flipedCard.value.push(card);
  const maxFlipedCard = 2;
  if (flipedCard.value.length === maxFlipedCard) {
    if (card.url === flipedCard.value[0].url) {
      flipedCard.value = [];
    } else {
      setTimeout(() => {
        flipedCard.value.forEach(card => card.isFlipped = false);
        flipedCard.value = [];
      }, 800);
    }
  }
}

</script>

<template>
  <div
    :style="{
      display: 'grid',
      justifyContent: 'center',
      gridTemplateColumns: `repeat(${gameMode.numberOfHorizontalItems}, 170px)`,
      rowGap: '20px',
      justifyItems: 'center'
    }"
    class="my-10"
  >
    <CardItem
      v-for="cart in displayedCard"
      :card="cart"
      @on-flip-card="flipCardHandler"
    />
  </div>
</template>

<style scoped></style>
