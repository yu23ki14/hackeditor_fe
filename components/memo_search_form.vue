<template lang=pug>
  form(@submit.prevent="emit_search_memo")
    ul
      li
        .memo-search-input
          input(type="text" v-model="title" placeholder="タイトル")
      li
        .memo-search-input
          input(type="text" v-model="reference" placeholder="参考")
      li
        .memo-search-input
          VueCtkDateTimePicker(v-model="date" :label="dp_label" :no-label="true" :format="dp_format" :formatted="dp_formatted" :only-date="true" :range="true")
      li
        button.memo-search-submit-button(type="submit")
          |検索
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  components: {
    VueCtkDateTimePicker
  },
  
  data() {
    return {
      title: "",
      reference: "",
      date: "",
      dp_format: "YYYY-MM-DD",
      dp_label: "日付を選択",
      dp_formatted: "ll"
    }
  },
  methods: {
    emit_search_memo() {
      this.$emit('search_memo', this.title, this.reference, this.date)
    }
  }
}

</script>

<style lang="sass" scoped>
  
input, textarea
  font-size: 17px
  
ul
  display: flex
  flex-wrap: wrap

li
  margin-right: 10px
  margin-top: 5px

.memo-search-submit-button
  padding: 5px 20px
  border-radius: 5px
  border: none
  cursor: pointer
  font-weight: 700
  background-color: lightseagreen
  color: white
  &:focus, &:hover
    background-color: coral
  
</style>
