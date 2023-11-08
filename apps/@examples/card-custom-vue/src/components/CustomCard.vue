<script setup lang="ts">
import RichText from '@dopt/html-rich-text';
import CustomCardButton from './CustomCardButton.vue';
import { useCard } from '@dopt/vue';

const { id } = defineProps<{
  id: string;
}>();

const { active, title, body, dismiss, complete, dismissLabel, completeLabel } =
  useCard(id);
</script>

<template>
  <div v-if="active">
    <section class="card">
      <header>
        <h1 class="card__title">{{ title ?? 'Custom Card' }}</h1>
      </header>
      <div class="card__body">
        <div class="dopt-rich-text" v-html="RichText({ content: body })"></div>
        <div class="card__actions">
          <CustomCardButton variant="minimal" @click="() => dismiss()">
            {{ dismissLabel ?? 'Dismiss' }}
          </CustomCardButton>
          <CustomCardButton @click="() => complete()">{{
            completeLabel ?? 'Complete'
          }}</CustomCardButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.card {
  display: flex;
  color: #fff;
  padding: 16px;
  border: 1px solid #495057;
  border-radius: 12px;
  flex-direction: column;
  gap: 12px;
  background: #212529;
}

.card__title {
  font-size: 1rem;
  margin: 0;
}

.card__body .dopt-rich-text {
  display: flex;
  gap: 16px;
}

.card__body .dopt-rich-text__video {
  border-radius: 8px;
  overflow: hidden;
}

.card__body .dopt-rich-text__paragraph {
  margin: 0;
}

.card__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
