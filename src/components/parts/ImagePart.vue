<template>
  <img :src="content" alt="Image" />
</template>

<script>
export default {
  name: 'ImagePart',

  props: ['part', 'index', 'context'],

  computed: {
    content() {
      if ((typeof this.part.content === 'object')) {
        let data = this.context.data[this.part.content.id]

        for (const k of this.index) {
          data = data[k]
        }

        if (this.context.playing && data !== undefined) {
          return data
        }

        return '/guineapig.webp'
      }

      return this.part.content
    }
  }
}
</script>
