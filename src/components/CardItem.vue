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
      <img class="ui fluid image" :src="item.image" />
    </div>
    <div class="extra content">
      <span class="left floated like" v-on:click="addLikes">
        <i :class="like"></i>
        {{this.item.like}} Likes
      </span>
      <span class="right floated paw">
        <i class="eye icon"></i>
        {{this.item.view}} Views
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      like: "like icon",
      liked: false
    };
  },
  methods: {
    addLikes() {
      this.item.like =
        this.liked == false ? this.item.like + 1 : this.item.like - 1;
      this.liked = this.liked ? false : true;
      this.like = this.like === "like icon" ? "like red icon" : "like icon";
    }
  }
};
</script>

<style scoped>
.font {
  font-size: 1.2rem;
  line-height: 1.8rem;
}
</style>

