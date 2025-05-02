<template>
  <form class="flex gap-2" @submit.prevent="handleSubmit">
    <label for="command" class="select-none">$</label>
    <input
      id="command"
      v-model="command"
      name="command"
      class="outline-none w-full"
      placeholder="Type a command..."
      autocomplete="off"
      autofocus
    >
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(["exec-command"]);

const command = ref<string>("");

const handleSubmit = () => {
  emit(
    "exec-command",
    command.value.split(" ").map((v) => v.trim())
  );
  command.value = "";
};
</script>
