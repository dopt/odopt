<script setup lang="ts">
import TourItem from '../components/TourItem.vue';
</script>

<template>
  <div class="home">
    <TourItem id="custom-tour-component.pretty-books-vanish" position="left">
      <div class="phase">🌑</div>
    </TourItem>
    <TourItem id="custom-tour-component.breezy-queens-greet" position="left">
      <div class="phase">🌘</div>
    </TourItem>
    <TourItem id="custom-tour-component.smooth-doodles-double" position="right">
      <div class="phase">🌓</div>
    </TourItem>
    <TourItem id="custom-tour-component.eighty-flies-repeat" position="top">
      <div class="phase">🌔</div>
    </TourItem>
    <TourItem id="custom-tour-component.empty-banks-tell" position="bottom">
      <div class="phase">🌕</div>
    </TourItem>
    <TourItem id="custom-tour-component.tricky-toes-eat" position="left">
      <div class="phase">🌖</div>
    </TourItem>
    <TourItem id="custom-tour-component.cold-carrots-lay" position="right">
      <div class="phase">🌗</div>
    </TourItem>
    <TourItem id="custom-tour-component.fair-eyes-wave" position="top">
      <div class="phase">🌘</div>
    </TourItem>
  </div>
</template>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 980px;
  padding: 128px 24px;
  margin: 0 auto;
}

.phase {
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}
</style>
