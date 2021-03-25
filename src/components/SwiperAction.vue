// 滑动事件的封装
<template>
  <view @touchstart="handleTouchstart" @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "SwiperAction",
  data() {
    return {
      startX: 0,
    };
  },
  methods: {
    handleTouchstart(event) {
      this.startX = event.changedTouches[0].clientX;
    },
    handleTouchend(event) {
      let direction = "";
      const endX = event.changedTouches[0].clientX;
      if (Math.abs(endX - this.startX) > 80) {
        direction = endX - this.startX > 0 ? "right" : "left";
        this.$emit("swiperAction", { direction });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>