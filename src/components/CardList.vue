<template>
  <div id="cardlist">
    <div class="ui link cards">
      <div v-for="item in items" v-bind:key="item.id" class="card">
        <div class="image">
          <img src="https://semantic-ui.com/images/avatar2/large/matthew.png" />
        </div>
        <div class="content">
          <div class="header">Matt Giampietro</div>
          <div class="meta">
            <a>Friends</a>
          </div>
          <div class="description">Matthew is an interior designer living in New York.</div>
        </div>
        <div class="extra content">
          <span class="right floated">Joined in 2013</span>
          <span>
            <i class="user icon"></i>
            75 Friends
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import carditem from "./CardItem";

export default {
  data() {
    return {
      items: []
    };
  },
  components: {
    "card-item": carditem
  },
  created() {
    this.$http
      .get("http://jsonplaceholder.typicode.com/posts")
      .then(function(data) {
        return data.body;
      })
      .then(function(data) {
        var itemsArray = [];
        for (let key in data) {
          data[key].id = key;
          itemsArray.push(data[key]);
        }
        this.items = itemsArray;
        console.log(this.items);
      });
  }
};
</script>

<style scoped>
</style>
