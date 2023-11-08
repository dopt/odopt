<script setup lang="ts">
import RichText from '@dopt/html-rich-text';
import { useModal } from '@dopt/vue';

const { id } = defineProps<{
  id: string;
}>();

const { active, title, body, dismiss, completeLabel } = useModal(id);
</script>

<template>
  <dialog class="modal" :open="active">
    <section class="modal__content">
      <header>
        <h1 class="modal__title">{{ title }}</h1>
      </header>
      <div class="modal__body" v-html="RichText({ content: body })"></div>
      <button class="modal__action" @click="() => dismiss()">
        {{ completeLabel }}
      </button>
    </section>
  </dialog>
</template>

<style>
.modal {
  width: 100%;
  max-width: 500px;
  color: #fff;
  padding: 24px;
  border: 1px solid #495057;
  border-radius: 12px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4), 0 16px 32px rgba(0, 0, 0, 0.4);
  background: #212529;
}

.modal__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal__title {
  font-size: 1.25rem;
  text-align: center;
  margin: 0;
}

.modal__action {
  display: inline-block;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
  border-radius: 8px;
  padding: 8px 12px;
  border: 1px solid #40c057;
  background: #37b24d;
  transition: background 200ms ease;
}

.modal__action:hover,
.modal__action:active,
.modal__action:focus {
  background: #2f9e44;
}
</style>
