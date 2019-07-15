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
            v-on:click="showSuggest"
            v-on:keyup.enter="search"
          />
          <i class="search icon"></i>
        </div>
      </div>
      <div id="menu" :class="menuClass">
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
export default {
  data() {
    return {
      searchData: "",
      menuClass: "menu transition hidden",
      suggests: [
        {
          name: "test text1",
          id: 1234
        },
        {
          name: "test text2",
          id: 1225
        },
        {
          name: "test text3",
          id: 1227
        }
      ]
    };
  },
  methods: {
    search: function() {
      this.$router.push({ path: "/flow/" + this.searchData });
    },
    showSuggest: function() {
      this.menuClass =
        this.menuClass == "menu transition visible"
          ? "menu transition hidden"
          : "menu transition visible";
    },
    completeSearch: function(id) {
      this.$router.push({ path: "/item/" + id });
    }
  }
};
</script>

<style scoped>
#search {
  justify-content: center;
  align-items: center;
}
@media (min-width: 525px) {
  .prompt {
    width: 350px;
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


