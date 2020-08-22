<template>
  <div class="p-4">
    <div class="flex justify-between mb-4 text-gray-700 border-b">
      <button
          @click="mode = 'editor'"
          class="p-2"
          :class="{ 'font-bold border-b-2 border-black': mode === 'editor' }">
        Editor
      </button>

      <button
          @click="mode = 'queries'"
          class="p-2"
          :class="{ 'font-bold border-b-2 border-black': mode === 'queries' }">
        Queries
      </button>
    </div>

    <Editor :selected="selected" v-if="mode === 'editor'" />
    <Queries :query-info="queryInfo" v-else-if="mode === 'queries'" />
  </div>
</template>

<script>
// Components
import Editor from '@/components/Editor'
import Queries from '@/components/Queries'

export default {
  name: 'Properties',

  props: ['queryInfo', 'selected'],

  components: { Editor, Queries },

  data() {
    return {
      mode: 'queries'
    }
  },

  watch: {
    selected(val) {
      if (val) {
        this.mode = 'editor'
      }
    }
  },
}
</script>