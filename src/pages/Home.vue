<template>
  <div id="home" class="ui container" :style="{height:height+'px'}">
    <div id="bg-container">
      <!-- <img id="logo" alt="logo" src="@/assets/Logo.png" /> -->
      <!-- <img id="font" alt="font" src="@/assets/Font.png" /> -->
      <img id="font" alt="font" src="@/assets/White.png" />
      <img id="leftDum" alt="leftDum" src="@/assets/OneDummy.png" />
      <img id="rightDum" alt="rightDum" src="@/assets/TwoDummy.png" />
      <search-bar id="searchbar"></search-bar>
    </div>
  </div>
</template>

<script>
import searchbar from "../components/SearchBar";

export default {
  data() {
    return {
      height: document.body.clientHeight - 1
    };
  },
  components: {
    "search-bar": searchbar
  }
};
</script>

<style>
#bg-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #fffcf0;
}
#bg-container img {
  position: absolute;
}
#logo {
  left: 5vh;
  right: 0;
  top: 5vh;
  margin: auto;
  max-height: 40vmin;
}
#font {
  width: 28%;
  left: -2vh;
  right: 0;
  top: 15vh;
  margin: auto;
  max-height: 40vmin;
}
#leftDum {
  left: 12vw;
  bottom: 5vh;
  margin: auto;
  max-width: 35vw;
  max-height: 70vh;
}
#rightDum {
  right: 10vw;
  bottom: 5vh;
  margin: auto;
  max-width: 35vw;
  max-height: 45vh;
}
#searchbar {
  position: absolute;
  top: 35vmin;
  left: 0;
  right: 0;
  width: max-content;
  margin: 5vmin auto auto auto;
}
#home {
  display: flex;
  width: "100%";
  justify-content: center;
  align-items: center;
}
</style>

