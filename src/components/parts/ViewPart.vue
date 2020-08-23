<template>
  <div>
    <Part
        v-for="(item, i) of part.content"
        :key="i"
        :index="index"
        :part="item"
        :context="context"/>
  </div>
</template>

<script>
export default {
  name: 'ViewPart',

  props: ['part', 'index', 'context'],

  components: {
    Part: () => import('@/components/parts/Part')
  }
}
</script>
