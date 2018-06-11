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
            v-model="range.limits[0]"
            type="number"
          />
        </v-flex>
        <v-flex
          style="width: 10em; min-width: 6em"
          shrink
        >
          <v-text-field
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
        ]
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
