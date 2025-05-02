<template>
  <main class="border-b bg-zinc-900 p-2">
    <!-- Title bar -->
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <div class="w-3 h-3 bg-error rounded-full" />
        <div class="w-3 h-3 bg-warning rounded-full" />
        <div class="w-3 h-3 bg-success rounded-full" />
      </div>
      <p>Weather Term</p>
      <UTooltip text="Clear screen" arrow>
        <UButton
          icon="icon-park-outline:clear"
          variant="ghost"
          color="neutral"
          size="md"
          class="cursor-pointer"
        />
      </UTooltip>
    </div>
  </main>
</template>
