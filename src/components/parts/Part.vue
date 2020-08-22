<template>
  <TextPart
      :part="part"
      :context="context"
      :class="style"
      v-if="part.type === 'text'" />
  <ViewPart
      :part="part"
      :context="context"
      :class="style"
      v-else-if="part.type === 'view'" />
  <ScenePart
      :part="part"
      :context="context"
      :class="style"
      v-else-if="part.type === 'scene'" />
</template>

<script>
// Components
import TextPart from '@/components/parts/TextPart'
import ViewPart from '@/components/parts/ViewPart'
import ScenePart from '@/components/parts/ScenePart'

// Scripts
import { buildClasses } from '@/scripts/buildClasses'

export default {
  name: 'Part',

  props: ['part', 'context'],

  components: {
    TextPart,
    ViewPart,
    ScenePart
  },

  computed: {
    style() {
      return buildClasses(this.part.classes)
    }
  }
}
</script>
