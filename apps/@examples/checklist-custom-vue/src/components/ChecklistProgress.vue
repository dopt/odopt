<script setup lang="ts">
import { ref } from 'vue';

const { value, max } = defineProps<{
  value: number;
  max: number;
}>();

const pathRef = ref<SVGCircleElement | null>(null);

const getMessage = (value: number, max: number) => {
  const percentage = (value / max) * 100;

  if (percentage == 0) {
    return `🚀 Let's get rolling!`;
  }

  if (percentage <= 25) {
    return '👏 Off to a great start!';
  }

  if (percentage == 50) {
    return '✨ Halfway there!';
  }

  if (percentage < 100) {
    return '🙌 Almost done!';
  }

  if (percentage == 100) {
    return '🎉 All done!';
  }
};

const getOffset = (value: number, max: number) => {
  const pathLength = pathRef.value ? pathRef.value.getTotalLength() : 0;
  return pathLength - (value / max) * pathLength || 0;
};

const getRemaining = (value: number, max: number) => max - value;
</script>

<template>
  <div class="checklist__progress">
    <div class="checklist__progress-content">
      <p class="checklist__progress-content-status">
        {{
          getRemaining(value, max) == 0
            ? 'Tasks complete'
            : `${getRemaining(value, max)} task${
                getRemaining(value, max) == 1 ? '' : 's'
              } left`
        }}
      </p>
      <p class="checklist__progress-content-message">
        {{ getMessage(value, max) }}
      </p>
    </div>
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="transparent"
      class="checklist__progress-meter"
    >
      <circle
        cx="32"
        cy="32"
        r="24"
        stroke-width="12"
        stroke="#e9ecef"
      ></circle>
      <circle
        ref="pathRef"
        cx="32"
        cy="32"
        r="24"
        stroke-width="12"
        :stroke-dasharray="pathRef ? pathRef.getTotalLength() : 0"
        stroke-linecap="round"
        stroke="#22b8cf"
        class="checklist__progress-meter-fill"
        :style="{ strokeDashoffset: getOffset(value, max) }"
      ></circle>
    </svg>
  </div>
</template>

<style>
.checklist__progress {
  display: flex;
  gap: 12px;
}

.checklist__progress-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.checklist__progress-content-status,
.checklist__progress-content-message {
  margin: 0;
  text-align: right;
}

.checklist__progress-content-status {
  font-weight: bold;
}

.checklist__progress-content-message {
  font-size: 0.75rem;
}

.checklist__progress-meter {
  rotate: -90deg;
}

.checklist__progress-meter-fill {
  transition: stroke-dashoffset 200ms ease;
}
</style>
