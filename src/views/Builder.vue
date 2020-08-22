<template>
  <div class="flex h-screen">
    <Tree
        class="w-72 h-full overflow-y-scroll"
        :tree="tree"
        :selected="selected"
        :prompt="prompt"
        @select="changeSelected"
        @prompt="changePrompt"
        @create="createElement"
        @remove="removeElement"/>
    <Preview
        class="flex-1 bg-gray-100"
        :tree="tree" />
    <Properties
        class="w-72 h-full overflow-y-scroll"
        :query-info="queryInfo"
        :selected="selected" />
  </div>
</template>

<script>
// Components
import Tree from '@/components/Tree'
import Properties from '@/components/Properties'
import Preview from '@/components/Preview'

// Scripts
import SchemaQuery from '@/scripts/schema.query.graphql'
import { makeQueryElement } from '@/scripts/makeQueryElement'

// Libraries
import axios from 'axios'

export default {
  name: 'Builder',

  components: { Tree, Properties, Preview },

  data() {
    return {
      tree: [],
      queryInfo: {
        endpoint: 'https://api.github.com/graphql',
        endpointLoading: false,
        endpointGood: false,

        types: [],
        fields: [],

        queries: [{ name: '', parts: [], type: null, lowestType: null }],
      },
      selected: null,
      prompt: null
    }
  },

  watch: {
    queryInfo: {
      async endpoint() {
        console.log('Endpoint changed.')

        await this.loadEndpoint()
      }
    }
  },

  async mounted() {
    this.tree = (await axios.get('/example.json')).data.tree

    await this.loadEndpoint()
  },

  methods: {
    changeSelected(selected) {
      this.selected = selected
    },

    changePrompt(prompt) {
      if (this.prompt === prompt) {
        this.prompt = null
      } else {
        this.prompt = prompt
      }
    },

    createElement(value, parent) {
      if (parent) {
        parent.content.push(value)
      } else {
        this.tree.push(value)
      }

      this.prompt = null
    },

    removeRecursive(value, arr) {
      for (let a = 0; a < arr.length; a++) {
        if (arr[a] === value) {
          arr.splice(a, 1)
          break
        }

        if (arr[a].type === 'view' || arr[a].type === 'scene') {
          this.removeRecursive(value, arr[a].content)
        }
      }
    },

    removeElement(value) {
      this.removeRecursive(value, this.tree)
    },

    async loadEndpoint() {
      this.queryInfo.endpointGood = false
      this.queryInfo.endpointLoading = true

      try {
        const token = localStorage.getItem('auth:token')

        const res = (await axios.post(this.queryInfo.endpoint, {
          query: SchemaQuery
        }, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : undefined
          }
        }))

        window.test = res

        console.log(res)

        this.queryInfo.queries.length = 0
        this.queryInfo.queries.push(makeQueryElement())
        this.queryInfo.types = res.data.data.__schema.types
        this.queryInfo.fields = res.data.data.__schema.queryType.fields

        this.queryInfo.endpointGood = true
      } catch (e) {
        console.error(e)
      }

      this.queryInfo.endpointLoading = false
    }
  }
}
</script>
