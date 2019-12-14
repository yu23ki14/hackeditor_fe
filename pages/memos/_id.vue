<template lang=pug>
  div
    .memo-wrapper
      .page-container.memo-container
        .memo-parent-container
          .memo-item
            p.memo-title(v-show="memo.title")
              |{{memo.title}}
            p.memo-main
              |{{memo.main}}
            p.memo-reference(v-if="memo.reference")
              |参照：{{memo.reference}} {{memo.reference_other_details}}
        
        .memo-children-container
          ul
            li(v-for="(child_memo, index) in children_memos")
              .memo-relation-node
                .node
                .semantic-container
                  p
                    |{{relations[index].semantic}}
                  .relation-patch
                    span.im.icon-pencil(@click="toggle_memo_relation_edit_modal(relations[index].id, relations[index].semantic)")
                    span.im.icon-trash(@click="delete_relation(relations[index].id)")
                      
              router-link.memo-item(:to="'/memos/' + child_memo.id")
                .memo-title(v-show="child_memo.title")
                  |{{child_memo.title}}
                .memo-main
                  |{{child_memo.main}}
              
              .memo-relation-chain
                .node
                .chain
                  |+{{children_relations[index]}}
            
            li(@click="toggle_memo_relation_modal")
              .memo-relation-node
                .node
              .memo-item  
                .memo-main
                  |新規追加 &#43;
                
    memo_relation(:memo_relation_modal="memo_relation_modal")
    memo_relation_edit(:memo_relation_edit_modal="memo_relation_edit_modal", :editting_id="editting_relation_id", :editting_semantic="editting_relation_semantic")
    
    
</template>

<script>
import memo_relation from '~/components/memo_relation.vue'
import memo_relation_edit from '~/components/memo_relation_edit.vue'

export default {
  components: {
    memo_relation,
    memo_relation_edit
  },
  
  data() {
    return {
      memo_relation_modal: false,
      memo_relation_edit_modal: false,
      editting_relation_id: null,
      editting_relation_semantic: ""
    }
  },
  
  async asyncData({ $axios, params }) {
    const response = await $axios.$get("/memos/" + params.id)
      .catch( error => {
        console.log("response error", error)
        return false
      })
    console.log(response)
    return { memo: response.memo, children_memos: response.children_memos.memos, relations: response.children_memos.relations, children_relations: response.children_memos.children_relations }
  },
  
  methods: {
    toggle_memo_relation_modal() {
      this.memo_relation_modal = !this.memo_relation_modal
    },
    
    toggle_memo_relation_edit_modal(id, semantic) {
      this.editting_relation_id = id
      this.editting_relation_semantic = semantic
      this.memo_relation_edit_modal = !this.memo_relation_edit_modal
    },
    
    async delete_relation(id){
      const confirmation = window.confirm("本当に削除しますか？");
      
      if (confirmation) {
        const response = await this.$axios.$delete("/memo_relations/" + id)
          .catch( error => {
            console.log("response error", error)
            return false
          })
        return
      } else {
        return
      }
    }
  }
}

</script>

<style lang="sass" scoped>
.memo-wrapper
  padding-top: 30px
  background: #dcdcdc
  height: calc(100vh - 50.5px)

.memo-container
  display: flex

.memo-item
  padding: 20px
  background-color: white
  border-left: 8px coral solid
  cursor: pointer
  
.memo-title
  font-size: 19px
  padding: 5px 0
  
.memo-main
  white-space: pre-wrap
  word-wrap: break-word
  padding: 5px 0

.memo-reference
  font-size: 13px
  color: gray
  padding-top: 5px

.memo-parent-container
  width: 35%
  position: relative
  .memo-item
    position: absolute
    width: 100%

.memo-children-container
  width: 65%
  overflow: auto
  height: calc(100vh - 80.5px)
  
  &::-webkit-scrollbar
    width: 7px
    background: white
    border-radius: 7px
  &::-webkit-scrollbar-track
    border-radius: 7px
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .1)
  &::-webkit-scrollbar-thumb 
    background-color: rgb(150, 150, 150)
    border-radius: 7px
  
  ul
    margin-left: 20px
    margin-right: 10px
    border-left: 5px gray solid
    li
      display: flex
      margin-bottom: 40px
      
    .memo-item
      border-left-color: lightseagreen
      width: calc(100% - 310px)

.node
  width: 90%
  height: 5px
  background: gray
  margin: 30px auto 20px 0
  position: relative
  &:after
    position: absolute
    content: " "
    width: 16px
    height: 16px
    border-radius: 8px
    background: gray
    top: -5px
    right: -8px

.memo-relation-node
  width: 230px
  
  .semantic-container
    width: 90%
    margin-left: 3%
    background: white
    padding: 10px
    font-size: 14px
    
  .relation-patch
    display: flex
    justify-content: flex-end
    
    .relation-patch-item
      cursor: pointer
    
    .im
      color: gray
      font-size: 16px
      margin-left: 5px
      cursor: pointer
      
      &:hover
        &.icon-pencil
          color: lightseagreen
        &.icon-trash
          color: coral

.memo-relation-chain
  width: 80px
  .node
    width: 80%
    margin: 30px 10px 20px
  .chain
    margin-left: 10px
    font-size: 25px
    font-weight: bold
    color: gray
    text-align: center
  
</style>
