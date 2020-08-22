<template>
  <div class="mt-4">
    <div class="text-sm uppercase font-medium text-gray-700 mb-2 flex items-center">
      {{ meta }}

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
// Libraries
import VueSliderComponent from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'SliderEditor',

  props: ['value', 'meta', 'allowed'],

  components: { VueSliderComponent },
}
</script>