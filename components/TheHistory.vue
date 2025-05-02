<template>
  <div v-if="historyItem.type === 'system'">
    <p v-text="historyItem.content" />
  </div>
  <div v-else-if="historyItem.type === 'command'">
    <div class="flex gap-2">
      <span>$</span>
      <p>{{ historyItem.command }}</p>
    </div>
    <p v-text="historyItem.content" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  historyItem: IHistory;
}>();
</script>
