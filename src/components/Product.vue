<template>
  <v-content>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        {{ product }}
      </v-layout>
    </v-slide-y-transition>
  </v-content>
</template>
<script>
  import {PRODUCTS} from '../http-functions'

  export default {
    data () {
      return {
        product: {}
      }
    },
    beforeRouteUpdate (to, from, next) {
      this.loadProduct(to.params.id)
      next()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.loadProduct(to.params.id))
    },
    methods: {
      loadProduct (id) {
        this.product = PRODUCTS.get('/' + id)
          .then(response => {
            this.product = response.data
          })
      }
    }
  }
</script>
<style scoped>

</style>
