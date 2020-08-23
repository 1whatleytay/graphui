<template>
  <div class="p-4">
    <div class="text-lg uppercase font-medium flex items-center">
      Project

      <div class="ml-auto relative">
        <button
            class="border rounded p-1"
            @click="$emit('prompt', 'tree')">
          <Plus class="w-3 h-3" />
        </button>

        <ElementSelector
            class="absolute top-100 right-0 z-40"
            v-if="prompt === 'tree'"
            v-clickaway="clearPrompt"
            @create="$emit('create', arguments[0], null)" />
      </div>
    </div>

    <div class="mt-4">
      <TreeChild
          v-for="(item, index) of tree"
          :key="index"
          :part="item"
          :info="{ selected, prompt }"
          v-on="$listeners"
          :selected="selected" />
    </div>
  </div>
</template>

<script>
// Icons
import Plus from 'heroicons/outline/plus.svg'

// Components
import TreeChild from '@/components/TreeChild'
import ElementSelector from '@/components/ElementSelector'

// Libraries
import { directive as clickaway } from 'vue-clickaway'

export default {
  name: 'Tree',

  props: ['tree', 'selected', 'prompt'],

  directives: { clickaway },
  components: { Plus, TreeChild, ElementSelector },

  methods: {
    clearPrompt() {
      this.$emit('prompt', null)
    }
  }
}
</script>