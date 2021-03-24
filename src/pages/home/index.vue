<template>
  <view>
    <template>
      <view>
        <view class="home_tar">
          <view class="home_tar_control">
            <uni-segmented-control
              :current="current"
              :values="items.map((item) => item.title)"
              @clickItem="onClickItem"
              styleType="text"
              activeColor="#d4237a"
            ></uni-segmented-control>
          </view>
          <view class="home_tar_search"
            ><image src="../../static/img/common/search.png"></image
          ></view>
        </view>
        <view class="content">
          <view v-if="current === 0"> <home-recommend /> </view>
          <view v-if="current === 1"> <home-category /> </view>
          <view v-if="current === 2"> <home-new /> </view>
          <view v-if="current === 3"> <home-albue /> </view>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import HomeRecommend from "./home_recommend/index";
import HomeCategory from "./home-category/index";
import HomeNew from "./home-new/index";
import HomeAlbue from "./home-albue/index";
import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
  components: {
    HomeRecommend,
    HomeCategory,
    HomeNew,
    HomeAlbue,
    uniSegmentedControl,
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      current: 0,
    };
  },
  methods: {
    onClickItem(item) {
      // 必须使用currentIndex，是已定义的值
      if (this.current !== item.currentIndex) {
        this.current = item.currentIndex;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home_tar {
  position: relative;
  width: 100%;
  .home_tar_control {
    margin: 0 auto;
    width: 60%;
  }
  .home_tar_search {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 25px;
    height: 25px;
    z-index: 10;
    image {
      width: 25px;
      height: 25px;
    }
  }
}
</style>