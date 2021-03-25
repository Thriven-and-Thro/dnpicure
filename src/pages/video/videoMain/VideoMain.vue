<template>
  <view>
    <video-list
      :videoData="videowp"
      @handleScrolltolower="handleScrolltolower"
    />
  </view>
</template>

<script>
import VideoList from "@/components/VideoList.vue";
export default {
  name: "VideoMain",
  components: {
    VideoList,
  },
  data() {
    return {
      videowp: [],
      hasMore: true,
      getLoading: false,
    };
  },
  props: {
    urlobj: Object,
  },
  mounted() {
    this.getList();
  },
  watch: {
    urlobj() {
      this.getList();
    },
  },
  methods: {
    getList() {
      this.getLoading = true;
      this.request({
        url: this.urlobj.url,
        data: this.urlobj.params,
      }).then((result) => {
        if (result.res.videowp.length !== 0) {
          this.videowp = [...this.videowp, ...result.res.videowp];
        } else {
          this.hasMore = false;
        }
      });
      this.getLoading = false;
    },
    handleScrolltolower() {
      if (!this.getLoading) {
        if (this.hasMore) {
          this.urlobj.params.skip += this.urlobj.params.limit;
          this.getList();
        } else {
          uni.showToast({
            title: "没有数据了",
            icon: "none",
          });
        }
      }
    },
    onClickItem1() {
      this.videowp = [];
      this.hasMore = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>