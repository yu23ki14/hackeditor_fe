<template lang=pug>
  .memo-relation-modal(v-show="memo_relation_modal")
    .modal-backdrop(@click="toggle_memo_relation_modal")
    .memo-relation-form-wrapper
      .memo-relation-form-container
        .label-text
          |紐づけるメモ
        memo_search_form(@search_memo="search_memo")
        .searched-memo-wrapper
          ul.searched-memo-container
            li.searched-memo-item(v-for="memo in searched_memos" @click="set_children_memo(memo.id)")
              h4.memo-title(:class="{ selected: memo.id == child_memo_id }") {{memo.title}}
              p.memo-main {{memo.main}}
              p.memo-reference 参照：{{memo.reference}}
        .label-text
          |紐づけの意図
        form(@submit.prevent="add_memo_relation")
          textarea(v-model="semantic")
          .memo-submit-controller
            button.memo-submit-button(type="submit")
              |追加

</template>

<script>
import memo_search_form from '~/components/memo_search_form.vue'

export default {
  props:['memo_relation_modal'],
  
  components: {
    memo_search_form
  },
  
  data() {
    return {
      searched_memos: null,
      parent_memo_id: this.$route.params.id,
      child_memo_id: null,
      semantic: ""
    }
  },
  
  methods: {
    toggle_memo_relation_modal() {
      this.$parent.memo_relation_modal = false
    },
    
    async search_memo(title, reference, date) {
      const query = {title: title, reference: reference, date: date, exclude_ids: [this.parent_memo_id]}
      const response = await this.$axios.$get("/memos", {params: query})
        .catch( error => {
          console.log("response error", error)
          return false
        })
      console.log(response)
      this.searched_memos = response
      return 
    },
    
    set_children_memo(id) {
      this.child_memo_id = id
    },
    
    async add_memo_relation() {
      const params = {memo_id: this.parent_memo_id, sub_memo_id: this.child_memo_id, semantic: this.semantic}
      if (params.sub_memo_id != null) {
        const response = await this.$axios.$post('/memo_relations', params)
          .catch(err => {
            return false
          });
        console.log(response)
      }
    }
  }
}

</script>

<style lang="sass" scoped>
    
.memo-relation-modal
  display: flex
  justify-content: center
  position: fixed
  height: 100vh
  width: 100%
  top: 10vh
  left: 0

.memo-relation-form-wrapper
  width: 80%
  max-width: 865px
  height: 70vh
  position: absolute
  z-index: 1000
  border-radius: 10px
  overflow: auto
  background-color: white

.memo-relation-form-container
  width: 100%
  height: 100%
  overflow: auto
  padding: 20px 20px 40px 20px
  &::-webkit-scrollbar
    display: none

input[type="text"], textarea
  font-size: 17px
  width: 100%
  border: none
  border-bottom: 1px solid gray
  padding: 3px 0
  
textarea
  min-height: 100px
  margin-bottom: 30px
  resize: none

.memo-submit-controller
  width: 100%
  position: absolute
  bottom: 0
  left: 0

  button
    width: 100%
    padding: 10px
    border: none
    cursor: pointer
    font-weight: 700
    background-color: lightseagreen
    color: white
    &:focus, &:hover
      background-color: coral
    
.searched-memo-wrapper
  width: 100%
  overflow: auto
  margin-bottom: 20px
  
  &::-webkit-scrollbar
    width: 7px
    background: white
  &::-webkit-scrollbar-track
    border-radius: 10px
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .1)
  &::-webkit-scrollbar-thumb 
    background-color: rgb(200, 200, 200)
    border-radius: 7px
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 1)
    
.searched-memo-container
  margin-top: 10px
  padding-bottom: 5px
  display: inline-flex

.searched-memo-item
  box-shadow: 0 0 5px lightgray
  margin: 0 5px
  width: 200px
  display: inline-block
  cursor: pointer
  
  .memo-title, .memo-main, .memo-reference
    padding: 5px
  .memo-title
    background: coral
    &.selected
      background: lightseagreen
      color: white
  .memo-main
    height: 75px
    overflow: hidden
    font-size: 14px
  .memo-reference
    padding-top: 10px
    height: 30px
    font-size: 11px
    text-align: right

.modal-backdrop
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background-color: rgba(black, .5)

</style>
