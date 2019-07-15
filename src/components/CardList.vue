<template>
  <div id="cardlist" :style="{columnCount:columnCount }">
    <card-item class="carditem" v-for="item in items" v-bind:key="item.id" :item="item"></card-item>
  </div>
</template>

<script>
import carditem from "./CardItem";

export default {
  data() {
    return {
      windowSize: {
        height: null,
        width: null
      },
      columnCount: null,
      items: []
    };
  },
  components: {
    "card-item": carditem
  },
  created() {
    this.getData();
    this.renderColumns();
    window.addEventListener("resize", this.renderColumns);
    console.log(this.$route.params.tag);
    console.log(this.$route.params.data);
  },
  methods: {
    getWindowSize() {
      this.windowSize.height = window.innerHeight;
      this.windowSize.width = window.innerWidth;
      console.log(this.windowSize);
    },
    renderColumns() {
      this.getWindowSize();

      let cardWidth = 276;
      let maxColumn = 4;
      let columns = Math.floor((this.windowSize.width - 150) / cardWidth);
      this.columnCount = columns > maxColumn ? maxColumn : columns;
    },
    getData() {
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
  }
};
</script>

<style scoped>
#cardlist {
  column-gap: 0.5vw;
  padding-top: 0.5vw;
}
.carditem {
  position: relative;
  width: 24vm;
  margin-bottom: 1vm;
  break-inside: avoid;
}
</style>