<template>
  <scroll-view scroll-y @scrolltolower="handleToLower">
    <view>
      <!-- 自动播放等属性 -->
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="(item, index) in banner" :key="index">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>

    <view class="home_albue_middle">
      <navigator
        class="home_albue_middle_item"
        v-for="(item, index) in album"
        :key="index"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="home_albue_middle_item_img">
          <image mode="aspectFill" :src="item.cover"></image>
        </view>
        <view class="home_albue_middle_item_content">
          <view class="home_albue_middle_item_content_title">{{
            item.name
          }}</view>
          <view class="home_albue_middle_item_content_p">{{ item.desc }}</view>
          <view class="home_albue_middle_item_content_btn">+关注</view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: "HomeAlbue",
  data() {
    return {
      params: {
        limit: 15,
        order: "new",
        skip: 0,
      },
      banner: [],
      album: [],
      hasMore: true,
      getLoading: false,
    };
  },
  mounted() {
    uni.setNavigationBarTitle({ title: "专辑" });
    this.getData();
  },
  methods: {
    getData() {
      this.getLoading = true;
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params,
      }).then((result) => {
        if (this.banner.length === 0) {
          this.banner = result.res.banner;
        }
        if (result.res.album === 0) {
          this.hasMore = false;
        } else {
          this.album = [...this.album, ...result.res.album];
        }
        this.getLoading = false;
      });
    },
    handleToLower() {
      if (this.getLoading === false) {
        if (this.hasMore === true) {
          this.params.skip += this.params.limit;
          this.getData();
        } else {
          uni.showToast({
            title: "没有数据了",
            icon: "none",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin swiper_img {
  width: 100%;
  // 根据计算出合适的比例
  height: calc(100vw / 2.3);
}
scroll-view {
  height: calc(100vh - 36px);
}
swiper {
  @include swiper_img;
  swiper-item {
    image {
      @include swiper_img;
    }
  }
}
.home_albue_middle {
  .home_albue_middle_item {
    display: flex;
    position: relative;
    flex-wrap: wrap;
    height: 25vh;
    border-bottom: 1px solid #ddd;
    .home_albue_middle_item_img {
      flex: 0 1 35%;
      height: 100%;
      image {
        display: block;
        margin: 1.25vh auto;
        width: 95%;
        height: 90%;
      }
    }
    .home_albue_middle_item_content {
      flex: 0 1 65%;
      min-width: 0;
      .home_albue_middle_item_content_title {
        margin: 2vw 2vh;
        font-size: 5vw;
        font-weight: 700;
      }
      .home_albue_middle_item_content_p {
        margin: 2vw 2vh;
        font-size: 3vw;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .home_albue_middle_item_content_btn {
        position: absolute;
        bottom: 2vh;
        right: 2vh;
        padding: 1vw;
        font-size: 4vw;
        color: $color;
        border: 1px solid $color;
      }
    }
  }
}
</style>