<template>
  <div id="flow">
    <div class="ui container">
      <menu-bar></menu-bar>
      <card-list></card-list>
    </div>
  </div>
</template>

<script>
import menubar from "../components/MenuBar";
import cardlist from "../components/CardList";

export default {
  components: {
    "menu-bar": menubar,
    "card-list": cardlist
  }
};
</script>

<style scoped>
#flow {
  background: #fffcf0;
}
</style>


