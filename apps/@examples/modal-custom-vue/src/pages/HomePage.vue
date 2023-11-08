<script setup lang="ts">
import CustomModal from '../components/CustomModal.vue';
import SkeletonBody from '../components/SkeletonBody.vue';
</script>

<template>
  <div class="home">
    <CustomModal id="custom-modal-component.tender-showers-smell"></CustomModal>
    <SkeletonBody></SkeletonBody>
  </div>
</template>

<style>
.home {
  max-width: 980px;
  padding: 0 24px;
  margin: 64px auto;
}
</style>
