<template>
  <div>
    <div class="text-lg uppercase font-medium">
      Editor
    </div>

    <div class="mt-4">
      <div v-if="selected">
<!--        <div class="text-sm uppercase font-light">-->
<!--          Editing: <span class="font-bold">{{ getPartName(selected) }}</span>-->
<!--        </div>-->

        <TextEditor
            v-model="selected.content"
            meta="Content"
            :context="context"
            v-if="options.includes('content')"/>

        <TextAlignEditor
            v-model="selected.classes.textAlign"
            meta="Text Align"
            v-if="options.includes('textAlign')" />

        <SliderEditor
            v-model="selected.classes.borderSize"
            meta="Border Size"
            :allowed="[0, 1, 2, 4]"
            v-if="options.includes('borderSize')" />
        <SliderEditor
            v-model="selected.classes.rounded"
            meta="Rounded"
            :allowed="[0, 1, 2, 3, 4, 5]"
            v-if="options.includes('rounded')"/>

        <ColorEditor
            v-model="selected.classes.backgroundColor"
            meta="Background Color"
            v-if="options.includes('backgroundColor')" />
        <ColorEditor
            v-model="selected.classes.textColor"
            meta="Text Color"
            v-if="options.includes('textColor')" />
        <ColorEditor
            v-model="selected.classes.borderColor"
            meta="Border Color"
            :class="{ 'opacity-50 pointer-events-none': !selected.classes.borderSize }"
            v-if="options.includes('borderColor')" />
      </div>

      <div class="text-center text-gray-700" v-else>
        Select something to get started.
      </div>
    </div>
  </div>
</template>

<script>
// Components
import TextEditor from '@/components/editors/TextEditor'
import ColorEditor from '@/components/editors/ColorEditor'
import SliderEditor from '@/components/editors/SliderEditor'
import TextAlignEditor from '@/components/editors/TextAlignEditor'

// Scripts
import { getPartName } from '@/scripts/getPartName'
import { editorOptions } from '@/scripts/editorOptions'

export default {
  name: 'Editor',

  props: ['context'],

  components: {
    TextEditor,
    ColorEditor,
    SliderEditor,
    TextAlignEditor
  },

  computed: {
    selected() {
      return this.context.selected
    },

    options() {
      return editorOptions[this.context.selected.type]
    }
  },

  methods: { getPartName }
}
</script>
