<template>
  <div>
    <div class="text-sm uppercase font-medium mt-4 flex items-center text-gray-700">
      <button
          class="w-6 h-6 border rounded mr-2 flex items-center justify-center"
          :class="buildColor(value, 'bg')"
          @click="show = !show">
        <X class="w-6 h-6 text-red-500" v-if="!value || (value.color === 'transparent')" />
      </button>

      {{ meta }}

      <button class="ml-auto p-1" @click="show = !show">
        <ChevronDown class="w-4 h-4" v-if="show" />
        <ChevronRight class="w-4 h-4" v-else />
      </button>
    </div>

    <div v-if="show" class="flex flex-wrap mt-2">
      <div
          v-for="(color, index) of colors"
          :key="index"
          class="flex justify-around w-full">
        <div
            v-for="(value, index) of values"
            :key="index">
          <button
              @click="$emit('input', { color, value })"
              :class="colorClass(color, value)"
              class="w-8 h-8 border-2 rounded focus:outline-none"/>
        </div>
      </div>

      <div class="flex justify-around w-full my-2">
        <button
            @click="$emit('input', { color: 'white' })"
            :class="colorClass('white')"
            class="w-8 h-8 border-2 rounded focus:outline-none"/>

        <button
            @click="$emit('input', { color: 'black' })"
            :class="colorClass('black')"
            class="w-8 h-8 border-2 rounded focus:outline-none"/>


        <button
            @click="$emit('input', { color: 'transparent' })"
            :class="colorClass('transparent')"
            class="w-8 h-8 border-2 rounded focus:outline-none flex items-center justify-center">
          <X class="w-8 h-8 text-red-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// Icons
import X from 'heroicons/outline/x.svg'
import ChevronDown from 'heroicons/outline/chevron-down.svg'
import ChevronRight from 'heroicons/outline/chevron-right.svg'

// Scripts
import { buildColor } from '@/scripts/buildClasses'

export default {
  name: 'ColorEditor',

  props: ['value', 'meta'],

  components: { X, ChevronDown, ChevronRight },

  data() {
    return {
      show: false,

      colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'gray'],
      values: [700, 600, 500, 400, 300, 100]
    }
  },

  methods: {
    buildColor,

    colorClass(color, value) {
      let built = buildColor({ color, value }, 'bg')

      if (this.value && this.value.color === color && this.value.value === value)
        built = built.concat(['border-4 border-black'])

      return built
    }
  }
}
</script>
