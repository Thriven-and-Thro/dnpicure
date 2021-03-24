<template>
  <view>
    <view class="user_info">
      <view class="user_icon">
        <image mode="widthFix" :src="imgDetail.user.avatar"></image
      ></view>
      <view class="user_desc">
        <view class="user_name">{{ imgDetail.user.name || "匿名" }}</view>
        <view class="user_time">{{ imgDetail.cnTime }}</view></view
      >
    </view>

    <view class="high_img">
      <image mode="widthFix" :src="imgDetail.newThumb"></image>
    </view>

    <view class="user_rank">
      <view
        ><image src="~@/static/img/common/点赞.png"></image
        >{{ imgDetail.rank }}</view
      >
      <view><image src="~@/static/img/common/收藏.png"></image>收藏</view>
    </view>

    <view class="album_wrap" v-if="this.album.length !== 0">
      <view class="album_title">相关</view>
      <view class="album_item" v-for="(item, index) in album" :key="index">
        <view class="album_cover"
          ><image :src="item.cover" mode="aspectFill"></image
        ></view>
        <view class="album_info"
          ><view class="album_info_text">专辑</view
          ><view class="album_info_name">{{ item.name }}</view></view
        >
        <view class="album_info_icon">></view>
      </view>
    </view>

    <view class="comment_user">
      <view class="comment_title">最热评论</view>
      <view class="comment_item" v-for="(item, index) in hot" :key="index">
        <view class="comment_user_top">
          <view class="comment_user_top_img">
            <image :src="item.user.avatar"></image>
          </view>
          <view class="comment_user_top_name">{{ item.user.name }}</view>
          <view class="comment_user_top_time">{{ item.atime }}</view>
          <view class="user_badge">
            <image
              v-for="(item2, index) in item.user.title"
              :key="index"
              :src="item2.icon"
            ></image>
          </view>
        </view>
        <view class="comment_user_bottom">
          <view class="comment_user_bottom_content">{{}}</view>
          <view class="comment_user_bottom_rank">
            <image></image>
            {{}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
// 使用中文时间
moment.locale("zh-CN");
export default {
  name: "ImgDetail",
  data() {
    return {
      imgDetail: {},
      album: [],
      hot: [],
      comment: [],
    };
  },
  onLoad() {
    // 从全局获得数据
    const { imgList, imgIndex } = getApp().globalData;
    this.imgDetail = imgList[imgIndex];
    // dom拿数据时onLoad还没到，此时拿不到imgDetail的数据，故要先组装一下
    if (this.imgDetail.rule.indexOf("$<Width>") !== -1) {
      this.imgDetail.newThumb = this.imgDetail.thumb;
    } else {
      this.imgDetail.newThumb =
        this.imgDetail.thumb + this.imgDetail.rule.replace(`$<Height>`, 360);
    }
    // 将时间戳转换成相对时间
    this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
    // 发送请求
    this.getComments(this.imgDetail.id);
  },
  methods: {
    // 评论的网络请求
    getComments(id) {
      this.request({
        url: `http://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`,
      }).then((result) => {
        console.log(result);
        this.album = result.res.album;
        this.hot = result.res.hot;
        this.comment = result.res.comment;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user_info {
  display: flex;
  align-items: center;
  height: 10vh;
  width: 100%;
  .user_icon {
    flex: 0 1 20%;
    text-align: center;
    > image {
      width: 70%;
      height: 70%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .user_desc {
    flex: 0 1 80%;
    .user_time {
      font-size: 14px;
      color: #999;
    }
  }
}
.high_img {
  width: 100%;
  > image {
    width: 100%;
  }
}
.user_rank {
  display: flex;
  text-align: center;
  align-items: center;
  height: 4vh;
  border-bottom: 1px solid #ddd;
  view {
    line-height: 4vh;
    &:nth-child(1),
    &:nth-child(2) {
      flex: 1;
      > image {
        padding: 0 5px;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
  }
}
.album_wrap {
  .album_title {
    padding: 2vw;
    height: 5vh;
    line-height: 5vh;
  }
  .album_item {
    display: flex;
    position: relative;
    height: 30vw;
    border-bottom: 1px solid #bbb;
    .album_cover {
      flex: 0 1 30%;
      align-items: center;
      text-align: center;
      > image {
        width: 90%;
        height: 90%;
      }
    }
    .album_info {
      flex: 0 1 70%;
      .album_info_text {
        width: 40px;
        height: 20px;
        font-size: 14px;
        text-align: center;
        color: #fff;
        background-color: $color;
      }
    }
    .album_info_icon {
      position: absolute;
      right: 10vw;
      top: 50%;
      font-size: 5vh;
      color: #999;
      transform: translateY(-50%);
    }
  }
}
</style>