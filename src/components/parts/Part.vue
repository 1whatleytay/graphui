<template>
  <TextPart
      :part="part"
      :index="index"
      :context="context"
      :class="style"
      @click.native.stop="context.selected = part"
      v-if="part.type === 'text'" />
  <ViewPart
      :part="part"
      :index="index"
      :context="context"
      :class="style"
      @click.native.stop="context.selected = part"
      v-else-if="part.type === 'view'" />
  <ScenePart
      :part="part"
      :index="index"
      :context="context"
      :class="style"
      @click.native.stop="context.selected = part"
      v-else-if="part.type === 'scene'" />
  <ImagePart
      :part="part"
      :index="index"
      :context="context"
      :class="style"
      @click.native.stop="context.selected = part"
      v-else-if="part.type === 'image'" />
  <IteratorPart
      :part="part"
      :index="index"
      :context="context"
      :class="style"
      @click.native.stop="context.selected = part"
      v-else-if="part.type === 'iterator'" />
</template>

<script>
// Components
import TextPart from '@/components/parts/TextPart'
import ViewPart from '@/components/parts/ViewPart'
import ScenePart from '@/components/parts/ScenePart'
import ImagePart from '@/components/parts/ImagePart'
import IteratorPart from '@/components/parts/IteratorPart'

// Scripts
import { buildClasses } from '@/scripts/buildClasses'

export default {
  name: 'Part',

  props: ['part', 'index', 'context'],

  components: {
    TextPart,
    ViewPart,
    ScenePart,
    ImagePart,
    IteratorPart
  },

  computed: {
    style() {
      return (this.context.playing ? '' : 'cursor-pointer ')
        + ((!this.context.playing && this.context.selected === this.part) ? 'opacity-75 ' : '')
        + buildClasses(this.part.classes)
    }
  }
}
</script>
