<template>
  <img :src="content" :alt="Image" />
</template>

<script>
export default {
  name: 'ImagePart',

  props: ['part', 'context'],

  computed: {
    content() {
      if ((typeof this.part.content === 'object')) {
        const data = this.context.playing ? this.context.data[this.part.content.id] : null

        return data || this.part.content.name
      }

      return this.part.content
    }
  }
}
</script>
