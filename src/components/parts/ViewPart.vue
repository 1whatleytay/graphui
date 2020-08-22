<template>
  <div>
    <Part v-for="(item, index) of part.content" :key="index" :part="item" />
  </div>
</template>

<script>
export default {
  name: 'ViewPart',

  props: ['part'],

  components: {
    Part: () => import('@/components/parts/Part')
  }
}
</script>
