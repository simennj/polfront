<template>
  <v-app>
    <v-toolbar
      app
    >
      <router-link to="/">
        <img src="@/assets/logo.svg"/>
      </router-link>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <router-view>
      <v-content>
      </v-content>
    </router-view>
  </v-app>
</template>

<script>
  import FilterForm from './components/FilterForm'

  export default {
    components: {FilterForm},
    data () {
      return {
        title: 'Polguide'
      }
    },
    name: 'App'
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
