<template>
  <scroll-view
    enable-flex
    scroll-y
    class="img_list"
    @scrolltolower="handleScrolltolower"
  >
    <view class="img_item" v-for="(item, index) in imgData" :key="index">
      <go-detail :list="imgData" :index="index">
        <image :src="item.thumb" mode="widthFix"></image>
      </go-detail>
    </view>
  </scroll-view>
</template>

<script>
import GoDetail from "./goDetail.vue";
export default {
  name: "ImgeList",
  props: {
    imgData: {
      type: Array,
      default: [],
    },
  },
  components: {
    GoDetail,
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
.img_list {
  display: flex;
  flex-wrap: wrap;
  .img_item {
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