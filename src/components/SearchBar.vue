<template>
  <div id="search">
    <div class="ui category search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Search items..." v-on:keyup.enter="search" />
        <i class="search icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    search: function() {
      this.$router.push({ path: "/flow" });
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
}
@media (max-width: 280px) {
  .prompt {
    width: 200px;
    height: 36.5px;
  }
}
</style>


