<template>
  <div id="search-center">
    <div id="upload-box">
      <div id="upload-btn-parent" :style="{backgroundImage:'url(' + tmpUrl + ')'}">
        <input type="file" id="upload-btn" @change="selectImage" />
      </div>
      <!-- <a id="copy-btn" @click.prevent="uploadAndCopy"></a>
      <div v-if="imageUrl!==''" id="copy-links">
        <input aria-label="result-link" type="text" :value="imageUrl" />
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "imgBed",
  data() {
    return {
      tmpFile: {},
      tmpUrl:
        "https://chaggie-img-1257691686.cos.ap-shanghai.myqcloud.com/upload.png",
      imageUrl: ""
    };
  },
  methods: {
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
                  that.imageUrl =
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
                    that.imageUrl =
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
  }
};
</script>

<style scoped>
#search-center {
  width: max-content;
  margin: 0 auto;
}
#search-center div:first-child {
  margin: 0 auto 0 auto;
  width: 80vw;
  max-width: 400px;
}
#search-center div img {
  width: 100%;
}

#upload-box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#upload-btn-parent {
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 160px !important;
  height: 160px !important;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
#upload-btn {
  width: 160px !important;
  height: 160px !important;
  opacity: 0;
}
#copy-btn {
  height: 30px !important;
  width: 84px !important;
  background: url("../assets/copy.svg");
}

#copy-links {
  display: inline;
  width: 50vw;
  font-size: 0.5rem;
}
</style>
