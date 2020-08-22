<template>
  <div>
    <div class="text-lg uppercase font-medium">
      Queries
    </div>

    <div class="text-sm uppercase font-medium mt-4 text-gray-700 flex items-center">
      GraphQL Endpoint

      <div class="ml-auto">
        <CheckCircle class="w-4 h-4 text-green-500" v-if="queryInfo.endpointGood" />
        <XCircle class="w-4 h-4 text-red-500" :class="{ 'animate-pulse': queryInfo.endpointLoading }" v-else />
      </div>
    </div>

    <input
        type="text"
        v-model="queryInfo.endpoint"
        class="w-full bg-gray-100 border rounded py-1 px-2 mt-2"
        placeholder="https://example.com/graphql" />

    <div v-if="queryInfo.endpointGood">
      <div class="text-sm uppercase font-medium mt-4 text-gray-700 flex">
        Query

        <button
            class="p-1 border rounded ml-auto"
            @click="add">
          <Plus class="w-4 h-4" />
        </button>
      </div>

      <QueryElement
          v-for="(query, index) of queryInfo.queries"
          :key="index"
          :value="query"
          @load.once="loadEndpoint"
          :types="queryInfo.types"
          :fields="queryInfo.fields"
          @remove="remove" />
    </div>
    <div class="text-gray-700 mt-4" v-else>
      Enter a valid GraphQL endpoint to continue.
    </div>
  </div>
</template>

<script>
// Icons
import Plus from 'heroicons/outline/plus.svg'
import XCircle from 'heroicons/solid/x-circle.svg'
import CheckCircle from 'heroicons/solid/check-circle.svg'

// Components
import QueryElement from '@/components/QueryElement'

// Scripts
import { makeQueryElement } from '@/scripts/makeQueryElement'

export default {
  name: 'Queries',

  props: ['queryInfo'],

  components: { Plus, XCircle, CheckCircle, QueryElement },

  methods: {
    add() {
      this.queries.push(makeQueryElement())
    },

    remove(value) {
      const index = this.queries.indexOf(value)

      if (index === -1) {
        throw `Cannot find ${value.name}`
      }

      this.queries.splice(index, 1)
    }
  }
}
</script>