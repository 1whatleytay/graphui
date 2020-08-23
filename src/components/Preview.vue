<template>
  <div class="p-4">
    <Part
        v-for="(part, index) of tree"
        :key="index"
        :index="[]"
        :part="part"
        :context="context" />
  </div>
</template>

<script>
import Part from '@/components/parts/Part'

export default {
  name: 'Preview',

  props: ['tree', 'context'],

  components: { Part }
}
</script>