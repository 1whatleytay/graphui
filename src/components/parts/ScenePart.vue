<template>
  <div class="flex items-center">
    <Part
        v-for="(item, i) of part.content"
        :key="i"
        :index="index"
        :part="item"
        :context="context" />
  </div>
</template>

<script>
export default {
  name: 'ScenePart',

  props: ['part', 'index', 'context'],

  components: {
    Part: () => import('@/components/parts/Part')
  }
}
</script>
