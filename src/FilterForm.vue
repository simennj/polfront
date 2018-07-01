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
      <v-flex v-for="range in ranges">
        <RangeFilter :range="range"/>
      </v-flex>
    </v-form>
  </v-container>
</template>
<script>
  import { CATEGORIES } from './http-functions'
  import RangeFilter from './RangeFilter'

  export default {
    name: 'filter-form',
    components: {RangeFilter},
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
            this.availableCategories = response.data.map(category => {
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
</style>
