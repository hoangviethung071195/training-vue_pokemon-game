<script setup lang="ts">
import { ICard } from '@core/interfaces/model/Card';
import { ref } from 'vue';

const prop = defineProps<{ card: ICard; }>();
const emit = defineEmits<{ onFlipCard: [fi: ICard]; }>();

function flipCardHandler() {
  prop.card.isFlipped = true;
  emit('onFlipCard', prop.card);
}

</script>

<template>
  <div
    class="flip-card"
    @click="flipCardHandler"
  >
    <div
      class="flip-card-inner"
      :class="{ 'flipped-card': card.isFlipped }"
    >
      <div class="flip-card-front">
        <img
          :src="card.url"
          alt="card-front"
          width="100"
          height="100"
        >
      </div>
      <div class="flip-card-back">
        <img
          src="/src/assets/images/icon_back.png"
          alt="card-back"
          width="50"
          height="50"
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.flip-card {
  width: 150px;
  height: 200px;
  background-color: #7e405f;
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

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  box-shadow: 0 3px 18px 3px rgba(0, 0, 0, .2);
  transform: rotateY(180deg);
}

.flipped-card {
  transform: rotateY(0deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
}

.flip-card-front {
  background-color: #ee9d9d;
}

.flip-card-back {
  background-color: #7e405f;
  color: white;
  transform: rotateY(180deg);
  cursor: pointer;
}
</style>
