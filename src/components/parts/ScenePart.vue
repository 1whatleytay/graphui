<template>
  <div class="flex items-center">
    <Part v-for="(item, index) of part.content" :key="index" :part="item" />
  </div>
</template>

<script>
export default {
  name: 'ScenePart',

  props: ['part'],

  components: {
    Part: () => import('@/components/parts/Part')
  }
}
</script>
