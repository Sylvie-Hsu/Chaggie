<template>
  <div>
    <div v-if="!ifSuccess" id="postitem" class="ui card">
      <div class="content">
        <div class="ui dividing header">创建词条</div>
        <form class="ui form" @keypress.enter.prevent="preventKey">
          <div class="ui two column grid">
            <div class="six wide column">
              <a href="https://zjuqsc.top/imgbed/">
                <div class="imagedisplay">
                  <img class="ui image fluid rounded" :src="item.imgLink" />
                </div>
              </a>
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
                <div class="ui right labeled left icon input">
                  <i class="tags icon"></i>
                  <input type="text" name="tag" placeholder="Enter tags" v-on:keyup.enter="addTag" />
                  <a class="ui tag label">标签</a>
                </div>
                <!-- <label>标签</label>
              <input
                type="text"
                name="tag"
                placeholder="Tags (Press enter)"
                v-on:keyup.enter="addTag"
                />-->
              </div>
              <button class="ui button" type="submit" v-on:click.prevent="postItem">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-if="ifSuccess">
      <img class="ui centered image pic" src="@/assets/OneDummy.png" />
      <div class="ui icon success message">
        <i class="check circle outline icon"></i>
        <div class="content">
          <div class="header">恭喜您！</div>
          <p>您已经成功创建该词条，请等待管理员审核哦~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      ifSuccess: false,
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
      this.$http
        .post(
          this.$apiPath + "/create",
          {
            name: this.item.title,
            tag_list: JSON.stringify(this.item.tagList),
            content: this.item.content,
            img_url: this.item.imgLink
          },
          { emulateJSON: true }
        )
        .then(res => {
          console.log(res.body);
          if (res.body.code == "0") {
            this.ifSuccess = true;
          }
        });
    },
    preventKey() {
      return false;
    },
    addTag(e) {
      if (this.item.tagList.indexOf(e.target.value) == -1) {
        this.item.tagList.push(e.target.value);
      }
      e.target.value = "";
    },
    deleteItem(tag) {
      this.item.tagList = this.item.tagList.filter(item => {
        return item != tag;
      });
    }
  },
  watch: {
    ifSuccess: function() {
      setTimeout(() => {
        this.$router.push({ path: "/flow/" });
      }, 3000);
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
.pic {
  height: 37rem;
}
</style>

