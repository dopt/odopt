<script setup lang="ts">
const { variant = 'primary' } = defineProps<{
  variant?: 'primary' | 'minimal';
}>();
</script>

<template>
  <button class="button" :class="`button--${variant}`">
    <slot></slot>
  </button>
</template>

<style>
.button {
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  color: #495057;
  border-radius: 8px;
  padding: 8px 12px;
  border: 1px solid #495057;
  background: transparent;
  transition: all 200ms ease;
}

.button:hover,
.button:active,
.button:focus {
  color: #fff;
  background: #495057;
}

.button--minimal {
  border-color: transparent;
}
</style>
