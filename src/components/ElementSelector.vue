<template>
  <div class="p-4 rounded bg-white shadow w-56 text-left" @click.stop>
    <div class="uppercase text-sm font-medium text-gray-700 mb-2">
      New Element
    </div>

    <button
        class="flex items-center p-2 rounded hover:bg-gray-100 w-full text-base"
        @click="$emit('create', { type: 'text', classes: {}, content: '' })">
      <MenuAlt1 class="w-4 h-4 mr-2" />

      Text
    </button>

    <button
        class="flex items-center p-2 rounded hover:bg-gray-100 w-full text-base"
        @click="$emit('create', { type: 'view', classes: {}, content: [] })">
      <DotsVertical class="w-4 h-4 mr-2" />

      View
    </button>

    <button
        class="flex items-center p-2 rounded hover:bg-gray-100 w-full text-base"
        @click="$emit('create', { type: 'scene', classes: {}, content: [] })">
      <DotsHorizontal class="w-4 h-4 mr-2" />

      Scene
    </button>
  </div>
</template>

<script>
// Icons
import MenuAlt1 from 'heroicons/outline/menu-alt-1.svg'
import DotsVertical from 'heroicons/outline/dots-vertical.svg'
import DotsHorizontal from 'heroicons/outline/dots-horizontal.svg'

export default {
  name: 'ElementSelector',

  components: {
    MenuAlt1,
    DotsVertical,
    DotsHorizontal
  }
}
</script>
