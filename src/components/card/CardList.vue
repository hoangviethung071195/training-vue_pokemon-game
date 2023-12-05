<script setup lang="ts">
import { IGameMode } from 'src/core/interfaces/model/GameMode';
import { ref } from 'vue'

defineProps<{ ListGame: IGameMode }>()

const count = ref(0)
</script>

<template>
  <!-- <ul v-for="cell in"> -->
    <li></li>
  <!-- </ul> -->
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
