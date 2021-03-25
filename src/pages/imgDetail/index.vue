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
      <swiper-action @swiperAction="swiperAction">
        <image mode="widthFix" :src="imgDetail.newThumb"></image>
      </swiper-action>
    </view>

    <view class="user_rank">
      <view
        ><image src="~@/static/img/common/点赞.png"></image
        >{{ imgDetail.rank }}</view
      >
      <view><image src="~@/static/img/common/收藏.png"></image>收藏</view>
    </view>

    <view class="album_wrap" v-if="album.length">
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

    <comment :comment="hot">
      <template v-slot:comment_title>最热评论</template>
    </comment>

    <comment :comment="comment">
      <template v-slot:comment_title>最新评论</template>
    </comment>

    <view class="img_load">
      <view @click="handleDownload">下载图片</view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
import Comment from "@/components/Comment.vue";
import SwiperAction from "@/components/SwiperAction.vue";
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
      imgIndex: 0,
    };
  },
  components: {
    Comment,
    SwiperAction,
  },
  onLoad() {
    // 从全局获得数据
    const { imgIndex } = getApp().globalData;
    this.imgIndex = imgIndex;
    this.getData();
  },
  methods: {
    getData() {
      const { imgList } = getApp().globalData;
      this.imgDetail = imgList[this.imgIndex];
      // dom拿数据时onLoad还没到，此时拿不到imgDetail的数据，故要先组装一下
      if (this.imgDetail.rule.indexOf("$<Width>") !== -1) {
        this.imgDetail.newThumb = this.imgDetail.thumb;
      } else {
        this.imgDetail.newThumb =
          this.imgDetail.thumb + this.imgDetail.rule.replace(`$<Height>`, 360);
      }
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
      // 发送请求
      this.getComments(this.imgDetail.id);
    },
    // 评论的网络请求
    getComments(id) {
      this.request({
        url: `http://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`,
      }).then((result) => {
        this.album = result.res.album;
        this.hot = result.res.hot;
        this.comment = result.res.comment;
      });
    },
    // 滑动切换图片
    swiperAction(e) {
      const { imgList } = getApp().globalData;
      if (e.direction === "left" && this.imgIndex < imgList.length - 1) {
        this.imgIndex++;
        this.getData();
      } else if (e.direction === "right" && this.imgIndex > 0) {
        this.imgIndex--;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
    // 下载事件
    async handleDownload() {
      uni.showLoading({
        title: "下载中",
      });
      const result1 = await uni.downloadFile({ url: this.imgDetail.img });
      const { tempFilePath } = result1[1];
      await uni.saveImageToPhotosAlbum({
        filePath: tempFilePath,
      });
      uni.hideLoading();
      uni.showToast({
        title: "下载成功！",
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
  height: 5vh;
  border-bottom: 5px solid #eee;
  view {
    line-height: 5vh;
    &:nth-child(1),
    &:nth-child(2) {
      flex: 1;
      > image {
        padding: 0 5px;
        width: 15px;
        height: 15px;
        vertical-align: middle;
      }
    }
  }
}
.album_wrap {
  .album_title {
    margin: 1vh 0 1vh 1vw;
    padding-left: 2vw;
    height: 5vh;
    line-height: 5vh;
    border-left: 2vw solid $color;
  }
  .album_item {
    display: flex;
    position: relative;
    height: 30vw;
    border-bottom: 5px solid #eee;
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
.img_load {
  height: 13vh;
  width: 100%;
  > view {
    margin: 2vh 2vw;
    color: #fff;
    line-height: 9vh;
    font-weight: 700;
    text-align: center;
    background-color: $color;
  }
}
</style>