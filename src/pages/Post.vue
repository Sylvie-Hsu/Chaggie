<template>
  <div id="post">
    <div class="ui container" :style="{height:height+'px'}">
      <menu-bar></menu-bar>
      <post-item></post-item>
    </div>
  </div>
</template>

<script>
import menubar from "../components/MenuBar";
import postitem from "../components/PostItem";

export default {
  data() {
    return {
      height: document.body.clientHeight - 1
    };
  },
  components: {
    "menu-bar": menubar,
    "post-item": postitem
  }
};
</script>

<style scoped>
#post {
  background: #fffcf0;
}
</style>

