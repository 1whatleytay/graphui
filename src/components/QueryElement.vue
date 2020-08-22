<template>
  <div>
    <div class="relative flex items-center mt-2 group">
      <div
          class="border-b-2 border-gray-700 flex-1 p-1 mr-2"
          v-if="typeHasFields(value.lowestType) && hasChildren">
        {{ value.name }}
      </div>

      <input
          type="text"
          v-model="value.name"
          @input="makeSuggestions"
          class="flex-1 border-b rounded p-1 mr-2 bg-transparent"
          placeholder="field..."
          @keydown.enter="select(value.name)"
          v-clickaway="closeSuggestions"
          v-else />

      <div
          class="absolute top-100 left-0 bg-white rounded shadow p-2 text-gray-700 w-56 h-40 overflow-scroll z-10"
          v-if="suggestions.length">
        <button
            v-for="(suggestion, index) of suggestions"
            :key="index"
            class="p-2 rounded hover:bg-gray-100 focus:bg-gray-200 w-full text-left truncate flex items-center"
            @click.stop="select(suggestion.item.name)">
          <div class="mr-2">
            {{ suggestion.item.name }}
          </div>

          <div class="ml-auto text-gray-500 truncate text-xs">
            {{ makeTypename(suggestion.item.type) }}
          </div>
        </button>
      </div>

      <div class="text-gray-700 ml-auto truncate group-hover:hidden text-xs" v-if="value.type">
        {{ makeTypename(value.type) }}
      </div>

      <div class="ml-auto hidden group-hover:block flex-none">
        <button
            class="p-1 border rounded mr-2"
            v-if="typeHasFields(value.lowestType)"
            @click="add">
          <Plus class="w-3 h-3" />
        </button>

        <button
            class="p-1 border border-red-500 rounded"
            @click="$emit('remove', value)">
          <Trash class="w-3 h-3 text-red-500" />
        </button>
      </div>
    </div>

    <div class="ml-4" v-if="typeHasFields(value.lowestType)">
      <QueryElement
          v-for="(part, index) of value.parts"
          :key="index"
          :value="part"
          :types="types"
          :fields="value.lowestType.fields"
          @select="checkAdd"
          @remove="remove" />
    </div>
  </div>
</template>

<script>
// Icons
import Plus from 'heroicons/outline/plus.svg'
import Trash from 'heroicons/outline/trash.svg'

// Scripts
import { makeTypename, typeHasFields } from '@/scripts/makeTypename'
import { makeQueryElement } from '@/scripts/makeQueryElement'

// Libraries
import Fuse from 'fuse.js'
import { directive as clickaway } from 'vue-clickaway'

export default {
  name: 'QueryElement',

  props: ['value', 'types', 'fields'],

  directives: { clickaway },
  components: { Plus, Trash },

  data() {
    return {
      search: null,
      suggestions: []
    }
  },

  mounted() {
    this.search = new Fuse(this.fields, {
      keys: ['name']
    })
  },

  computed: {
    hasChildren() {
      return this.value.parts.length && this.value.parts[0].name.length
    }
  },

  methods: {
    makeTypename,
    typeHasFields,

    findLowestType(type) {
      if (type.ofType) {
        return this.findLowestType(type.ofType)
      }

      return this.types.find(x => x.name === type.name)
    },

    async makeSuggestions() {
      this.value.type = null
      this.value.lowestType = null
      this.value.parts = []

      this.suggestions = this.search.search(this.value.name)
    },

    closeSuggestions() {
      this.select(this.value.name)
    },

    select(value) {
      const element = this.fields.find(x => x.name === value)

      if (element) {
        this.value.type = element.type
        this.value.lowestType = this.findLowestType(element.type)

        if (typeHasFields(this.value.lowestType)) {
          this.value.parts = [makeQueryElement()]
        }

        this.$emit('select', this.value)
      }

      this.value.name = value
      this.suggestions = []
    },

    add() {
      this.value.parts.push(makeQueryElement())
    },

    remove(value) {
      this.value.parts = this.value.parts.filter(x => x !== value)
    },

    checkAdd(value) {
      if (!this.value.parts.length)
        return

      if (this.value.parts[this.value.parts.length - 1] === value) {
        this.add()
      }
    }
  }
}
</script>
