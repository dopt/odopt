<script setup lang="ts">
import { type ChecklistItem } from '@dopt/vue';
import RichText, { Children } from '@dopt/html-rich-text';

const { completed, title, body, onSkip } = defineProps<{
  completed?: boolean | null;
  title?: string | null;
  body?: Children | null;
  onSkip?: () => void;
}>();
</script>

<template>
  <li
    class="checklist__item"
    :class="completed ? 'checklist__item--complete' : ''"
  >
    <div class="checklist__item-icon">
      <svg
        v-if="completed"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
          strokeWidth="0"
          fill="currentColor"
        ></path>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95"></path>
        <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44"></path>
        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path>
        <path d="M8.56 20.31a9 9 0 0 0 3.44 .69"></path>
        <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95"></path>
        <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44"></path>
        <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92"></path>
        <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69"></path>
      </svg>
    </div>
    <div class="checklist__item-content">
      <h2 class="checklist__item-title">{{ title }}</h2>
      <div class="checklist__item-body">
        <div v-html="RichText({ content: body })"></div>
      </div>
      <div><slot></slot></div>
    </div>
    <button
      v-if="!completed"
      class="checklist__item-skip"
      @click="() => onSkip && onSkip()"
    >
      Skip
    </button>
  </li>
</template>

<style>
.checklist__item {
  display: flex;
  gap: 12px;
  align-items: start;
  padding: 16px 8px;
  border-bottom: 2px solid #e9ecef;
}

.checklist__item:first-child {
  padding-top: 0;
}

.checklist__item--complete .checklist__item-icon {
  color: #22b8cf;
}

.checklist__item-content {
  display: grid;
  gap: 8px;
  flex-grow: 1;
}

.checklist__item--complete .checklist__item-content {
  color: #868e96;
}

.checklist__item-title {
  margin: 0;
}

.checklist__item--complete .checklist__item-title {
  text-decoration-line: line-through;
  text-decoration-style: wavy;
  text-decoration-color: #22b8cf;
}

.checklist__item-skip {
  align-self: center;
  font-size: 1rem;
  color: #22b8cf;
  padding: 0;
  border: 0;
  background: transparent;
  transition: color 200ms ease;
}

.checklist__item-skip:hover {
  color: #0c8599;
}
</style>
