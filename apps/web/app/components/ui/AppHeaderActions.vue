<template>
  <div class="flex items-center gap-1">
    <UiThemeToggle />

    <UTooltip
      text="Open on GitHub"
      :kbds="['meta', 'G']"
    >
      <UButton
        color="neutral"
        variant="ghost"
        to="https://github.com/nodewave-ea"
        target="_blank"
        icon="i-line-md-github-loop"
        aria-label="Open GitHub repository"
      />
    </UTooltip>
  </div>
</template>
