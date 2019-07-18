<template>
  <div id="search">
    <div class="ui dropdown">
      <div class="ui category search">
        <div class="ui icon input transparent" style="border-bottom:1px solid rgba(0,0,0,.3)">
          <input
            class="prompt"
            type="text"
            placeholder="Search items..."
            v-model="searchData"
            @focus="showSuggest"
            @blur="showSuggest"
            v-on:keyup.enter="search"
          />
        </div>
        <i class="search icon" v-on:click="search"></i>
      </div>
      <div id="menu" :class="menuClass">
        <div v-if="inTag&&searchData" class="item" v-on:click="searchInTag">
          {{searchData}}
          <button
            class="mini ui button"
            id="searchjump"
          >Search in #{{this.$route.params.tag}}#</button>
        </div>
        <div v-if="inTag&&searchData" class="item" v-on:click="search">
          {{searchData}}
          <button class="mini ui button" id="searchjump">Search in All</button>
        </div>
        <div
          class="item"
          v-for="suggest in suggests"
          v-bind:key="suggest.id"
          :data-value="suggest.id"
          v-on:click="completeSearch(suggest.id)"
        >{{suggest.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      searchData: "",
      inTag: false,
      menuClass: "menu transition hidden",
      suggests: []
    };
  },
  created() {
    this.checkInTag();
  },
  methods: {
    search: function() {
      this.$router.push({ path: "/flow/" + this.searchData });
    },
    searchInTag: function() {
      this.$router.push({
        path: "/flow/" + this.$route.params.tag + "/" + this.searchData
      });
    },
    showSuggest: function() {
      setTimeout(() => {
        this.menuClass =
          this.menuClass == "menu transition visible"
            ? "menu transition hidden"
            : "menu transition visible";
      }, 500);
      this.$http
        .post(
          this.$apiPath + "/recommend",
          {
            input: this.searchData,
            limit: 10
          },
          { emulateJSON: true }
        )
        .then(res => {
          console.log(res.body);
          this.suggests = res.body.data;
        });
    },
    completeSearch: function(id) {
      this.$router.push({ path: "/item/" + id });
    },
    checkInTag: function() {
      console.log(this.$route.params.tag);
      if (this.$route.params.tag !== undefined) {
        this.inTag = true;
      } else {
        this.inTag = false;
      }
    }
  },
  watch: {
    $route: "checkInTag",
    searchData: function(val) {
      console.log(val);
      this.$http
        .post(
          this.$apiPath + "/recommend",
          {
            input: this.searchData,
            limit: 10
          },
          { emulateJSON: true }
        )
        .then(res => {
          console.log(res.body);
          this.suggests = res.body.data;
        });
    }
  }
};
</script>

<style scoped>
#search {
  justify-content: center;
  align-items: center;
}
#searchjump {
  float: right;
  height: 27px;
  padding: 5px 10px 5px 10px;
  font-size: 12px;
}
@media (min-width: 525px) {
  .prompt {
    width: 330px;
    height: 36.5px;
  }
  #menu {
    width: 350px;
  }
}
@media (max-width: 280px) {
  .prompt {
    width: 200px;
    height: 36.5px;
  }
  #menu {
    width: 200px;
  }
}
</style>


