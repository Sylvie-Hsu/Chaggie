<template>
  <div id="postitem" class="ui card">
    <div class="content">
      <div class="ui dividing header">创建词条</div>
      <form class="ui form" @keypress.enter.prevent="preventKey">
        <div class="ui two column grid">
          <div class="six wide column">
            <div class="imagedisplay">
              <img class="ui image fluid rounded" :src="item.imgLink" />
            </div>
            <div class="ui blue labels">
              <a class="ui label" v-for="tag in item.tagList" v-bind:key="tag">
                {{tag}}
                <i class="icon close" v-on:click.prevent="deleteItem(tag)"></i>
              </a>
            </div>
          </div>
          <div class="ten wide column">
            <div class="field">
              <label>标题</label>
              <input type="text" name="title" placeholder="Title" v-model.lazy="item.title" />
            </div>

            <div class="field">
              <label>图片链接</label>
              <input type="text" name="imgLink" placeholder="Link" v-model.lazy="item.imgLink" />
            </div>
            <div class="field">
              <label>内容</label>
              <textarea type="text" v-model.lazy.trim="item.content"></textarea>
            </div>
            <div class="field">
              <label>标签</label>
              <input
                type="text"
                name="tag"
                placeholder="Tags (Press enter)"
                v-on:keyup.enter="addTag"
              />
            </div>
            <button class="ui button" type="submit" v-on:click.prevent="postItem">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        title: "",
        imgLink: "https://semantic-ui.com/images/wireframe/image.png",
        content: "",
        tagList: []
      }
    };
  },
  methods: {
    postItem() {
      console.log(this.item);
    },
    preventKey() {
      return false;
    },
    addTag(e) {
      this.item.tagList.push(e.target.value);
      e.target.value = "";
    },
    deleteItem(tag) {
      this.item.tagList = this.item.tagList.filter(item => {
        return item != tag;
      });
    }
  }
};
</script>

<style scoped>
#postitem {
  width: 70%;
  left: 13%;
}
.imagedisplay {
  margin: 10px 0 10px 0;
}
</style>

