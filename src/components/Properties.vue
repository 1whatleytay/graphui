<template>
  <div class="p-4">
    <div class="flex justify-between mb-4 text-gray-700 border-b">
      <button
          @click="context.editorMode = 'editor'"
          class="p-2"
          :class="{ 'font-bold border-b-2 border-black': context.editorMode === 'editor' }">
        Editor
      </button>

      <button class="p-1" @click="$emit('play')">
        <Play class="w-8 h-8" />
      </button>

      <button
          @click="context.editorMode = 'queries'"
          class="p-2"
          :class="{ 'font-bold border-b-2 border-black': context.editorMode === 'queries' }">
        Queries
      </button>
    </div>

    <Editor
        :context="context"
        v-if="context.editorMode === 'editor'" />
    <Queries
        :query-info="context"
        v-else-if="context.editorMode === 'queries'" />
  </div>
</template>

<script>
// Icons
import Play from 'heroicons/outline/play.svg'

// Components
import Editor from '@/components/Editor'
import Queries from '@/components/Queries'

export default {
  name: 'Properties',

  props: ['context'],

  components: { Play, Editor, Queries }
}
</script>