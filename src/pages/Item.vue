<template>
  <div id="item">
    <div class="ui container">
      <menu-bar></menu-bar>
      <item-display></item-display>
    </div>
  </div>
</template>

<script>
import menubar from "../components/MenuBar";
import itemdisplay from "../components/ItemDisplay";

export default {
  components: {
    "menu-bar": menubar,
    "item-display": itemdisplay
  }
};
</script>

<style scoped>
#item {
  background: #fffcf0;
}
</style>



