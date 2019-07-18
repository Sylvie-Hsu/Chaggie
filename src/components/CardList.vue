<template>
  <div>
    <sui-dropdown
      button
      class="icon mini"
      floating
      icon="sort"
      labeled
      :options="options"
      search
      text="选择排序方式"
      v-model="current"
    />
    <a class="ui label" v-for="tag in searchTags" v-bind:key="tag">
      {{tag}}
      <i class="delete icon" v-on:click="deleteTag(tag)"></i>
    </a>
    <div id="cardlist" :style="{columnCount:columnCount }">
      <card-item class="carditem" v-for="item in items" v-bind:key="item.id" :item="item"></card-item>
    </div>
  </div>
</template>

<script>
import carditem from "./CardItem";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      windowSize: {
        height: null,
        width: null
      },
      columnCount: null,
      items: [],
      current: null,
      options: [
        { key: "view", text: "最多浏览", value: "view" },
        { key: "like", text: "最多喜欢", value: "like" },
        { key: "name", text: "名称最相关", value: "name" }
      ],
      searchTags: []
    };
  },
  components: {
    "card-item": carditem
  },
  created() {
    this.getData();
    this.renderColumns();
    window.addEventListener("resize", this.renderColumns);
  },
  methods: {
    getWindowSize() {
      this.windowSize.height = window.innerHeight;
      this.windowSize.width = window.innerWidth;
      // console.log(this.windowSize);
    },
    renderColumns() {
      this.getWindowSize();

      let cardWidth = 276;
      let maxColumn = 4;
      let columns = Math.floor((this.windowSize.width - 150) / cardWidth);
      this.columnCount = columns > maxColumn ? maxColumn : columns;
    },
    deleteTag(tag) {
      this.searchTags = this.searchTags.filter(item => {
        return item != tag;
      });
      this.getData();
    },
    getData() {
      this.$http
        .post(
          this.$apiPath + "/search",
          {
            key: this.$route.params.data,
            tag: "",
            page_number: 0,
            page_size: 25,
            order_by: JSON.stringify(this.searchTags),
            time_begin: "",
            time_end: ""
          },
          { emulateJSON: true }
        )
        .then(res => {
          this.items = res.body.data;
          console.log(this.items);
        });
    }
  },
  watch: {
    $route: "getData",
    current: function(val) {
      if (this.searchTags.indexOf(val) == -1) {
        this.searchTags.push(val);
      }
      this.getData();
    }
  }
};
</script>

<style scoped>
#cardlist {
  column-gap: 1vw;
  padding-top: 0.5vw;
}
.carditem {
  position: relative;
  width: 24vm;
  margin-bottom: 1vm;
  break-inside: avoid;
}
</style>