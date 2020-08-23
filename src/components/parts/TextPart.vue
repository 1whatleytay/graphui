<template>
  <div>
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'TextPart',

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

        return `{ ${this.part.content.name} }`
      }

      console.log(this.part.content)
      return this.part.content
    }
  }
}
</script>
