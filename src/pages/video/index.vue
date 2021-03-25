<template>
  <view>
    <view class="tabbar">
      <view class="tabbar_control">
        <uni-segmented-control
          :current="current"
          :values="items.map((item) => item.title)"
          @clickItem="onClickItem"
          styleType="text"
          activeColor="#d4237a"
        ></uni-segmented-control>
        <view class="tabbar_search"
          ><image src="../../static/img/common/search.png"></image
        ></view>
      </view>
      <view class="content">
        <view v-if="current < 4">
          <video-main :urlobj="items[current]" ref="videoMain" />
        </view>
        <view v-if="current === 4"> </view>
      </view> </view
  ></view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import VideoMain from "./videoMain/VideoMain.vue";
export default {
  data() {
    return {
      items: [
        {
          title: "推荐",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
          params: { limit: 30, skip: 0, order: "hot" },
        },
        {
          title: "娱乐",
          url:
            "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
          params: { limit: 30, skip: 0, order: "hot" },
        },
        {
          title: "最新",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
          params: { limit: 30, skip: 0, order: "new" },
        },
        {
          title: "热门",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
          params: { limit: 30, skip: 0, order: "hot" },
        },
        {
          title: "分类",
          url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",
          params: {},
        },
      ],
      current: 0,
    };
  },
  components: {
    uniSegmentedControl,
    VideoMain,
  },
  methods: {
    onClickItem(item) {
      if (this.current !== item.currentIndex) {
        this.current = item.currentIndex;
        // 分类模块bug，不处理
        try {
          this.$refs.videoMain.onClickItem1();
        } catch {}
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@include tabbar;
</style>