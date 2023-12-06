<script setup lang="ts">

defineProps<{ completionTime: number }>()
const emit = defineEmits<{ onResetGame: [] }>()

function resetGameHandler() {
  emit('onResetGame')
}

</script>

<template>
  <section>
    <h2 class="text-7xl font-bold">✨ Congratulations ✨</h2>
    <h3 class="text-2xl my-3">🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓</h3>
    <h4 class="text-5xl">{{ completionTime }} seconds</h4>
    <button @click="resetGameHandler" class="my-5">Start Again</button>
    <p class="text-base">Connect with me</p>
    <div class="flex justify-center">
      <a href="#">
        <img src="https://img.icons8.com/color/48/000000/facebook.png" />
      </a>
      <a href="#">
        <img src="https://img.icons8.com/fluent/48/000000/twitter.png" />
      </a>
      <a href="#">
        <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" />
      </a>
      <a href="#">
        <img src="https://img.icons8.com/fluency/48/000000/gmail-new.png" />
      </a>
      <a href="#">
        <img src="https://img.icons8.com/color/48/000000/youtube-play.png" />
      </a>
    </div>
  </section>
</template>
