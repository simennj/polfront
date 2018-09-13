<template>
  <v-layout wrap>
    <v-flex sm4 xs6>
      <v-text-field
        :label="'min ' + range.name"
        v-model="range.limits[0]"
        type="number"
      />
    </v-flex>
    <v-flex sm4 xs6>
      <v-text-field
        :label="'maks ' + range.name"
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
