<template>
  <div>
    <button
        class="p-2 capitalize flex items-center text-sm text-gray-700 w-full font-medium rounded group focus:outline-none"
        :class="{ 'bg-blue-100 font-bold': part === info.selected }"
        @click="$emit('select', part)">
      <div>
        <MenuAlt1 class="w-4 h-4 mr-2" v-if="part.type === 'text'" />
        <Photograph class="w-4 h-4 mr-2" v-else-if="part.type === 'image'" />
        <DotsVertical class="w-4 h-4 mr-2" v-else-if="part.type === 'view'" />
        <DotsHorizontal class="w-4 h-4 mr-2" v-else-if="part.type === 'scene'" />
        <ViewGridAdd class="w-4 h-4 mr-2" v-else-if="part.type === 'iterator'" />
        <Hashtag class="w-4 h-4 mr-2" v-else />
      </div>
      <div class="truncate">
        {{ getPartName(part) }}
      </div>

      <div
          class="ml-auto flex"
          @click.stop>

        <div class="relative">
          <button
              class="border rounded p-1 invisible group-hover:visible"
              v-if="part.type === 'view' || part.type === 'scene' || part.type === 'iterator'"
              @click="$emit('prompt', part)">
            <Plus class="w-3 h-3" />
          </button>

          <ElementSelector
              class="absolute top-100 right-0 z-40"
              v-if="info.prompt === part"
              v-clickaway="clearPrompt"
              @create="$emit('create', arguments[0], part)" />
        </div>

        <button
            class="border border-red-500 rounded p-1 invisible group-hover:visible ml-2"
            @click="$emit('remove', part)">
          <Trash class="w-3 h-3 text-red-500" />
        </button>
      </div>
    </button>
    <div v-if="part.type === 'view' || part.type === 'scene' || part.type === 'iterator'" class="pl-4">
      <TreeChild
          v-for="(item, index) of part.content"
          :key="index"
          :part="item"
          :info="info"
          v-on="$listeners"/>
    </div>
  </div>
</template>

<script>
// Icons
import Plus from 'heroicons/outline/plus.svg'
import Trash from 'heroicons/outline/trash.svg'
import Hashtag from 'heroicons/outline/hashtag.svg'
import MenuAlt1 from 'heroicons/outline/menu-alt-1.svg'
import Photograph from 'heroicons/outline/photograph.svg'
import ViewGridAdd from 'heroicons/outline/view-grid-add.svg'
import DotsVertical from 'heroicons/outline/dots-vertical.svg'
import DotsHorizontal from 'heroicons/outline/dots-horizontal.svg'

// Components
import ElementSelector from '@/components/ElementSelector'

// Scripts
import { getPartName } from '@/scripts/getPartName'

// Libraries
import { directive as clickaway } from 'vue-clickaway'

export default {
  name: 'TreeChild',

  props: ['part', 'info'],

  directives: { clickaway },
  components: {
    Plus,
    Trash,
    Hashtag,
    MenuAlt1,
    Photograph,
    ViewGridAdd,
    DotsVertical,
    DotsHorizontal,

    ElementSelector
  },

  data() {
    return {
      showSelector: false
    }
  },

  methods: {
    getPartName,

    clearPrompt() {
      this.$emit('prompt', null)
    }
  }
}
</script>