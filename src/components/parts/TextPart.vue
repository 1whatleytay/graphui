<template>
  <div>
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'TextPart',

  props: ['part', 'context'],

  computed: {
    content() {
      if ((typeof this.part.content === 'object')) {
        const data = this.context.data[this.part.content.id]

        if (this.context.playing && data !== undefined) {
          return data
        }

        return `{ ${this.part.content.name} }`
      }

      console.log(this.part.content)
      return this.part.content
    }
  }
}
</script>
