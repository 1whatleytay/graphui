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
        const data = this.context.playing ? this.context.data[this.part.content.id] : null

        console.log(data || this.part.content.name)

        return data || this.part.content.name
      }

      console.log(this.part.content)
      return this.part.content
    }
  }
}
</script>
