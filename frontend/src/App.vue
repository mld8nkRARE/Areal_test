<template>
   <v-app>
    <v-app-bar>
      <v-btn to="/">Статьи</v-btn>
      <v-btn to="/analytic">Аналитика</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
}
</script>