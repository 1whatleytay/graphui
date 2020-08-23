<template>
  <div class="mt-4">
    <div class="text-sm uppercase font-medium text-gray-700 flex items-center">
      {{ meta }}

      <button class="ml-auto p-1" @click="show = !show">
        <ChevronDown class="w-4 h-4" v-if="show" />
        <ChevronRight class="w-4 h-4" v-else />
      </button>
    </div>

    <div class="flex" v-if="show">
      <div class="w-1/2">
        <div class="py-2 border-b flex items-center">
          <ArrowUp class="w-4 h-4 border-t border-dotted border-black" />

          <input
              :value="(value && value.top) || 0"
              type="number"
              class="ml-2 w-16"
              min="0"
              max="64"
              @input="set('top', $event)" />
        </div>


        <div class="py-2 flex items-center">
          <ArrowLeft class="w-4 h-4 border-l border-dotted border-black" />

          <input
              :value="(value && value.left) || 0"
              type="number"
              class="ml-2 w-16"
              min="0"
              max="64"
              @input="set('left', $event)" />
        </div>
      </div>

      <div class="w-1/2">
        <div class="py-2 border-b flex items-center">
          <ArrowDown class="w-4 h-4 border-b border-dotted border-black" />

          <input
              :value="(value && value.bottom) || 0"
              type="number"
              class="ml-2 w-16"
              min="0"
              max="64"
              @input="set('bottom', $event)" />
        </div>

        <div class="py-2  flex items-center">
          <ArrowRight class="w-4 h-4 border-r border-dotted border-black" />

          <input
              :value="(value && value.right) || 0"
              type="number"
              class="ml-2 w-16"
              min="0"
              max="64"
              @input="set('right', $event)" />
        </div>
      </div>
    </div>
  </div>


</template>

<script>
// Icons
import ArrowUp from 'heroicons/outline/arrow-up.svg'
import ArrowDown from 'heroicons/outline/arrow-down.svg'
import ArrowLeft from 'heroicons/outline/arrow-left.svg'
import ArrowRight from 'heroicons/outline/arrow-right.svg'
import ChevronDown from 'heroicons/outline/chevron-down.svg'
import ChevronRight from 'heroicons/outline/chevron-right.svg'

export default {
  name: 'DirectionEditor',

  props: ['value', 'meta'],

  components: { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ChevronDown, ChevronRight },

  data() {
    return {
      show: false
    }
  },

  methods: {
    set(param, event) {
      const result = this.value || { left: 0, right: 0, top: 0, bottom: 0 }

      result[param] = event.target.value

      console.log(event.target.value)

      console.log(result)

      this.$emit('input', result)
    }
  }
}
</script>