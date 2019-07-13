<template>
  <div class="ui cards">
    <div id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui yellow right ribbon label">小鸡词典</a>
        <div class="header"># {{this.mock.data.name}}</div>
        <div class="ui divider"></div>
        <div class="meta">{{this.mock.data.time}}</div>
        <div class="description">
          <p>{{this.mock.data.content}}</p>
        </div>
        <div class="tags">
          <a
            class="ui tag label blue mini"
            v-for="tag in mock.data.tagList"
            v-bind:key="tag"
          >{{tag}}</a>
        </div>
        <!-- <div class="ui divider"></div>
        <a class="ui yellow right ribbon label">小鸡词典</a>-->
      </div>
    </div>
    <div id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui pink right ribbon label">Bilibili</a>
        <div class="header"># {{this.mock.data.name}}</div>
        <div class="videos" v-for="video in mock.data.videoList" v-bind:key="video.video_id">
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
    <div id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui blue right ribbon label">Google</a>
        <div class="header"># {{this.mock.data.name}}</div>
        <div class="ui divider"></div>
        <div class="ui images">
          <img
            class="ui small rounded image"
            v-for="image in mock.data.imageList"
            v-bind:key="image"
            :src="image"
          />
        </div>
      </div>
    </div>
    <div id="itemdisplay" class="ui card">
      <div class="content">
        <a class="ui orange right ribbon label">微博</a>
        <div class="header"># {{this.mock.data.name}}</div>
        <div class="ui divider"></div>
        <div class="ui images">
          <div class="ui feed">
            <div class="event" v-for="weibo in mock.data.weiboList" v-bind:key="weibo">
              <div class="label">
                <img :src="weibo.avator" />
              </div>
              <div class="content">
                <div class="summary">
                  <a>{{weibo.user}}</a>
                  <div class="date">{{weibo.time}}</div>
                </div>
                <div class="extra text">{{weibo.content}}</div>
                <div class="meta">
                  <a class="like">
                    <i class="like icon"></i>
                    {{weibo.like}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      item: {},
      mock: {
        code: 0,
        data: {
          // Jikipedia data
          index: 8,
          name: "因果律武器",
          time: "2017-06-01",
          image: "",
          view: 2618,
          like: 9,
          dislike: 0,
          tagList: ["军事", "科技"],
          content:
            "比如能使飞机坠落的油价支配者发改委、或者可令航母起火的局座、还有飞龙骑脸怎么输。 ",
          // Bilibili data
          videoList: [
            {
              video_id: "14256416",
              title: "那些90后一听到就能跟着和的经典歌曲回忆杀",
              watch: "7.9万",
              subtitle: "3416",
              time: "2017-09-07",
              up: "Rebecca0320",
              description:
                "很怀念那个华语音乐的黄金时期，人手一个的MP3里承载了无数当时懵懂微涩的小心思和对于未来纯真美好的憧憬。这些歌相信不仅是我，很多同龄的伙伴如今再听到，还是会忍不住跟着轻轻哼唱，仿佛能随着歌声回到那无忧无虑的童年时代。"
            }
          ],
          // Google image data
          imageList: [
            "https://semantic-ui.com/images/avatar2/large/kristy.png",
            "https://semantic-ui.com/images/avatar2/large/matthew.png"
          ],
          // Weibo data
          weiboList: [
            {
              user: "扶他柠檬茶",
              avator:
                "https://tvax4.sinaimg.cn/crop.24.0.1194.1194.50/6909e891ly8fem3xf2fnaj20yi0x6jtr.jpg?Expires=1562879439&amp;ssig=dNNT%2Fn82x5&amp;KID=imgbed,tva",
              time: "今天12:00",
              like: "1234",
              repost: "1.3k",
              source: "weibo.com",
              content:
                "一想到自己以前的某些言行就想把自己掐死<br/>等等 不能掐死过去的自己啊 会触发因果律武器的（？）"
            },
            {
              user: "扶他柠檬茶",
              avator:
                "https://tvax4.sinaimg.cn/crop.24.0.1194.1194.50/6909e891ly8fem3xf2fnaj20yi0x6jtr.jpg?Expires=1562879439&amp;ssig=dNNT%2Fn82x5&amp;KID=imgbed,tva",
              time: "今天12:00",
              like: "1234",
              repost: "1.3k",
              source: "weibo.com",
              content:
                "一想到自己以前的某些言行就想把自己掐死<br/>等等 不能掐死过去的自己啊 会触发因果律武器的（？）"
            }
          ]
        }
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("http://jsonplaceholder.typicode.com/posts/" + this.id)
        .then(function(data) {
          return data.body;
        })
        .then(function(data) {
          console.log(data);
        });
    }
  }
};
</script>

<style scoped>
#itemdisplay {
  width: 100%;
}
.tags {
  margin: 10px 0 10px 0;
}
.video {
  width: 100%;
  height: 500px;
  border-radius: 8px;
}
</style>
