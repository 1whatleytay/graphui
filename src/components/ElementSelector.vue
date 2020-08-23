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
        @click="$emit('create', { type: 'image', classes: {}, content: '/guineapig.webp' })">
      <Photograph class="w-4 h-4 mr-2" />

      Image
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

    <button
        class="flex items-center p-2 rounded hover:bg-gray-100 w-full text-base"
        @click="$emit('create', { type: 'iterator', classes: {}, content: [] })">
      <ViewGridAdd class="w-4 h-4 mr-2" />

      Iterator
    </button>
  </div>
</template>

<script>
// Icons
import MenuAlt1 from 'heroicons/outline/menu-alt-1.svg'
import Photograph from 'heroicons/outline/photograph.svg'
import ViewGridAdd from 'heroicons/outline/view-grid-add.svg'
import DotsVertical from 'heroicons/outline/dots-vertical.svg'
import DotsHorizontal from 'heroicons/outline/dots-horizontal.svg'

export default {
  name: 'ElementSelector',

  components: {
    MenuAlt1,
    Photograph,
    ViewGridAdd,
    DotsVertical,
    DotsHorizontal,
  }
}
</script>
