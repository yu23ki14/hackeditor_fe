<template lang=pug>
  .memos-container
    .page-container
      .memo-search-container
        memo_search_form(@search_memo="search_memo")
      ul
        li.memo-item(v-for="memo in memos")
          h2.memo-title(v-if="memo.title")
            |{{memo.title}}
          p.memo-main {{memo.main}}
          p.memo-reference(v-if="memo.reference")
            |参照：{{memo.reference}} {{memo.reference_other_details}}
          nuxt-link(:to="{name:'memos-id',params:{id:memo.id}}")
      
</template>

<script>

import memo_search_form from '~/components/memo_search_form.vue'

export default {
  components: {
    memo_search_form,
  },
  
  data() {
    memos: null
  },
  
  async asyncData({ $axios }) {
    const query = {title: "", reference: "", date: ""}
    const response = await $axios.$get("/memos", query)
      .catch( error => {
        console.log("response error", error)
        return false
      })
    return { memos: response}
  },
  
  methods: {
    async search_memo(title, reference, date) {
      const query = {title: title, reference: reference, date: date}
      const response = await this.$axios.$get("/memos", {params: query})
        .catch( error => {
          console.log("response error", error)
          return false
        })
      this.memos = response
      return 
    }
  }
}

</script>

<style lang="sass" scoped>

.memo-search-container
  background: white
  padding: 10px 10px 15px
  margin-bottom: 20px

.memos-container
  padding: 20px 0
  background: #dcdcdc
  min-height: 100vh

.memo-item
  padding: 20px
  background-color: white
  border-left: 8px coral solid
  margin-bottom: 10px
  position: relative
  &:nth-of-type(2n)
    border-left-color: lightseagreen
  a
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
  
.memo-title
  font-size: 19px
  padding-bottom: 10px
  
.memo-main
  white-space: pre-wrap
  word-wrap: break-word

.memo-reference
  font-size: 15px
  color: gray
  padding-top: 5px
  
</style>
