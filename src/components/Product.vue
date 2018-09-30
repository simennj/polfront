<template>
  <v-layout>
    <v-flex>
      <v-slide-y-transition mode="out-in">
        <v-layout column align-center>
          {{ product }}
          {{ productHistory }}
        </v-layout>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>
<script>
  import { PRODUCTHISTORY, PRODUCTS } from '../http-functions'

  export default {
    data () {
      return {
        product: {},
        productHistory: {}
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.load(to.params.id)
      next()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.load(to.params.id))
    },
    methods: {
      load (productId) {
        this.loadProduct(productId)
        this.loadProductHistory(productId)
      },
      loadProduct (id) {
        PRODUCTS.get('/' + id)
          .then(response => {
            this.product = response.data
          })
      },
      loadProductHistory (productId) {
        PRODUCTHISTORY.get('/', {
          params: {product: productId}
        })
          .then(response => {
            this.productHistory = response.data
          })
      }
    }
  }
</script>
<style scoped>

</style>
