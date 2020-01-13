<template>
  <div article-Container>文章详情页</div>
</template>

<script>
export default {
  name: 'articlePage',
  props: {
    articleId: {
      type: [Number, Object, String],
      require: true
    }
  }

}
</script>

<style>

</style>
