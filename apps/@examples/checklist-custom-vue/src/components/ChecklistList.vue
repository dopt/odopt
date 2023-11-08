<script setup lang="ts">
import RichText, { Children } from '@dopt/html-rich-text';
import ChecklistProgress from './ChecklistProgress.vue';

const { title, body, value, max } = defineProps<{
  title?: string | null;
  body?: Children | null;
  value: number;
  max: number;
}>();
</script>

<template>
  <section class="checklist">
    <header class="checklist__header">
      <div class="checklist__content">
        <h1 class="checklist__title">{{ title }}</h1>
        <div class="checklist__body">
          <div v-html="RichText({ content: body })"></div>
        </div>
      </div>
      <ChecklistProgress :value="value" :max="max" />
    </header>
    <ul class="checklist__items">
      <slot></slot>
    </ul>
  </section>
</template>

<style>
.checklist {
  display: grid;
  gap: 24px;
}

.checklist__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.checklist__title {
  margin: 0;
}

.checklist__items {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
