<template>
  <div class="mt-4">
    <div class="text-sm uppercase font-medium text-gray-700 mb-2 flex items-center">
      {{ meta }}

      <button class="p-1 border rounded ml-2" @click="change">
        <Refresh class="w-3 h-3 text-gray-700" />
      </button>

      <div class="ml-auto text-lg font-bold">
        {{ value || 0 }}
      </div>
    </div>

    <VueSliderComponent
        :value="value"
        @change="$emit('input', arguments[0])"
        :data="allowed"
        :marks="true"
        :hideLabel="true" />
  </div>
</template>

<script>
// Icons
import Refresh from 'heroicons/outline/refresh.svg'

// Libraries
import VueSliderComponent from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'ProportionEditor',

  props: ['value', 'meta'],

  components: { Refresh, VueSliderComponent },

  computed: {
    fraction() {
      return (this.value && this.value.includes('/')) || this.value === 'full'
    },

    allowed() {
      return this.fraction
          ? ['1/6', '1/4', '1/3', '1/2', '2/3', '3/4', '5/6', 'full']
          : ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64', 'auto']
    }
  },

  methods: {
    change() {
      this.$emit('input', this.fraction ? 'auto' : 'full')
    }
  }
}
</script>