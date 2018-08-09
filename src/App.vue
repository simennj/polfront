<template>
  <v-app>
    <v-toolbar
      app
    >
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
