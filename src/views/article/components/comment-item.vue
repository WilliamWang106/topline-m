<template>
    <!-- 每一项 -->
    <van-cell class="comment-item">
        <!-- 评论作者头像 -->
        <van-image
        slot="icon"
        class="avatar"
        round
        :src="comment.aut_photo"
        ></van-image>
        <!-- 评论作者名字 -->
        <span style="color:#466b9d;" slot="title">{{comment.aut_name}}</span>
        <!-- 评论内容 -->
        <div slot="label">
            <p style="color: #363636;">{{comment.content}}</p>
            <!-- 时间和回复 -->
            <p>
                <!-- 评论发布时间 -->
                <span style="margin-right: 10px;">{{comment.pubdate | relativeTime}}</span>
                <!-- 回复按钮 -->
                <van-button
                size="mini"
                type="default"
                >回复 {{comment.reply_count}}</van-button>
            </p>
        </div>
        <!-- 自定义右侧按钮 -->
        <div slot="right-icon" class="like-container">
            <!-- 点赞图标 -->
            <van-icon
            :color="comment.is_liking ? '#e5645f' : ''"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            ></van-icon>
            <!-- 点赞文字 -->
            <span>{{comment.like_count ? comment.like_count : '赞'}}</span>
        </div>
    </van-cell>
</template>

<script>
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.comment-item{
    display: flex;
    align-items: flex-start;
    .avatar{
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .like_container{
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 17px;
    }
}

</style>
