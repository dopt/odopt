<script setup lang="ts">
import RichText from '@dopt/html-rich-text';
import { useHintsItem } from '@dopt/vue';
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
} from 'radix-vue';

const { id, position } = defineProps<{
  id: string;
  position: 'nw' | 'ne' | 'se' | 'sw';
}>();

const { title, body, complete, completeLabel, active } = useHintsItem(id);
</script>

<template>
  <PopoverRoot v-if="active">
    <PopoverTrigger :as-child="true">
      <div
        class="hotspot__trigger"
        :class="'hotspot__position-' + position"
      ></div>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :avoid-collisions="true"
        :align="'start'"
        side="right"
        :side-offset="4"
        class="hotspot__popover"
      >
        <div class="hotspot__content">
          <div class="hotspot__title">
            {{ title }}
          </div>
          <div class="hotspot__body">
            <div v-html="RichText({ content: body })"></div>
          </div>
          <button class="hotspot__action" @click="() => complete()">
            <span class="hotspot__action-label">{{ completeLabel }}</span>
          </button>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style>
.hotspot__popover {
  background-color: white;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.hotspot__trigger {
  position: absolute;
  margin: 10px;
  z-index: 2;
  background: #ff922b;
  border-radius: 100%;
  padding: 0px;
  width: 12px;
  height: 12px;
}

.hotspot__position-nw {
  top: 0;
  left: 0;
}

.hotspot__position-ne {
  top: 0;
  right: 0;
}

.hotspot__position-se {
  bottom: 0;
  right: 0;
}

.hotspot__position-sw {
  bottom: 0;
  left: 0;
}

.hotspot__content {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #adb5bd;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  gap: 10px;
  padding: 16px;
  width: 200px;
}

.hotspot__title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  font-weight: 600;
  font-size: 16px;
}

button {
  all: unset;
  cursor: pointer;
}

.hotspot__action {
  height: 40px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  text-align: center;
  background: #ff922b;
}

.hotspot__action-label {
  padding: 8px 12px;
}
</style>
