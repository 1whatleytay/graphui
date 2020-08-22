<template>
  <div class="flex items-center">
    <Part
        v-for="(item, index) of part.content"
        :key="index"
        :part="item"
        :context="context" />
  </div>
</template>

<script>
export default {
  name: 'ScenePart',

  props: ['part', 'context'],

  components: {
    Part: () => import('@/components/parts/Part')
  }
}
</script>
