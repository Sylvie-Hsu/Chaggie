<template>
  <div id="item">
    <div class="ui container">
      <menu-bar></menu-bar>
      <item-display></item-display>
      <h4 class="ui horizontal divider header">
        <i class="bar chart icon"></i>
        相关推荐
      </h4>
      <relative-list></relative-list>
    </div>
  </div>
</template>

<script>
import menubar from "../components/MenuBar";
import itemdisplay from "../components/ItemDisplay";
import relativelist from "../components/RelativeList";

export default {
  components: {
    "menu-bar": menubar,
    "item-display": itemdisplay,
    "relative-list": relativelist
  }
};
</script>

<style scoped>
#item {
  background: #fffcf0;
}
</style>



