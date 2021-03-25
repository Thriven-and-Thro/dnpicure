<template>
  <!-- key值改变重新渲染 -->
  <swiper-action @swiperAction="swiperAction" :key="videoIndex">
    <view class="videoplay">
      <view class="videoplay_bg">
        <image mode="aspectFill" :src="videoList[videoIndex].img"></image>
      </view>

      <view class="videoplay_btn">
        <view @click="handleMuted">
          <image v-show="!muted" src="@/static/img/common/voice.png"></image>
          <image v-show="muted" src="@/static/img/common/mute.png"> </image
        ></view>
        <view class="videoplay_btn_share">
          <button open-type="share"></button>
          <image src="@/static/img/common/share.png"></image>
        </view>
      </view>

      <view class="videoplay_video">
        <video
          :src="videoList[videoIndex].video"
          objectFit="fill"
          :muted="muted"
        ></video>
      </view>

      <view class="videoplay_download">
        <view @click="handleDownload">下载高清</view>
      </view>
    </view>
  </swiper-action>
</template>

<script>
import SwiperAction from "@/components/SwiperAction.vue";
export default {
  components: {
    SwiperAction,
  },
  data() {
    return {
      videoList: [],
      videoIndex: 0,
      muted: false,
    };
  },
  onLoad() {
    const { videoList, videoIndex } = getApp().globalData;
    this.videoList = videoList;
    this.videoIndex = videoIndex;
  },
  methods: {
    // 声音
    handleMuted() {
      this.muted = !this.muted;
    },
    // 下载
    async handleDownload() {
      uni.showLoading({
        title: "下载中",
      });
      const { tempFilePath } = (
        await uni.downloadFile({
          url: this.videoList[videoIndex].video,
        })
      )[1];
      await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath,
      });
      uni.hideLoading();
      uni.showToast({
        title: "下载成功",
      });
    },
    // 上下滑动切换
    swiperAction(e) {
      if (
        e.direction === "next" &&
        this.videoList.length - 1 > this.videoIndex
      ) {
        this.videoIndex++;
      } else if (e.direction === "last" && this.videoIndex > 0) {
        this.videoIndex--;
      } else if (e.direction !== "left" && e.direction !== "right") {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.videoplay {
  position: relative;
  display: flex;
  flex-direction: column;
  .videoplay_bg {
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    image {
      height: 100%;
      filter: blur(20px);
    }
  }
  .videoplay_btn {
    flex: 0 1 40px;
    align-self: flex-end;
    width: 90px;
    image {
      margin: 5px;
      padding: 5px;
      height: 20px;
      width: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
    > view {
      display: inline-block;
    }
    .videoplay_btn_share {
      position: relative;
      > button {
        position: absolute;
        margin: 5px;
        padding: 5px;
        height: 30px;
        width: 30px;
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
  .videoplay_video {
    flex: 1;
    align-self: center;
    height: 70vh;
    width: 42vh;
    video {
      width: 100%;
      height: 100%;
    }
  }
  .videoplay_download {
    flex: 1;
    align-self: center;
    view {
      margin-top: 10px;
      width: 42vh;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 30px;
      border: 1px solid #fff;
    }
  }
}
</style>