<template>
  <div>
    {{ part.content }}
  </div>
</template>

<script>
export default {
  name: 'TextPart',

  props: ['part']
}
</script>
