<script setup lang="ts">
import { ICard } from 'src/core/interfaces/model/Card';
import { IGameMode } from 'src/core/interfaces/model/GameMode';
import { cloneDeep } from 'lodash';
import { onMounted, ref } from 'vue';
import {
  CARD_SCREEN_WIDTH_IN_PIXEL,
  FLIPPING_TIME_IN_MILI_SECOND,
  GAME_MODE,
  MAX_ALLOWED_FLIPPED_CARDS,
  NUMBER_OF_DUPLICATE_CARDS,
  TOTAL_NUMBER_OF_CARDS
} from 'src/core/constants/game';
import { shuffleArray } from 'src/core/utils/array';
import CardItem from 'src/components/card/Interact.vue';

const { gameMode } = withDefaults(defineProps<{ gameMode?: IGameMode; }>(), { gameMode: () => GAME_MODE[0] });

const emit = defineEmits<{ onEndGame: []; }>();

const displayedCards = ref<ICard[]>([]);

const flippedCard = ref<ICard[]>([]);

const isNotAllowFlipping = ref(false);

const widthOfEachCard = CARD_SCREEN_WIDTH_IN_PIXEL / gameMode.numberOfHorizontalItems;

const listCards: ICard[] =
  Array(TOTAL_NUMBER_OF_CARDS)
    .fill(null)
    .map((_, i) => ({
      fileName: `${i + 1}.png`
    }));

const cardStyle = {
  gridTemplateColumns: `repeat(${gameMode.numberOfHorizontalItems}, ${widthOfEachCard}px)`,
  width: `${CARD_SCREEN_WIDTH_IN_PIXEL + gameMode.numberOfHorizontalItems * 20}'px'`,
};

onMounted(() => {
  loadDisplayedCards();
});

const loadDisplayedCards = () => {
  const { numberOfHorizontalItems, numberOfVerticalItems } = gameMode;
  const totalCards = numberOfHorizontalItems * numberOfVerticalItems;
  const numberOfUniqCards = totalCards / NUMBER_OF_DUPLICATE_CARDS;
  const uniqCards = listCards.slice(0, numberOfUniqCards);

  displayedCards.value = shuffleArray(uniqCards.concat(cloneDeep(uniqCards)));
};

const processAfterCheckingIsCorrectCard = () => {
  flippedCard.value = [];
  isNotAllowFlipping.value = false;
};

const flipCardHandler = (card: ICard) => {
  flippedCard.value.push(card);

  if (flippedCard.value.length === MAX_ALLOWED_FLIPPED_CARDS) {
    isNotAllowFlipping.value = true;
    const isCorrectCard = flippedCard.value.every(c => c.fileName === card.fileName);
    if (isCorrectCard) {
      processAfterCheckingIsCorrectCard();
      setTimeout(() => {
        checkEndGame();
      }, FLIPPING_TIME_IN_MILI_SECOND);
    } else {
      setTimeout(() => {
        flippedCard.value.forEach(card => card.isFlipped = false);
        processAfterCheckingIsCorrectCard();
      }, FLIPPING_TIME_IN_MILI_SECOND);
    }
  } else {
    isNotAllowFlipping.value = false;
  }
};

const checkEndGame = () => {
  if (displayedCards.value.every(c => c.isFlipped)) {
    emit('onEndGame');
  }
};

</script>

<template>
  <div
    class="list-cards"
    :style="cardStyle"
  >
    <CardItem
      v-for="(card, i) in displayedCards"
      :key="i"
      :card="card"
      :isNotAllowFlipping="isNotAllowFlipping"
      :widthOfEachCard="widthOfEachCard"
      @on-flip-card="flipCardHandler"
    />
  </div>
</template>

<style scoped lang="postcss">
.list-cards {
  display: grid;
  justify-content: center;
  justify-items: center;
  gap: 20px;
}
</style>
