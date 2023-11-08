<script setup lang="ts">
import SkeletonElement from '../components/SkeletonElement.vue';
import CustomHotspot from '../components/CustomHotspot.vue';
</script>

<template>
  <div class="home">
    <SkeletonElement>
      <CustomHotspot
        id="custom-hints-component.a"
        position="ne"
      ></CustomHotspot>
    </SkeletonElement>
    <SkeletonElement>
      <CustomHotspot
        id="custom-hints-component.b"
        position="se"
      ></CustomHotspot>
    </SkeletonElement>
    <SkeletonElement>
      <CustomHotspot
        id="custom-hints-component.c"
        position="se"
      ></CustomHotspot>
    </SkeletonElement>
  </div>
</template>

<style>
.home {
  display: flex;
  justify-content: center;
  gap: 100px;
}
</style>
