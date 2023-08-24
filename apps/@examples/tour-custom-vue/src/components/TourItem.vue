<script setup lang="ts">
import { Dopt, TourItem } from '@dopt/javascript';
import RichText from '@dopt/html-rich-text';
import { ref, Ref, inject, onBeforeUnmount } from 'vue';
import TourItemAction from './TourItemAction.vue';

const indicators = ['🌑', '🌘', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

const { id, position = 'bottom' } = defineProps<{
  id: TourItem['id'];
  position?: 'top' | 'right' | 'bottom' | 'left';
}>();

const dopt = inject<Ref<Dopt>>('dopt');

const state = ref<TourItem['state'] | undefined>();
const item = ref<TourItem | undefined>();
const unsubscribe = ref<(() => void) | undefined>();

/**
 * Once dopt is ready
 */
dopt?.value.initialized().then(() => {
  /**
   * Access the tourItem based on the id
   * passed into the component.
   */
  item.value = dopt.value.tourItem(id);

  /**
   * State is mutable, so we create a ref which updates
   * whenever the item's state updates.
   */
  state.value = item.value.state;
  unsubscribe.value = item.value.subscribe(({ state: updatedState }) => {
    state.value = updatedState;
  });
});

/**
 * Before unmount, we unsubscribe any subscriptions.
 */
onBeforeUnmount(() => {
  unsubscribe.value && unsubscribe.value();
});
</script>

<template>
  <div class="tour" :class="{ 'tour--active': item && state?.active }">
    <div class="tour__anchor"><slot></slot></div>
    <div
      v-if="item && state?.active"
      class="tour__popover"
      :data-position="position"
    >
      <header class="tour__popover-header">
        <h1 class="tour__popover-title">{{ item.title }}</h1>
      </header>
      <div
        class="tour__popover-body"
        v-html="RichText({ content: item.body })"
      ></div>
      <footer class="tour__popover-footer">
        <TourItemAction
          v-if="item.index !== 0"
          variant="secondary"
          @click="() => item?.back()"
        >
          {{ item.backLabel }}
        </TourItemAction>
        <TourItemAction @click="() => item?.next()">{{
          item.nextLabel
        }}</TourItemAction>
      </footer>
      <ul class="tour__popover-indicator">
        <li
          v-for="(indicator, i) in indicators"
          :key="indicator"
          class="tour__popover-indicator-item"
          :class="{ 'tour__popover-indicator-item--active': item.index == i }"
        >
          {{ indicator }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.tour {
  position: relative;
}

.tour--active {
  z-index: 1;
}

.tour__anchor {
  position: relative;
  padding: 16px;
  transition: scale 200ms ease-out;
}

.tour--active .tour__anchor {
  scale: 1.1;
}

.tour__anchor::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0);
  transition: box-shadow 500ms ease;
}

.tour--active .tour__anchor::after {
  z-index: 1;
  box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.8);
}

.tour__popover {
  position: absolute;
  z-index: 1;
  display: grid;
  width: 300px;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ced4da;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.tour__popover[data-position='top'] {
  top: 0;
  left: 50%;
  right: 50%;
  translate: -50% calc(-100% - 16px);
}

.tour__popover[data-position='right'] {
  top: 50%;
  right: 0;
  translate: calc(100% + 16px) -50%;
}

.tour__popover[data-position='bottom'] {
  bottom: 0;
  left: 50%;
  right: 50%;
  translate: -50% calc(100% + 16px);
}

.tour__popover[data-position='left'] {
  top: 50%;
  left: 0;
  translate: calc(-100% - 16px) -50%;
}

.tour__popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tour__popover-footer {
  display: flex;
  gap: 12px;
}

.tour__popover-title {
  font-size: 1.25rem;
  margin: 0;
}

.tour__popover-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tour__popover-indicator-item {
  opacity: 0.25;
}

.tour__popover-indicator-item--active {
  opacity: 1;
}
</style>
