<template>
  <div v-if="query.name.length">
    <div v-if="query.parts.length">
      <button
          class="w-full text-gray-700 text-left my-2 px-2 font-medium border-b hover:bg-gray-100 rounded"
          @click="$emit('select', query)">
        {{ query.name }}
      </button>

      <div class="ml-4" >
        <InputQuery
            v-for="(part, index) of query.parts"
            :key="index"
            :query="part"
            v-on="$listeners" />
      </div>
    </div>
    <button
        class="w-full text-gray-900 text-left py-1 px-2 font-medium hover:bg-gray-100 rounded"
        @click="$emit('select', query)"
        v-else>
      {{ query.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'InputQuery',

  props: ['query']
}
</script>