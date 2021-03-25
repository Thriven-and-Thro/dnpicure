<template>
  <view class="category_list">
    <navigator
      v-for="(item, index) in category"
      :key="index"
      class="category_item"
      :url="`/pages/imgCategory/index?id=${item.id}`"
    >
      <image mode="heightFix" :src="item.cover"></image>
      <view class="category_name">{{ item.name }}</view>
    </navigator>
  </view>
</template>

<script>
export default {
  name: "HomeCategory",
  data() {
    return {
      category: [],
    };
  },
  mounted() {
    uni.setNavigationBarTitle({ title: "分类" });
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/vertical/category",
      }).then((result) => {
        this.category = result.res.category;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category_list {
  display: flex;
  flex-wrap: wrap;
  .category_item {
    position: relative;
    flex: 0 1 33.33%;
    height: 33.33vw;
    overflow: hidden;
    border: 2px solid #fff;
    box-sizing: border-box;
    image {
      position: relative;
      right: 50%;
      transform: translateX(25%);
      height: 33.33vw;
    }

    .category_name {
      position: absolute;
      left: 2px;
      bottom: 2px;
      color: #fff;
      // 颜色渐变
      background-image: linear-gradient(
        to right top,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0)
      );
    }
  }
}
</style>