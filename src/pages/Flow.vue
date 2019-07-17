<template>
  <div id="flow">
    <div class="ui container">
      <menu-bar></menu-bar>
      <card-list></card-list>
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
import cardlist from "../components/CardList";
import relativelist from "../components/RelativeList";

export default {
  components: {
    "menu-bar": menubar,
    "card-list": cardlist,
    "relative-list": relativelist
  }
};
</script>

<style scoped>
#flow {
  background: #fffcf0;
}
</style>


