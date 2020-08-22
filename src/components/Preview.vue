<template>
  <div class="p-4">
    <Part v-for="(part, index) of tree" :key="index" :part="part" />
  </div>
</template>

<script>
import Part from '@/components/parts/Part'

export default {
  name: 'Preview',

  props: ['tree'],

  components: { Part }
}
</script>