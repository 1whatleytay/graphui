<template>
  <div>
    <div class="text-sm uppercase font-medium mt-4 text-gray-700">
      {{ meta }}
    </div>

    <input
        type="text"
        :value="value"
        class="w-full bg-gray-100 border rounded py-1 px-2 mt-2"
        :placeholder="meta"
        @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: 'TextEditor',

  props: ['value', 'meta']
}
</script>