<template>
  <div class="ui card">
    <div class="content">
      <!-- <i class="right floated share square icon"></i> -->
      <div class="header"># {{this.item.title}}</div>
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
