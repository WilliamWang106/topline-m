<template>
  <div class="channel-edit">
      <!-- 我的频道 -->
      <van-cell-group :border="false">
        <van-cell title="我的频道">
            <!-- plain  是否为朴素按钮 -->
            <van-button
            size="mini"
            round
            type='danger'
            plain
            @click="isEditShow=!isEditShow"
            >
            <!-- @click="isEditShow=!isEditShow" -->
              {{isEditShow?'完成':'编辑'}}
            </van-button>
        </van-cell>
      </van-cell-group>
      <van-grid :gutter="10">
          <van-grid-item
            v-for="(channel,index) in channelList"
            :key="channel.id"
            @click="outMyChannel(index)"
          >
          <!--:text="channel.name" -->
            <span class="text" slot="text" :class="{ active:value===index}">{{channel.name}}</span>
            <van-icon v-show="isEditShow && index !== 0" class="icon-close" slot="icon" name="close" />
          </van-grid-item>
      </van-grid>
      <!-- 推荐频道 -->
      <van-cell-group :border="false">
        <van-cell title="推荐频道" />
      </van-cell-group>
        <van-grid :gutter="10">
            <van-grid-item
                v-for="channel in recommendChannels"
                :key="channel.id"
                :text="channel.name"
                @click="addChannel(channel)"
            />
        </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  props: {
    channelList: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      AllChannels: [], // 全部频道列表
      isEditShow: false// 编辑显示状态

    }
  },
  methods: {
    // 删除或是切换频道
    outMyChannel (index) {
      if (this.isEditShow && index !== 0) {
        // 编辑状态  删除频道
        this.channelList.splice(index, 1)
      } else {
        // 如果不是编辑状态，就需要切换频道 关闭弹窗
        this.$emit('input', index)
        this.$emit('close')
      }
    },
    // 添加频道
    addChannel (channel) {
      this.channelList.push(channel)
    },
    // 显示我的频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.AllChannels = data.data.channels
    //   console.log(data.data.channels)
    }
  },
  computed: {
    // 计算属性   推荐频道（剩余频道）=全部频道-我的频道
    recommendChannels () {
      const { AllChannels, channelList } = this
      const recommendChannelsList = []
      AllChannels.forEach(item => {
        if (!channelList.find(c => c.id === item.id)) {
          recommendChannelsList.push(item)
        }
      })
      return recommendChannelsList
    }
  },
  watch: {
    //   监听  当channelList发生改变 就去触发
    channelList () {
      setItem('user-channels', this.channelList)
    }
  },
  created () {
    this.loadAllChannels()
  }

}
</script>

<style lang='less' scoped>
.channel-edit{
    padding: 40px 0;
    ::v-deep .van-grid-item__content{
        position: relative;
        .van-grid-item__icon-wrapper{
            position: absolute;
            top: -15px;
            right: -5px;
            .icon-close{
                font-size: 15px;
            }
        }
    }
    .text{
        font-size: 14px;
    }
    .active{
        color: red;
    }
}

</style>
