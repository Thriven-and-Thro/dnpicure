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
        <view v-if="current === 0"> </view>
        <view v-if="current === 1"> </view>
      </view>
    </view>

    <img-list :imgData="vertical" @handleScrolltolower="handleScrolltolower" />
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import GoDetail from "@/components/goDetail.vue";
import ImgList from "@/components/ImgList.vue";
export default {
  data() {
    return {
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" },
      ],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new",
      },
      id: 0,
      vertical: [],
      hasMore: true,
      getLoading: false,
    };
  },
  components: {
    uniSegmentedControl,
    GoDetail,
    ImgList,
  },
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  methods: {
    onClickItem(item) {
      if (this.current !== item.currentIndex) {
        this.current = item.currentIndex;
        this.params.skip = 0;
        this.vertical = [];
        this.hasMore = true;
        this.params.order = this.items[item.currentIndex].order;
        this.getList();
      }
    },
    getList() {
      this.getLoading = true;
      this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.params,
      }).then((result) => {
        if (result.res.vertical.length !== 0) {
          this.vertical = [...this.vertical, ...result.res.vertical];
        } else {
          this.hasMore = false;
        }
      });
      this.getLoading = false;
    },
    handleScrolltolower() {
      if (!this.getLoading) {
        if (this.hasMore) {
          this.params.skip += this.params.limit;
          this.getList();
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
scroll-view {
  height: calc(100vh - 36px);
}
@include tabbar;
</style>