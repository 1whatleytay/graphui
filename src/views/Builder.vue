<template>
  <div class="flex h-screen">
    <Tree
        class="w-72 h-full overflow-y-scroll"
        :tree="context.tree"
        :selected="context.selected"
        :prompt="context.prompt"
        @select="changeSelected"
        @prompt="changePrompt"
        @create="createElement"
        @remove="removeElement"
        v-if="!context.playing" />
    <Preview
        class="flex-1 bg-gray-100"
        :tree="context.tree"
        :context="context" />
    <Properties
        class="w-72 h-full overflow-y-scroll"
        :context="context"
        @play="play"
        v-if="!context.playing" />

    <button
        class="fixed bottom-0 left-0 ml-8 mb-8"
        @click="context.playing = false"
        v-if="context.playing">
      <Pause class="w-34 h-24 text-gray-700 opacity-75" />
    </button>
  </div>
</template>

<script>
// Icons
import Pause from 'heroicons/outline/pause.svg'

// Components
import Tree from '@/components/Tree'
import Properties from '@/components/Properties'
import Preview from '@/components/Preview'

// Scripts
import SchemaQuery from '@/scripts/schema.query.graphql'
import { makeQueryElement } from '@/scripts/makeQueryElement'

// Libraries
import axios from 'axios'
import { buildGraphQL } from '@/scripts/buildGraphQL'

export default {
  name: 'Builder',

  components: { Pause, Tree, Properties, Preview },

  data() {
    return {
      context: {
        playing: false,

        editorMode: 'editor',

        tree: [],
        data: [],

        endpoint: 'https://api.github.com/graphql',
        endpointLoading: false,
        endpointGood: false,

        types: [],
        fields: [],

        queries: [makeQueryElement()],

        selected: null,
        prompt: null
      }
    }
  },

  computed: {
    endpoint() {
      return this.context.endpoint
    },

    selected() {
      return this.context.selected
    }
  },

  watch: {
    async endpoint(value) {
      console.log('Endpoint changed.')

      await this.loadEndpoint(value)
    },

    selected(value) {
      if (value) {
        this.context.editorMode = 'editor'
      }
    }
  },

  async mounted() {
    this.context.tree = (await axios.get('/example.json')).data.tree

    await this.loadEndpoint(this.context.endpoint)
  },

  methods: {
    changeSelected(selected) {
      this.context.selected = selected
    },

    changePrompt(prompt) {
      if (this.context.prompt === prompt) {
        this.context.prompt = null
      } else {
        this.context.prompt = prompt
      }
    },

    createElement(value, parent) {
      if (parent) {
        parent.content.push(value)
      } else {
        this.context.tree.push(value)
      }

      this.context.prompt = null
    },

    removeRecursive(value, arr) {
      for (let a = 0; a < arr.length; a++) {
        if (arr[a] === value) {
          arr.splice(a, 1)
          break
        }

        if (arr[a].type === 'view' || arr[a].type === 'scene' || arr[a].type === 'iterator') {
          this.removeRecursive(value, arr[a].content)
        }
      }
    },

    removeElement(value) {
      if (this.context.selected === value) {
        this.context.selected = null
      }

      this.removeRecursive(value, this.context.tree)
    },

    async loadEndpoint(value) {
      this.context.endpointGood = false
      this.context.endpointLoading = true

      try {
        const token = localStorage.getItem('auth:token')

        const res = (await axios.post(value, {
          query: SchemaQuery
        }, {
          headers: {
            'Authorization': token ? `Bearer ${token}` : undefined
          }
        }))

        window.test = res

        console.log(res)

        this.context.queries.length = 0
        this.context.queries.push(makeQueryElement())
        this.context.types = res.data.data.__schema.types
        this.context.fields = res.data.data.__schema.queryType.fields

        this.context.endpointGood = true
      } catch (e) {
        console.error(e)
      }

      this.context.endpointLoading = false
    },

    loadIntoState(parent, query) {
      if (!query.name.length)
        return

      let part

      if (Array.isArray(parent)) {
        part = parent.map(x => x[query.name])
      } else {
        part = parent[query.name]
      }

      console.log(`Loading ${part} into query ${query.id} with name ${query.name}.`)
      this.context.data[query.id] = part

      if (query.parts.length) {
        for (const q of query.parts) {
          this.loadIntoState(part, q)
        }
      }
    },

    async play() {
      this.context.data = []

      const token = localStorage.getItem('auth:token')
      const query = `query { ${this.context.queries.map(x => buildGraphQL(x)).join(' ')} }`
      console.log(query)

      if (this.context.queries.length && this.context.queries[0].name.length) {
        const result = (await axios.post(this.context.endpoint, { query }, {
          headers: { 'Authorization': token ? `Bearer ${token}` : undefined }
        })).data

        console.log(result)

        for (const query of this.context.queries) {
          this.loadIntoState(result.data, query)
        }
      }

      this.context.playing = true
    }
  }
}
</script>
