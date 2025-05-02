<template>
  <div v-if="historyItem.type === 'system'">
    <p v-text="historyItem.content" />
  </div>
  <div v-else-if="historyItem.type === 'command'">
    <div class="flex gap-2">
      <span>$</span>
      <p>{{ historyItem.command }}</p>
    </div>
    <pre v-html="historyItem.content" />
    <br>
  </div>
  <div v-else>
    <div class="flex gap-2">
      <span>$</span>
      <p>{{ historyItem.command }}</p>
    </div>
    <WeatherDisplay v-if="historyItem.weather" :weather="historyItem.weather" />
    <div v-else>Failed to display weather forecast</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  historyItem: IHistory;
}>();
</script>
