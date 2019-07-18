<template>
  <div>
    <div class="row">
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
      <button class="mini ui button" v-on:click="toggle" style="float:right">
        <i class="image icon"></i>图片搜索
      </button>
    </div>
    <div>
      <sui-modal v-model="open">
        <sui-modal-header>图片上传</sui-modal-header>
        <sui-modal-content image>
          <sui-image wrapped size="medium" :src="imgLink" />
          <!-- <input id="inputFile" type="file" @change="selectImage" /> -->
          <sui-modal-description>
            <sui-header>请上传图片以进行图片搜索哦</sui-header>
            <p>图片上传有两种方式：点击下方选择图片上传本地图片或在输入框内复制图片链接。</p>
            <sui-form>
              <sui-form-field>
                <label>图片链接</label>
                <input placeholder="Image Link" v-model="imgLink" />
                <input id="inputFile" type="file" @change="selectImage" />
              </sui-form-field>
            </sui-form>
          </sui-modal-description>
        </sui-modal-content>
        <sui-modal-actions>
          <sui-button positive @click.native="toggle">OK</sui-button>
        </sui-modal-actions>
      </sui-modal>
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
      current: null,
      options: [
        { key: "view", text: "最多浏览", value: "view" },
        { key: "like", text: "最多喜欢", value: "like" },
        { key: "name", text: "名称最相关", value: "name" }
      ],
      searchTags: [],
      open: false,
      imgLink: "https://semantic-ui.com/images/avatar2/large/kristy.png"
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
    toggle() {
      if (this.open == true) this.sendImageSearch();
      this.open = !this.open;
    },
    sendImageSearch() {
      this.$http
        .post(
          this.$apiPath + "/imgsearch",
          {
            url: this.imgLink,
            n: 10
          },
          { emulateJSON: true }
        )
        .then(res => {
          console.log(res.body);
        });
    },
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
    },
    selectImage: function(e) {
      if (e.target.files.length > 0) {
        // 获取目前上传的文件
        this.tmpFile = e.target.files[0]; // 文件大小校验的动作
        if (this.tmpFile.size > 1024 * 1024 * 2) {
          alert("图片大小不能超过 2MB!");
          return false;
        }
        if (this.tmpFile.type.indexOf("image") !== 0) {
          alert("目标并非图片");
          return false;
        }
        this.tmpUrl = (window.URL || window.webkitURL).createObjectURL(
          this.tmpFile
        );
        this.imageUrl = "";
        // (window.URL||window.webkitURL).revokeObjectURL(this.tmpUrl);
      }
      this.uploadAndCopy();
    },
    uploadAndCopy: function() {
      if (this.imageUrl !== "") return;
      let cos = this.$cos;
      if (this.tmpFile.name) {
        let that = this;
        let name = new Buffer(
          this.tmpFile.name.substr(0, this.tmpFile.name.lastIndexOf(".")),
          "ascii"
        ).toString("base64");
        let suffixName = this.tmpFile.name.substr(
          this.tmpFile.name.lastIndexOf("."),
          this.tmpFile.name.length
        );
        cos.getBucket(
          {
            Bucket: "chaggie-img-1257691686",
            Region: "ap-shanghai",
            Prefix: "imgBed/" + name // 这里传入列出的文件前缀
          },
          function(err, data) {
            if (err) console.log(err);
            else {
              if (data.Contents.length > 0) {
                let lastOne = data.Contents[data.Contents.length - 1].Key;
                if (
                  lastOne.substr(7) === name + suffixName &&
                  data.Contents[data.Contents.length - 1].Size ===
                    that.tmpFile.size.toString()
                ) {
                  that.imgLink =
                    "https://chaggie-img-1257691686.cos.ap-shanghai.myqcloud.com/imgBed/" +
                    name +
                    suffixName;
                  return false;
                }
                name = lastOne.substr(7, lastOne.lastIndexOf(".") - 7) + "=";
              }
              cos.putObject(
                {
                  Bucket: "chaggie-img-1257691686",
                  Region: "ap-shanghai",
                  Key: "imgBed/" + name + suffixName,
                  StorageClass: "STANDARD",
                  Body: that.tmpFile
                },
                function(err, data) {
                  if (err) console.log(err);
                  else {
                    that.imgLink =
                      "https://chaggie-img-1257691686.cos.ap-shanghai.myqcloud.com/imgBed/" +
                      name +
                      suffixName;
                  }
                }
              );
            }
          }
        );
      } else {
        alert("还未选择图片呢");
      }
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
#inputFile {
  /* position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%; */
  /* opacity: 0; */
}
</style>