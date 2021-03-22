<template>
  <view>
    <view class="album_top">
      <image mode="widthFix" :src="album.cover"></image>
      <view class="album_top_info">
        <view class="album_top_info_title">{{ album.name }}</view>
        <view class="album_top_info_btn">
          <view>关注专辑</view>
        </view>
      </view>
    </view>

    <view class="album_comment">
      <view class="album_comment_author">
        <view class="album_comment_author_img">
          <image :scr="album.user.avatar"></image
        ></view>
        <text>{{ album.user.name }}</text>
      </view>
      <view class="album_comment_content">
        <text>{{ album.desc }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Album",
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        // 1 返回值中 有album对象表示第一次请求数据
        // 0 返回值中只有wallpaper数组不是第一次请求数据
        first: 1,
      },
      id: "",
      album: {},
      wallpaper: [],
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.getData();
  },
  methods: {
    getData() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params,
      }).then((result) => {
        this.album = result.res.album;
        this.wallpaper = result.res.wallpaper;
        console.log(this.album);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.album_top {
  position: relative;
  width: 100%;
  height: 30vh;
  overflow: hidden;
  > image {
    width: 100%;
  }
  .album_top_info {
    position: absolute;
    display: flex;
    padding: 2vw 0 2vw 2vw;
    bottom: 0;
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    .album_top_info_title {
      flex: 0 1 75%;
    }
    .album_top_info_btn {
      flex: 0 1 25%;
      > view {
        width: 90%;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background-color: $color;
      }
    }
  }
}
.album_comment {
  padding: 2vw;
  width: 100%;
  border-bottom: 1px solid #bbb;
  box-sizing: border-box;
  .album_comment_author {
    display: flex;
    height: 5vh;
    width: 100%;
    .album_comment_author_img {
      width: 15vw;
      > image {
        height: 90%;
        width: 90%;
      }
    }
  }
  .album_comment_content {
    width: 100%;
  }
}
</style>