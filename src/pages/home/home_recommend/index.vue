<template>
  <!-- scroll-view标签：类似于滚动插件，但只需包起来给定滚动高度并增加属性scroll-y即可 -->
  <!-- 包含一个触底事件@scrolltolower -->
  <scroll-view scroll-y class="recommend_view" @scrolltolower="handleToLower">
    <view class="recommond_top">
      <view
        class="recommond_item"
        v-for="(item, index) in recommends"
        :key="index"
      >
        <image :src="item.thumb" mode="widthFix"></image>
      </view>
    </view>

    <view class="recommond_midden">
      <view class="recommond_midden_bar">
        <view class="recommond_midden_bar_monthes">{{ monthesTime }}</view>
        <view class="recommond_midden_bar_title">{{ monthes.title }}</view>
        <view class="recommond_midden_bar_more">更多 ></view>
      </view>
      <view class="recommond_midden_img">
        <view v-for="(item, index) in monthes.items" :key="index">
          <image
            mode="aspectFill"
            :src="item.img + item.rule.replace('$<Height>', 360)"
          ></image>
        </view>
      </view>
    </view>

    <view class="recommond_buttom">
      <view class="recommond_buttom_title"> <text>热门 </text></view>
      <view class="recommond_buttom_img">
        <view v-for="(item, index) in hots" :key="index">
          <image mode="aspectFill" :src="item.thumb"> </image> </view
      ></view>
    </view>
  </scroll-view>
</template>

<script>
// 引入第三方时间处理库
import moment from "moment";
export default {
  name: "HomeRecommend",
  data() {
    return {
      recommends: [],
      monthes: {},
      hots: [],
      params: {
        limit: 30,
        order: "hot",
        skip: 0,
      },
      hasMore: true,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    monthesTime() {
      return moment().format("MM/DD");
    },
  },
  methods: {
    getData() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params,
      }).then((result) => {
        if (this.recommends.length === 0) {
          this.recommends = result.res.homepage[1].items;
          this.monthes = result.res.homepage[2];
        }
        // 解构赋值：合并数组
        if (result.res.vertical.length === 0) {
          this.hasMore = false;
        } else {
          this.hots = [...this.hots, ...result.res.vertical];
        }
      });
    },
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getData();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend_view {
  height: calc(100vh - 36px);
}
.recommond_top {
  display: flex;
  flex-wrap: wrap;
  .recommond_item {
    flex: 0 1 50%;
    image {
      display: block;
      width: 100%;
    }
  }
}
.recommond_midden {
  .recommond_midden_bar {
    display: flex;
    height: 8vh;
    .recommond_midden_bar_monthes {
      flex: 0 1 20%;
      line-height: 8vh;
      color: $color;
      font-weight: 700;
    }
    .recommond_midden_bar_title {
      flex: 0 1 60%;
      line-height: 8vh;
    }
    .recommond_midden_bar_more {
      flex: 0 1 20%;
      text-align: right;
      line-height: 8vh;
      color: $color;
    }
  }
  .recommond_midden_img {
    display: flex;
    flex-wrap: wrap;
    > view {
      flex: 0 1 33.33%;
      image {
        display: block;
        width: 100%;
      }
    }
  }
}
.recommond_buttom {
  .recommond_buttom_title {
    padding-left: 2vw;
    height: 8vh;
    line-height: 8vh;
    text {
      padding-left: 2vw;
      border-left: 2vw solid $color;
    }
  }
  .recommond_buttom_img {
    display: flex;
    flex-wrap: wrap;
    > view {
      flex: 0 1 33%;
      image {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>