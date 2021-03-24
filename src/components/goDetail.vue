<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "GoDeatil",
  props: {
    list: Array,
    index: Number,
  },
  methods: {
    handleClick() {
      // 设置全局数据
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = this.index;
      uni.navigateTo({
        url: "/pages/imgDetail/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>