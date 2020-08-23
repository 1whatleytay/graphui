<template>
  <div v-if="context.playing">
    <!-- Too lazy to figure it out... -->
    <div v-for="(a, i) of new Array(context.data[part.query.id].length)" :key="i">
      <Part
          v-for="(item, j) of part.content"
          :key="j"
          :index="index.concat(i)"
          :part="item"
          :context="context" />
    </div>
  </div>
  <div v-else>
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
  name: 'IteratorPart',

  props: ['part', 'index', 'context'],

  components: {
    Part: () => import('@/components/parts/Part')
  }
}
</script>
