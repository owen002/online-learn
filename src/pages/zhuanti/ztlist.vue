<template>
  <article class="zt-list-wrap" v-if="articleList.length > 0">
    <section class="zt-item" v-for="zitem in articleList" @click="goArticle(zitem.id)">
      <mu-ripple>
        <header>{{ztname}}</header>
        <div class="zt-list-content">
          <p>{{zitem.titel}}</p>
          <em>{{zitem.createDay}}</em>
        </div>
      </mu-ripple>
    </section>
  </article>
</template>

<script>
  export default {
    name: 'ztlist',
    data() {
      let q = this.$route.query
      return {
        ztId: q.id || '',
        ztname: q.name || '专题',
        ztDetail: null,
        articleList: []
      }
    },
    methods: {
      goArticle(id) {
        this.$router.push({
          name: 'article',
          query: {id}
        })
      },
      queryList() {
        this.$model.datasys.getZtDetail({id: this.ztId}, (res) => {
          if (res.error) {
            this.$alert(res.error)
            return
          }
          let list = res.data.list
          this.articleList = list;
        })
      }
    },
    mounted() {
      if (this.ztId) {
        this.queryList()
      }
    }
  }
</script>

<style lang="less" scoped>
  .zt-list-wrap {
    .zt-item {
      background-color: #fff;
      padding: 15px;
      border-top: 1px solid #e5e5e5;
      position: relative;
      &:nth-of-type(1) {
        border-top: none;
      }
      header {
        font-size: 14px;
        color: #ababab;
      }
      .zt-list-content {
        em {
          font-size: 14px;
          color: #797979;
        }
        p {
          font-size: 18px;
          color: #333;
          padding: 5px 0;
        }
      }
    }
  }
</style>
