<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-form>
      <v-text-field
        v-model="filter.name"
        label="name"
      />
      <v-select
        :items="availableCategories"
        :loading="loading"
        v-model="filter.category"
        label="Kategorier"
        multiple
      />
      <v-layout
        wrap
        v-for="range in ranges"
        :key="range.name"
      >
        <v-flex xs12>
          {{range.name}}
        </v-flex>
        <v-flex
          style="width: 10em; min-width: 6em"
          shrink
        >
          <v-text-field
            label="min"
            v-model="range.limits[0]"
            type="number"
          />
        </v-flex>
        <v-flex
          style="width: 10em; min-width: 6em"
          shrink
        >
          <v-text-field
            label="maks"
            v-model="range.limits[1]"
            type="number"
          />
        </v-flex>
        <v-flex
        >
          <v-range-slider
            v-model="range.limits"
            thumb-label
            :min="range.min"
            :max="range.max"
            :step="range.step"
          />
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>
<script>
  import { CATEGORIES } from './http-functions'

  export default {
    name: 'filter-form',
    props: {
      filter: {}
    },
    data () {
      return {
        ranges: [
          {name: 'pris', limits: [0, 99999], min: 0, max: 99999, prefix: 'kr', query: 'price'},
          {name: 'volum', limits: [0, 20], min: 0, max: 20, step: 0.01, suffix: 'l', query: 'volume'},
          {name: 'alkohol', limits: [0, 60], min: 0, max: 60, suffix: '%', query: 'alcohol'},
          {name: 'alkoholpris', limits: [0, 20000], min: 0, max: 20000, suffix: 'kr/cl', query: 'alcohol_price'}
        ],
        loading: true,
        availableCategories: []
      }
    },
    watch: {
      ranges: {
        handler () {
          for (const range of this.ranges) {
            this.$set(this.filter, range.query + '_0', range.limits[0])
            this.$set(this.filter, range.query + '_1', range.limits[1])
          }
        },
        deep: true
      }
    },
    mounted () {
      this.getCategories()
    },
    methods: {
      getCategories () {
        this.loading = true
        return CATEGORIES.get('/')
          .then(response => {
            this.availableCategories = response.data.results.map(category => {
              return {value: category.id, text: category.name}
            })
            this.loading = false
          })
          .catch(e => {
            console.log(e)
            this.loading = false
          })
      }
    }
  }
</script>
<style>
  /* Hide HTML5 Up and Down arrows. */
  input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
