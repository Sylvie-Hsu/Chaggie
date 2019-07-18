<template>
  <div>
    <div v-if="!ifSuccess" id="postitem" class="ui card">
      <div class="content">
        <div class="ui dividing header">创建词条</div>
        <form class="ui form" @keypress.enter.prevent="preventKey">
          <div class="ui two column grid">
            <div class="six wide column">
              <div class="imagedisplay">
                <img class="ui image fluid rounded" :src="item.imgLink" />
              </div>
              <div>
                <div class="ui fluid button" style="margin:0 0 10px 0">
                  <input id="inputFile" type="file" @change="selectImage" />
                  <i class="upload icon"></i>上传图片
                </div>
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
      },
      tmpFile: {},
      tmpUrl:
        "https://chaggie-img-1257691686.cos.ap-shanghai.myqcloud.com/upload.png",
      imageUrl: ""
    };
  },
  created() {
    window.PostItem = this;
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
                  that.item.imgLink =
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
                    that.item.imgLink =
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
#inputFile {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>

