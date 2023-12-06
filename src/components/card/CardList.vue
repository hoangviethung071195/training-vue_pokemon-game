<script setup lang="ts">
import { ICard } from '@core/interfaces/model/Card'
import { IGameMode } from '@core/interfaces/model/GameMode'
import { onMounted, ref } from 'vue'
import { GAME_MODE } from '../../core/constants/game'
import { shuffleArray } from '../../core/utils/array'
import CardItem from './Interact.vue'
import { NUMBER_OF_DUPLICATE_CARDS, MAX_ALLOWED_FLIPPED_CARDS, FLIPPING_TIME, TOTAL_NUMBER_OF_CARDS, CARD_SCREEN_WIDTH_IN_PIXEL } from '../../core/constants/game'

const { gameMode } = withDefaults(defineProps<{ gameMode?: IGameMode }>(), { gameMode: () => GAME_MODE[0] })

const emit = defineEmits<{ onEndGame: [] }>()

const displayedCards = ref<ICard[]>([])

const flippedCard = ref<ICard[]>([])

const isNotAllowFlipping = ref(false)

const widthOfEachCard = CARD_SCREEN_WIDTH_IN_PIXEL / gameMode.numberOfHorizontalItems

const listCards: ICard[] =
  Array(TOTAL_NUMBER_OF_CARDS)
    .fill(null)
    .map((_, i) => ({
      url: `/src/assets/images/${i + 1}.png`,
      index: i
    }))

const cardStyle = {
  gridTemplateColumns: `repeat(${gameMode.numberOfHorizontalItems}, ${widthOfEachCard
    }px)`,
  width: `${CARD_SCREEN_WIDTH_IN_PIXEL + gameMode.numberOfHorizontalItems * 20}'px'`,
}

onMounted(() => {
  loadDisplayedCards()
})

function loadDisplayedCards() {
  const { numberOfHorizontalItems, numberOfVerticalItems } = gameMode
  const totalCards = numberOfHorizontalItems * numberOfVerticalItems
  const numberOfUniqCards = totalCards / NUMBER_OF_DUPLICATE_CARDS;
  const uniqCards = listCards.slice(0, numberOfUniqCards)

  displayedCards.value = shuffleArray(
    [...uniqCards, ...uniqCards]
      .map((card, index) => ({
        ...card,
        index,
      }))
  )
}

function processAfterNotAllowFlippingCards() {
  flippedCard.value = []
  isNotAllowFlipping.value = false
}

function flipCardHandler(card: ICard) {
  flippedCard.value.push(card)

  if (flippedCard.value.length === MAX_ALLOWED_FLIPPED_CARDS) {
    isNotAllowFlipping.value = true
    const isCorrectCard = flippedCard.value.every(c => c.url === card.url)
    if (isCorrectCard) {
      processAfterNotAllowFlippingCards()
      checkEndGame()
    } else {
      setTimeout(() => {
        flippedCard.value.forEach(card => card.isFlipped = false)
        processAfterNotAllowFlippingCards()
      }, FLIPPING_TIME)
    }
  } else {
    isNotAllowFlipping.value = false
  }
}

function checkEndGame() {
  if (displayedCards.value.every(c => c.isFlipped)) {
    emit('onEndGame');
  }
}
</script>

<template>
  <div class="list-cards" :style="cardStyle">
    <CardItem v-for="cart in displayedCards" :card="cart" :isNotAllowFlipping="isNotAllowFlipping"
      :widthOfEachCard="widthOfEachCard" @on-flip-card="flipCardHandler" />
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
