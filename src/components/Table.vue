<template>
  <v-content>
    <filter-form
      :filter="filter"
    />
    <v-divider/>
    <v-data-table
      :headers="headers"
      :items="products.results"
      :pagination.sync="pagination"
      :total-items="products.count"
      :loading="loading"
      :rows-per-page-items="[20, 50, 100]"
    >
      <template slot="items" slot-scope="props">
        <td><a v-bind:href="props.item.url">{{ props.item.name }}</a></td>
        <td>{{ props.item.category }}</td>
        <td>{{ props.item.volume }}</td>
        <td>{{ props.item.alcohol }}</td>
        <td>{{ props.item.price }}</td>
        <td>{{ props.item.alcohol_price }}</td>
      </template>
    </v-data-table>
  </v-content>
</template>

<script>
  import { PRODUCTS } from '../http-functions'
  import FilterForm from './FilterForm'
  import _ from 'lodash'
  import qs from 'qs'

  export default {
    name: 'Table',
    components: {FilterForm},
    data () {
      return {
        filter: {},
        products: {
          results: [],
          count: 0,
          next: null,
          previous: null
        },
        loading: true,
        pagination: {},
        headers: [
          {text: 'Varenavn', value: 'name'},
          {text: 'Kategori', value: 'category'},
          {text: 'Volum', value: 'volume'},
          {text: 'Alkohol', value: 'alcohol'},
          {text: 'Pris', value: 'price'},
          {text: 'Alkoholpris', value: 'alcohol_price'}
        ]
      }
    },
    watch: {
      params: function (newParams, oldParams) {
        if (!_.isEqual(oldParams, newParams)) {
          this.debouncedGetProducts()
        }
      }
    },
    computed: {
      params () {
        const {sortBy, descending, page, rowsPerPage} = this.pagination
        const ordering = (descending ? '-' : '') + sortBy
        return {ordering, page, rowsPerPage, ...this.filter}
      }
    },
    created: function () {
      this.debouncedGetProducts = _.throttle(this.getProducts, 500)
    },
    methods: {
      getProducts: function () {
        this.loading = true
        return PRODUCTS.get('/', {
          params: this.params,
          'paramsSerializer': function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
          }
        })
          .then(response => {
            this.products = response.data
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

<style scoped>

</style>
