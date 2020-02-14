<template>
  <div class="chat-container">
      <!-- 导航栏 -->
      <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" fixed />
      <!-- 消息列表 -->
      <div class="message-list" ref="message-list">
        <div class="message-item"
        :class="{ reverse:item.isMe }"
        v-for="(item,index) in messages"
        :key="index">
          <van-image
          class="avatar"
          slot="icon"
          round
          width='30'
          height='30'
          src='https://img.yzcdn.cn/vant/cat.jpeg'></van-image>
          <div class="title">
            <span>{{item.msg}}</span>
          </div>
        </div>
      </div>
      <!-- 发送消息 -->
      <van-cell-group class="send-message">
        <van-field v-model.trim="message" center clearable>
          <van-button slot="button" size="small" type="primary" @click="onSend">发送</van-button>
        </van-field>
      </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null, // WebSocket通信对象
      messages: getItem('chat-messages') || []// 消息列表
    }
  },
  created () {
    // 建立WebSocket链接
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    // 建立链接
    socket.on('connect', function () {
      console.log('建立链接成功')
    })
    // 接收消息
    socket.on('message', message => {
      // console.log('message=>', message)
      this.messages.push(message)
    })
  },
  methods: {
    // 点击发送消息  触发的事件
    onSend () {
      const message = this.message
      if (!message.length) {
        return
      }
      // 发送消息
      const data = {
        msg: message,
        timestamp: Date.now(),
        isMe: true
      }
      console.log(message)
      this.socket.emit('message', data)
      // 将消息存储到列表中
      this.messages.push(data)
      // 清空输入框
      this.message = ''
    },
    toBottom () {
      const listContainer = this.$refs['message-list']
      listContainer.scrollTop = listContainer.scrollHeight
    }
  },
  watch: {
    messages (newValue) {
      // 当数组发生改变的时候   建立本地存储   储存数据
      setItem('chat-messages', newValue)
      // 让消息自动滚动到底部
      this.$nextTick(() => {
        this.toBottom()
      })
    }
  }

}
</script>

<style lang='less' scoped>
.chat-container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 46px 0 50px 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background: #f5f5f6;
    .message-list {
      height: 100%;
      overflow-y: scroll;
      .message-item {
        display: flex;
        align-items: center;
        padding: 10px;
        .title {
          background: #fff;
          padding: 5px;
          border-radius: 6px;
          font-size:14px;
        }
        .avatar {
          margin-right: 5px;
        }
      }
      .reverse {
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
        }
      }
    }
    .send-message {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f6 !important;
    }
  }
</style>
