<template>
  <div id="flow" class="ui container">
    <menu-bar></menu-bar>
    <post-item></post-item>
  </div>
</template>

<script>
import menubar from "../components/MenuBar";
import postitem from "../components/PostItem";

export default {
  components: {
    "menu-bar": menubar,
    "post-item": postitem
  }
};
</script>
