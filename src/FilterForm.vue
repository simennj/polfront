<template>
  <v-form>
    <v-container fluid grid-list-md>
      <v-layout wrap>
        <v-flex xl3>
          <v-layout wrap>
            <v-flex xl12>
              <v-text-field v-model="filter.name" label="name"/>
            </v-flex>
            <v-flex xl12>
              <v-select
                :items="availableCategories"
                :loading="loading"
                v-model="filter.category"
                label="Kategorier"
                multiple
              />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xl9>
          <v-layout wrap>
            <v-flex v-for="range in ranges" :key="range.name" md6>
              <RangeFilter :range="range"/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
  import { CATEGORIES, PRODUCT_AGGREGATIONS } from './http-functions'
  import RangeFilter from './RangeFilter'
  import qs from 'qs'

  export default {
    name: 'filter-form',
    components: {RangeFilter},
    props: {
      filter: {}
    },
    data () {
      return {
        ranges: [
          {name: 'pris', limits: [], min: 0, max: 99999, prefix: 'kr', query: 'price'},
          {name: 'volum', limits: [], min: 0, max: 20, step: 0.01, suffix: 'l', query: 'volume'},
          {name: 'alkohol', limits: [], min: 0, max: 60, suffix: '%', query: 'alcohol'},
          {name: 'alkoholpris', limits: [], min: 0, max: 20000, suffix: 'kr/cl', query: 'alcohol_price'}
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
      this.getAggregations()
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
      },
      getAggregations () {
        return PRODUCT_AGGREGATIONS.get('/', {
          params: this.params,
          'paramsSerializer': function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
          }
        })
          .then(response => {
            for (const range of this.ranges) {
              range.min = response.data[range.query + '__min']
              range.max = response.data[range.query + '__max']
            }
          }).catch(console.log)
      }
    }
  }
</script>
<style>
</style>
