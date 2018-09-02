<template>
  <article class="article-warap">
    <header>{{articleVal.titel}}</header>
    <section v-html="articleVal.content"></section>
  </article>
</template>

<script>
  export default {
    name: 'articledetail',
    data() {
      return {
        id:'',
        articleVal:{}
      }
    },
    methods: {
      queryArticle(id){
        if(String(id)){
          this.$model.datasys.getArticle({id},(res)=>{
            if(res.error){
              this.$alert(res.error)
              return
            }
            this.articleVal = res.data.news
          },(err)=>{
            console.error(err)
          })
        }
      }
    },
    mounted() {
      let q = this.$route.query
      this.id = q.id || ''
      this.queryArticle(this.id)
    }
  }
</script>

<style lang="less" scoped>
  .article-warap{
    background-color: #fff;
    padding:10px 15px;
    color:#333;
    header{
      font-size: 24px;
      margin-bottom: 15px;
      font-weight: bold;
    }
  }
</style>
