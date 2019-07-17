<template>
  <div>
    <div v-if="!ifLoaded" class="ui icon message transition info">
      <i class="notched circle loading icon"></i>
      <div class="content">
        <div class="header">Just one second</div>
        <p>We're fetching that content for you.</p>
      </div>
    </div>
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
      ifLoaded: false
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
        .post(
          this.$apiPath + "/search",
          {
            key: this.$route.params.data,
            tag: "",
            page_number: 0,
            page_size: 1000,
            order_by: "",
            time_begin: "",
            time_end: ""
          },
          { emulateJSON: true }
        )
        .then(res => {
          this.items = res.body.data;
          console.log(this.items);
          this.ifLoaded = true;
        });
    }
  },
  watch: {
    $route: "getData"
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