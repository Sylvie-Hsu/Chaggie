<template>
  <div v-if="ifLoad" class="ui cards fluid">
    <div id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui yellow right ribbon label">小鸡词典</a>
        <div class="header">
          <i class="quote left icon" style="color:#fcd001"></i>
          {{this.item.name}}
        </div>
        <div class="ui divider"></div>
        <div class="meta">{{this.item.time}}</div>
        <div class="description font">
          <p>{{this.item.content}}</p>
        </div>
        <img
          class="ui centered fluid rounded image"
          :src="item.image"
          style="padding:2% 10% 2% 10%;max-height:600px"
        />
        <div class="tags">
          <router-link v-for="tag in item.tagList" v-bind:key="tag" v-bind:to="'/flow/'+tag+'/...'">
            <a class="ui tag label Teal">{{tag}}</a>
          </router-link>
        </div>
      </div>
      <div class="extra content">
        <span class="left floated like" v-on:click="addLikes">
          <i :class="like"></i>
          {{this.item.like}} Likes
        </span>
        <span class="right floated paw">
          <i class="eye icon"></i>
          {{this.item.view}} Views
        </span>
      </div>
    </div>
    <div v-if="this.item.videoList.length!=0" id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui pink right ribbon label">Bilibili</a>
        <div class="header">
          <i class="quote left icon" style="color:#fcd001"></i>
          {{this.item.name}}
        </div>
        <div class="videos" v-for="video in item.videoList" v-bind:key="video.video_id">
          <div class="ui divider"></div>
          <h4>{{video.title}}</h4>
          <iframe
            class="video"
            :src="'//player.bilibili.com/player.html?aid='+video.video_id"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
          ></iframe>
        </div>
      </div>
    </div>
    <div v-if="this.item.imageList.length!=0" id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui blue right ribbon label">Google</a>
        <div class="header">
          <i class="quote left icon" style="color:#fcd001"></i>
          {{this.item.name}}
        </div>
        <div class="ui divider"></div>
        <div class="ui images">
          <img
            class="ui small rounded image"
            v-for="image in item.imageList"
            v-bind:key="image"
            :src="'https://meme-1259654642.cos.ap-chengdu.myqcloud.com/'+image"
          />
        </div>
      </div>
    </div>
    <div v-if="this.item.weiboList.length!=0" id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui orange right ribbon label">微博</a>
        <div class="header">
          <i class="quote left icon" style="color:#fcd001"></i>
          {{this.item.name}}
        </div>
        <div class="ui divider"></div>
        <div class="ui images">
          <div class="ui feed">
            <div class="event" v-for="weibo in item.weiboList" v-bind:key="weibo.time">
              <div class="label">
                <img :src="weibo.avator" />
              </div>
              <div class="content">
                <div class="summary">
                  <a>{{weibo.user}}</a>
                  <div class="date">{{weibo.time}}</div>
                </div>
                <div class="font extra text">{{weibo.content}}</div>
                <!-- <div class="extra images">
                  <a>
                    <img src="https://semantic-ui.com/images/wireframe/image.png" />
                  </a>
                  <a>
                    <img src="https://semantic-ui.com/images/wireframe/image.png" />
                  </a>
                </div>-->
                <div class="meta">
                  <a class="like">
                    <i class="like icon"></i>
                    {{weibo.like}}
                  </a>
                  <a class="share">
                    <i class="share square icon"></i>
                    {{weibo.repost}}
                  </a>
                  <a class="comment">
                    <i class="comment alternate icon"></i>
                    {{weibo.comment}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui purple right ribbon label">词云</a>
        <div class="header">
          <i class="quote left icon" style="color:#fcd001"></i>
          {{this.item.name}}
        </div>
        <div class="ui divider"></div>
        <!-- <wordcloud nameKey="tagName" valueKey="hot" :data="item.wordlist" :color="myColor" /> -->
        <img
          class="ui fluid rounded image"
          :src="'https://meme-1259654642.cos.ap-chengdu.myqcloud.com/'+this.item.wordCloud"
        />
      </div>
    </div>
  </div>
</template>

<script>
import wordcloud from "vue-wordcloud";

export default {
  components: {
    wordcloud
  },
  data() {
    return {
      item: {},
      ifLoad: false,
      like: "like icon",
      liked: false,
      myColor: [
        "#4E4F97",
        "#8F77B5",
        "#6A4C9C",
        "#8A6BBE",
        "#66327C",
        "#4A225D",
        "#77428D",
        "#986DB2",
        "#B28FCE"
      ]
      //     wordlist: [
      //       { tagName: "徐霄雯", hot: 56 },
      //       { tagName: "徐霄雯2", hot: 5 },
      //       { tagName: "徐霄雯3", hot: 6 },
      //       { tagName: "霄雯许", hot: 6 },
      //       { tagName: "徐雯", hot: 56 },
      //       { tagName: "徐霄", hot: 16 },
      //       { tagName: "霄雯", hot: 46 },
      //       { tagName: "徐徐雯", hot: 26 },
      //       { tagName: "徐雯雯", hot: 46 },
      //       { tagName: "霄雯雯", hot: 16 }
      //     ]
      //   }
      // }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .post(
          this.$apiPath + "/entry",
          {
            id: this.$route.params.id,
            video_limit: 3,
            img_limit: 4,
            weibo_limit: 5
          },
          { emulateJSON: true }
        )
        .then(res => {
          var tmp = JSON.parse(res.bodyText);
          this.item = tmp.data.pop();
          console.log(this.item);
          this.ifLoad = true;
        });

      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
    addLikes() {
      if (this.liked == false) {
        this.$http
          .post(
            this.$apiPath + "/vote",
            {
              id: this.item.id,
              like: true
            },
            { emulateJSON: true }
          )
          .then(res => {
            console.log(res.body.data);
          });
      }
      this.item.like =
        this.liked == false ? this.item.like + 1 : this.item.like - 1;
      this.liked = this.liked ? false : true;
      this.like = this.like === "like icon" ? "like red icon" : "like icon";
    }
  },
  watch: {
    $route: "getData"
  }
};
</script>

<style scoped>
#itemdisplay {
  width: 70%;
  left: 13%;
}
.tags {
  margin: 10px 0 10px 0;
}
.video {
  width: 100%;
  height: 500px;
  border-radius: 8px;
}
.font {
  font-size: 1.2rem;
  line-height: 1.8rem;
}
</style>
