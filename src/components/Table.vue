<template>
  <v-container
    pa-0
    class="elevation-1 white"
  >
    <v-layout wrap>
      <v-flex md3>
        <filter-form
          :filter="filter"
        />
      </v-flex>
      <v-flex md9>
        <v-data-table
          :headers="headers"
          :items="products.results"
          :pagination.sync="pagination"
          :total-items="products.count"
          :loading="loading"
          :rows-per-page-items="[20, 50, 100]"
          :must-sort="true"
        >
          <template slot="items" slot-scope="props">
            <td>
              <router-link :to="{ name: 'product', params: { id: props.item.id } }">{{ props.item.name }}</router-link>
            </td>
            <td>{{ props.item.category }}</td>
            <td class="text-xs-right">{{ props.item.volume }} l</td>
            <td class="text-xs-right">{{ props.item.alcohol }} %</td>
            <td class="text-xs-right">{{ props.item.price }} kr</td>
            <td class="text-xs-right">{{ props.item.alcohol_price }} kr/cl</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
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
        pagination: {
          sortBy: 'alcohol_price'
        },
        headers: [
          {text: 'Varenavn', value: 'name', align: 'left'},
          {text: 'Kategori', value: 'category', align: 'left'},
          {text: 'Volum', value: 'volume', align: 'right'},
          {text: 'Alkohol', value: 'alcohol', align: 'right'},
          {text: 'Pris', value: 'price', align: 'right'},
          {text: 'Alkoholpris', value: 'alcohol_price', align: 'right'}
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
