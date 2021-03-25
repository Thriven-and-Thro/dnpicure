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
      startY: 0,
    };
  },
  methods: {
    // 获取起始位置
    handleTouchstart(event) {
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    },
    // 获取离开位置
    handleTouchend(event) {
      let direction = "";
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;
      if (Math.abs(endX - this.startX) > 80) {
        direction = endX - this.startX > 0 ? "right" : "left";
        this.$emit("swiperAction", { direction });
      }
      if (Math.abs(endY - this.startY) > 80) {
        direction = endY - this.startY > 0 ? "last" : "next";
        this.$emit("swiperAction", { direction });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>