<template>
  <div class="ui card fluid">
    <div class="content">
      <!-- <i class="right floated share square icon"></i> -->
      <router-link v-bind:to="'/item/'+item.id" style="color:black;font-weight:bold">
        <h3 class="header"># {{this.item.name}}</h3>
        <div class="ui divider"></div>
      </router-link>
      <div class="description">
        <p class="font">{{this.item.content}}</p>
      </div>
    </div>
    <div class="extra content">
      <span class="left floated like">
        <i class="like icon"></i>
        Like
      </span>
      <span class="right floated paw">
        <i class="paw icon"></i>
        Dislike
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style scoped>
.font {
  font-size: 16px;
  line-height: 150%;
}
</style>

