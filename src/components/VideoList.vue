<template>
  <scroll-view
    enable-flex
    scroll-y
    class="video_list"
    @scrolltolower="handleScrolltolower"
  >
    <view class="video_item" v-for="(item, index) in videoData" :key="index">
      <go-video :list="videoData" :index="index">
        <image :src="item.img" mode="widthFix"></image>
      </go-video>
    </view>
  </scroll-view>
</template>

<script>
import GoVideo from "./GoVideo.vue";
export default {
  name: "VideoList",
  components: {
    GoVideo,
  },
  props: {
    videoData: {
      type: Array,
      default: [],
    },
  },
  methods: {
    handleScrolltolower() {
      this.$emit("handleScrolltolower");
    },
  },
};
</script>

<style lang="scss" scoped>
scroll-view {
  height: calc(100vh - 36px);
}
.video_list {
  display: flex;
  flex-wrap: wrap;
  .video_item {
    position: relative;
    flex: 0 1 33.33%;
    height: 50vw;
    overflow: hidden;
    border: 2px solid #ffffff;
    box-sizing: border-box;
    image {
      width: 100%;
    }
  }
}
</style>