<template>
  <div>
    <Part
        v-for="(item, index) of part.content"
        :key="index"
        :part="item"
        :context="playing"/>
  </div>
</template>

<script>
export default {
  name: 'ViewPart',

  props: ['part', 'context'],

  components: {
    Part: () => import('@/components/parts/Part')
  }
}
</script>
