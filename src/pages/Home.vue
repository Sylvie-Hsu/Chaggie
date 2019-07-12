<template>
  <div id="home" class="ui container" :style="{height:height+'px'}">
    <search-bar></search-bar>
  </div>
</template>

<script>
import searchbar from "../components/SearchBar";

export default {
  data() {
    return {
      height: document.body.clientHeight
    };
  },
  components: {
    "search-bar": searchbar
  }
};
</script>

<style>
#home {
  display: flex;
  width: "100%";
  justify-content: center;
  align-items: center;
}
</style>

