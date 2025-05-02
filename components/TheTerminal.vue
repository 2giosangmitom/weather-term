<template>
  <main class="h-screen flex flex-col">
    <!-- Header bar -->
    <header class="border-b bg-zinc-900 p-2 shrink-0">
      <div class="flex justify-between items-center">
        <div class="flex gap-2">
          <div class="w-3 h-3 bg-error rounded-full" />
          <div class="w-3 h-3 bg-warning rounded-full" />
          <div class="w-3 h-3 bg-success rounded-full" />
        </div>
        <h1>Weather Term</h1>
        <UTooltip text="Clear screen" arrow>
          <UButton
            icon="icon-park-outline:clear"
            variant="ghost"
            color="neutral"
            size="md"
            class="cursor-pointer"
            @click="clearHistory"
          />
        </UTooltip>
      </div>
    </header>

    <!-- Terminal content area -->
    <div class="flex-1 overflow-y-auto p-3">
      <TheHistory v-for="item of history" :key="item.id" :history-item="item" />

      <!-- Command input -->
      <CommandInput @exec-command="handleCommand" />
    </div>
  </main>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

const history = ref<IHistory[]>([
  {
    id: nanoid(),
    type: "system",
    content: `Welcome to WeatherTerm v${appConfig.version}`,
  },
  {
    id: nanoid(),
    type: "system",
    content: `Type "help" for available commands.`,
  },
]);

const clearHistory = () => {
  history.value = [];
};

const handleCommand = async (args: string[]) => {
  if (args[0] === "") {
    history.value.push({ id: nanoid(), type: "system", content: "$" });
    return;
  }

  try {
    validateCommand(args[0]);
    await execCommand(args[0], history, args.slice(1));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    history.value.push({
      id: nanoid(),
      type: "command",
      content: message,
      command: args.join(" "),
    });
  }
};
</script>
