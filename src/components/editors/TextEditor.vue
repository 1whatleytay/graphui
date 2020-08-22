<template>
  <div>
    <div class="text-sm uppercase font-medium mt-4 text-gray-700 flex items-center">
      {{ meta }}

      <button
          class="ml-auto p-1 border rounded"
          @click="$emit('input', '')"
          v-if="isLink">
        <Link class="w-3 h-3 text-blue-700" />
      </button>

      <button
          class="ml-auto p-1 border rounded"
          @click="showInput = true"
          v-else>
        <ExternalLink class="w-3 h-3" />
      </button>
    </div>

    <input
        type="text"
        :value="isLink ? value.name : value"
        class="w-full bg-gray-100 border rounded py-1 px-2 mt-2"
        :placeholder="meta"
        @input="$emit('input', $event.target.value)"
        :class="{ 'opacity-50 cursor-not-allowed': isLink }"
        :disabled="isLink" />

    <InputModal :context="context" v-if="showInput" @select="select" @close="showInput = false" />
  </div>
</template>

<script>
// Icons
import Link from 'heroicons/outline/link.svg'
import ExternalLink from 'heroicons/outline/external-link.svg'

// Components
import InputModal from '@/components/InputModal'

export default {
  name: 'TextEditor',

  props: ['value', 'meta', 'context'],

  components: { Link, InputModal, ExternalLink },

  data() {
    return {
      showInput: false
    }
  },

  computed: {
    isLink() {
      return (typeof this.value === 'object')
    }
  },

  methods: {
    select(value) {
      this.$emit('input', value)

      this.showInput = false
    }
  }
}
</script>