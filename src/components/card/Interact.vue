<script setup lang="ts">
import { ICard } from '@core/interfaces/model/Card';
import { RATIO_OF_HEIGHT_AND_WIDTH } from '../../core/constants/game';

const prop = defineProps<{
  card: ICard;
  isNotAllowFlipping: boolean,
  widthOfEachCard: number;
}>();

const emit = defineEmits<{ onFlipCard: [card: ICard]; }>();

function flipCardHandler() {
  if (prop.isNotAllowFlipping) return;
  prop.card.isFlipped = true;
  emit('onFlipCard', prop.card);
}

</script>

<template>
  <div
    class="flip-card"
    :style="{
      width: widthOfEachCard + 'px',
      height: widthOfEachCard * RATIO_OF_HEIGHT_AND_WIDTH + 'px'
    }"
  >
    <div
      class="flip-card__inner"
      :class="{ 'flipped-card': card.isFlipped }"
    >
      <div class="flip-card--front">
        <img
          :src="card.url"
          alt="card-front"
          width="80%"
        />
      </div>
      <div
        class="flip-card--back"
        @click="flipCardHandler"
      >
        <img
          src="/src/assets/images/icon_back.png"
          alt="card-back"
          width="40%"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.flip-card {
  background-color: var(--bg-color);
  border-radius: 15px;
  position: relative;
  perspective: 1000px;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.flip-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  box-shadow: 0 3px 18px 3px rgba(0, 0, 0, 0.2);
  transform: rotateY(180deg);
}

.flip-card--front,
.flip-card--back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
}

.flip-card--front {
  background-color: var(--content-color);
}

.flip-card--back {
  background-color: var(--bg-color);
  transform: rotateY(180deg);
  cursor: pointer;
}

.flipped-card {
  transform: rotateY(0deg);
}
</style>
