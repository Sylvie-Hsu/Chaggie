<template>
  <div id="menubar" class="ui secondary menu">
    <router-link to="/" exact>
      <a class="item">Home</a>
    </router-link>
    <router-link to="/post">
      <a class="item">Post</a>
    </router-link>
    <div class="right menu">
      <search-bar></search-bar>
    </div>
  </div>
</template>

<script>
import searchbar from "../components/SearchBar";

export default {
  components: {
    "search-bar": searchbar
  }
};
</script>

<style scoped>
#menubar {
  margin: 10px 0 10px 0;
}
</style>


