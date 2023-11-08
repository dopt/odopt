<script setup lang="ts">
import ChecklistList from '../components/ChecklistList.vue';
import ChecklistItem from '../components/ChecklistItem.vue';

import { useChecklist, useChecklistItem } from '@dopt/vue';

import { ref } from 'vue';

const emailInput = ref<HTMLInputElement | null>(null);

// Access the checklist data from the checklist block in the flow
const {
  size: checklistSize,
  title: checklistTitle,
  body: checklistBody,
  count,
} = useChecklist('custom-checklist-component.cool-points-listen');

// Access the data from the checklist's individual steps from the checklist block in the flow
const {
  skipped: skipped1,
  skip: skip1,
  done: done1,
  complete: complete1,
  title: title1,
  body: body1,
} = useChecklistItem('custom-checklist-component.rude-heads-flash');

const {
  skipped: skipped2,
  skip: skip2,
  done: done2,
  complete: complete2,
  title: title2,
  body: body2,
} = useChecklistItem('custom-checklist-component.common-bugs-marry');

const {
  skipped: skipped3,
  skip: skip3,
  done: done3,
  complete: complete3,
  title: title3,
  body: body3,
} = useChecklistItem('custom-checklist-component.curvy-sites-feel');
</script>

<template>
  <div class="home">
    <ChecklistList
      :title="checklistTitle"
      :body="checklistBody"
      :value="count('done')"
      :max="checklistSize"
    >
      <template #default>
        <ChecklistItem
          :completed="done1"
          :title="title1"
          :body="body1"
          :on-skip="() => skip1()"
        >
          <button
            class="button"
            :disabled="skipped1"
            @click="() => complete1()"
          >
            Click me
          </button>
        </ChecklistItem>
        <ChecklistItem
          :completed="done2"
          :title="title2"
          :body="body2"
          :on-skip="() => skip2()"
        >
          <select
            class="select"
            :disabled="skipped2"
            @change="() => complete2()"
          >
            <option value="">Select a flavor</option>
            <option value="vanilla">🍨 Vanilla</option>
            <option value="chocolate">🍫 Chocolate</option>
            <option value="strawberry">🍓 Strawberry</option>
          </select>
        </ChecklistItem>
        <ChecklistItem
          :completed="done3"
          :title="title3"
          :body="body3"
          :on-skip="() => skip3()"
        >
          <input
            ref="emailInput"
            type="email"
            pattern=".+@.+\..+"
            required
            class="input"
            :disabled="skipped3"
            @change="
              () => {
                if (emailInput?.validity.valid) {
                  complete3();
                }
              }
            "
          />
        </ChecklistItem>
      </template>
    </ChecklistList>
  </div>
</template>

<style>
.home {
  max-width: 980px;
  padding: 0 24px;
  margin: 64px auto;
}

.button {
  font-size: 1rem;
  line-height: 1.5;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 12px;
  background: #22b8cf;
  outline: none;
  transition: background 200ms ease;
}

.button:not([disabled]):hover,
.button:focus-visible {
  background: #0c8599;
}

.input {
  font-size: 1rem;
  line-height: 1.5;
  padding: 8px 12px;
  border: 2px solid #adb5bd;
  border-radius: 8px;
  background: #fff;
  outline: none;
  transition: border-color 200ms ease;
}

.input:focus-visible {
  border-color: #22b8cf;
}

.select {
  appearance: none;
  font-size: 1rem;
  line-height: 1.5;
  color: #000;
  padding: 8px 42px 8px 12px;
  border: 2px solid #adb5bd;
  border-radius: 8px;
  background-color: #fff;
  background-image: url('/chevron-down.svg');
  background-repeat: no-repeat;
  background-position: center right 12px;
  outline: none;
  transition: border-color 200ms ease;
}

.select:focus-visible {
  border-color: #22b8cf;
}

.button[disabled],
.input[disabled],
.select[disabled] {
  opacity: 0.4;
}
</style>
