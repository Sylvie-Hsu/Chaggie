<template>
  <div class="ui card fluid">
    <div class="content">
      <!-- <i class="right floated share square icon"></i> -->
      <router-link v-bind:to="'/item/'+item.id" style="color:black;font-weight:bold">
        <div class="header"># {{this.item.title}}</div>
      </router-link>
      <div class="description">
        <p>{{this.item.body}}</p>
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
