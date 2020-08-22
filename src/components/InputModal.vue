<template>
  <div
      class="absolute top-0 left-0 bg-shade w-screen h-screen flex items-center justify-center z-20"
      @click="$emit('close')">
    <div class="bg-white rounded shadow p-4" @click.stop>
      <div class="">
        <div class="text-lg uppercase font-medium flex items-center">
          <div class="mr-12">Select an Input</div>

          <button class="p-1 ml-auto" @click="$emit('close')">
            <X class="w-3 h-3 text-gray-700" />
          </button>
        </div>

        <div class="text-sm uppercase font-medium mt-4 text-gray-700 flex items-center mb-1">
          Queries

          <button class="ml-auto p-1 border rounded" @click="context.editorMode = 'queries'">
            <ExternalLink class="w-3 h-3" />
          </button>
        </div>

        <div class="text-gray-700 text-sm" v-if="!context.queries.length || !context.queries[0].name.length">
          You don't have any queries yet.
        </div>
        <InputQuery
            v-for="(query, index) of context.queries"
            :key="index"
            :query="query"
            v-on="$listeners" />
      </div>
    </div>
  </div>
</template>

<script>
// Icons
import X from 'heroicons/outline/x.svg'
import ExternalLink from 'heroicons/outline/external-link.svg'

// Components
import InputQuery from '@/components/InputQuery'

export default {
  name: 'InputModal',

  props: ['context'],

  components: { X, InputQuery, ExternalLink }
}
</script>
