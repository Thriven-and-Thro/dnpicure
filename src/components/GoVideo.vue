<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "GoVideo",
  props: {
    list: Array,
    index: Number,
  },
  methods: {
    handleClick() {
      // 设置全局数据
      getApp().globalData.videoList = this.list;
      getApp().globalData.videoIndex = this.index;
      uni.navigateTo({
        url: "/pages/videoPlay/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>