<template>
  <div class="flex items-center mt-4">
    <div class="text-sm uppercase font-medium text-gray-700">
      {{ meta }}
    </div>

    <div class="ml-auto flex items-center">
      <button
          class="rounded mr-2"
          :class="{
            'border-2 border-gray-700': value === 'left' || !value,
            'border': value !== 'left'
          }"
          @click="$emit('input', 'left')">
        <MenuLeft class="w-6 h-6 text-gray-700" />
      </button>

      <button
          class="rounded mr-2"
          :class="{
            'border-2 border-gray-700': value === 'center',
            'border': value !== 'center'
          }"
          @click="$emit('input', 'center')">
        <MenuCenter class="w-6 h-6 text-gray-700" />
      </button>

      <button
          class="rounded mr-2"
          :class="{
            'border-2 border-gray-700': value === 'right',
            'border': value !== 'right'
          }"
          @click="$emit('input', 'right')">
        <MenuRight class="w-6 h-6 text-gray-700" />
      </button>
    </div>
  </div>
</template>

<script>
import MenuCenter from 'heroicons/outline/menu.svg'
import MenuLeft from 'heroicons/outline/menu-alt-1.svg'
import MenuRight from 'heroicons/outline/menu-alt-3.svg'

export default {
  name: 'TextAlignEditor',

  props: ['value', 'meta'],

  components: { MenuLeft, MenuCenter, MenuRight }
}
</script>