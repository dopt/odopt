<script setup lang="ts">
import CustomCard from '../components/CustomCard.vue';
import SkeletonBody from '../components/SkeletonBody.vue';
import SkeletonHeader from '../components/SkeletonHeader.vue';
</script>

<template>
  <div class="home">
    <SkeletonHeader></SkeletonHeader>
    <CustomCard id="custom-card-component.small-rooms-allow"> </CustomCard>
    <SkeletonBody></SkeletonBody>
  </div>
</template>

<style>
.home {
  display: grid;
  max-width: 980px;
  gap: 24px;
  padding: 0 24px;
  margin: 64px auto;
}
</style>
