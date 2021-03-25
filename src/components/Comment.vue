<template>
  <view class="comment_user" v-if="comment1.length">
    <view class="comment_title">
      <slot name="comment_title"></slot>
    </view>
    <view class="comment_item" v-for="(item, index) in comment1" :key="index">
      <view class="comment_user_top">
        <view class="comment_user_top_img">
          <image mode="widthFix" :src="item.user.avatar"></image>
        </view>
        <view class="comment_user_top_anthor">
          <view class="comment_user_top_name">{{ item.user.name }}</view>
          <view class="comment_user_top_time">{{ item.cnTime }}</view>
        </view>
        <view class="user_badge">
          <image
            v-for="(item2, index) in item.user.title"
            :key="index"
            :src="item2.icon"
          ></image>
        </view>
      </view>
      <view class="comment_user_bottom">
        <view class="comment_user_bottom_content">{{ item.content }}</view>
        <view class="comment_user_bottom_rank">
          <image src="~@/static/img/common/点赞.png"></image>
          {{ item.size }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
// 使用中文时间
moment.locale("zh-CN");
export default {
  name: "Comment",
  props: {
    comment: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      comment1: [],
    };
  },
  // 渲染时数据未处理，watch监听拿到数据后进行处理，赋值给data里的。
  // 根据vue：data改变渲染同步改变
  watch: {
    comment() {
      // 将时间戳转换成相对时间
      this.comment.map((item) => {
        item.cnTime = moment(item.atime * 1000).fromNow();
      });
      this.comment1 = this.comment;
    },
  },
};
</script>

<style lang="scss" scoped>
.comment_user {
  .comment_title {
    margin: 1vh 0 1vh 1vw;
    padding-left: 2vw;
    height: 5vh;
    line-height: 5vh;
    border-left: 2vw solid $color;
  }

  .comment_item {
    padding: 2vh 2vw;
    .comment_user_top {
      display: flex;
      height: 6vh;
      .comment_user_top_img {
        flex: 0 1 15%;
        text-align: center;
        align-items: center;
        image {
          width: 11.25vw;
          height: 11.25vw;
        }
      }
      .comment_user_top_anthor {
        flex: 0 1 45%;
        .comment_user_top_name {
          font-size: 14px;
          color: #888;
        }
        .comment_user_top_time {
          font-size: 13px;
          color: #bbb;
        }
      }
      .user_badge {
        flex: 0 1 40%;
        text-align: right;
        image {
          height: 15px;
          width: 15px;
        }
      }
    }
    .comment_user_bottom {
      display: flex;
      padding: 4vh 0 4vh 15%;
      border-bottom: 1px solid #ddd;
      .comment_user_bottom_content {
        flex: 0 1 88%;
      }
      .comment_user_bottom_rank {
        flex: 0 1 12%;
        font-size: 12px;
        align-self: center;
        color: #777;
        image {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
}
</style>