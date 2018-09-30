<template>
  <v-layout wrap>
    <v-flex sm4 xs6>
      <v-text-field
        :label="range.name + ' min'"
        v-model="range.limits[0]"
        type="number"
      />
    </v-flex>
    <v-flex sm4 xs6>
      <v-text-field
        :label="range.name + ' maks'"
        v-model="range.limits[1]"
        type="number"
      />
    </v-flex>
    <v-flex sm4 px-3>
      <v-range-slider
        v-model="range.limits"
        thumb-label
        :min="range.min"
        :max="range.max"
        :step="range.step"
      />
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: 'RangeFilter',
    props: {
      range: {}
    }
  }
</script>
