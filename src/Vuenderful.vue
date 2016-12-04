<template>
<div class="vuenderful">
  <div ref="box" class="v-tags" @mousedown="focus"  :class="{ dropped: showDropdown }">
    <div v-if="vtype != 'single'" class="v-tags-tag" v-for="tag in selected" @click="removeTag(tag, $event)">
      <span>{{ tag }}</span>
    </div>
    <input ref="input" type="text" @focus="focus" @blur="destroyPopup" v-model="inputText" @keydown.enter="onEnter"
      @keydown.esc="onEsc" @keydown.down="onDown" @keydown.up="onUp" @keydown.tab="onTab">
    <div v-if="vtype == 'single'" class="arrowdown"></div>
  </div>
  <div class="v-dropdown" v-if="showDropdown" :style="style">
    <ul ref="dropdown"><li v-for="(tag, index) in choices" @mousedown="addTag(tag, $event)" :class="{ selected: index == markedIndex }">{{ tag }}</li></ul>
  </div>
<div>
</template>

<script>
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
export default {
  name: 'app',
  props: {
    options: {
      type: Array,
      default: []
    },
    selected: {
      type: Array,
      default: []
    },
    vtype: {
      type: String,
      required: true,
      validator (val) {
        return val == 'single' || val == 'multi';
      }
    }
  },
  props: ["options", "selected", "vtype"],
  data () {
    return {
      inputText: '',
      markedIndex: 0,
      style: '',
      showDropdown: false
    }
  },
  created: function() {
    window.addEventListener('resize', this.scale);
  },
  computed: {
    choices: function() {
      return this.options.diff(this.selected).filter(function (element, index, array) {
        return this.inputText == '' || element.toUpperCase().includes(this.inputText.toUpperCase());
      }, this);
    }
  },
  watch: {
    inputText (text) {
      this.$refs.input.style.width = ((text.length + 2) * 10) + 'px';
    }
  },
  methods: {
    addSelected: function() {
      if(this.inputText == '')
        return false;
      // if tag does not exist in selected tag list
      if(this.selected.indexOf(this.inputText) === -1)
        var i = this.selected.push(this.inputText.trim()) - 1;
      this.inputText = '';
      this.markedIndex = 0;
      return true;
    },
    addTag: function(tagname, event) {
      if(this.vtype == "single") {
        this.inputText = tagname;
        this.destroyPopup();
      } else {
        if(event != null)
          event.preventDefault();
        // if tag does not exist in selected tag list
        if(this.selected.indexOf(tagname) === -1)
          var i = this.selected.push(tagname.trim()) - 1;
        this.inputText = '';
        if(this.choices.length == 0)
          this.destroyPopup();
        this.$refs.input.focus();
      }
    },
    onEnter: function(){
      if(this.choices.length > 0) {
        this.addTag(this.choices[this.markedIndex]);
        this.markedIndex = 0;
      } else {
        this.onTab();
      }
    },
    onTab: function(e){
      if(this.vtype == "single") {

      } else {
        if(this.addSelected() && e != undefined)
          e.preventDefault();
      }
    },
    onEsc: function(){
      this.$refs.input.blur();
      this.destroyPopup();
    },
    onDown: function(){
      if(this.markedIndex < this.choices.length - 1)
        this.markedIndex++;
    },
    onUp: function(){
      if(this.markedIndex > 0)
        this.markedIndex--;
    },
    removeTag: function(tagname, event){
      if(event != null) event.preventDefault();
      var i = this.selected.indexOf(tagname);
      var j = this.selected;
      if(i !== -1) {
        this.selected.splice(i, 1);
      }
      this.createDropdown();
    },
    createDropdown: function() {
      this.scale();
      if(this.choices.length > 0)
        this.showDropdown = true;
    },
    destroyPopup: function() {
      this.showDropdown = false;
    },
    focus: function(event) {
      if(event != null) event.preventDefault();
      this.$refs.input.focus();
      this.createDropdown();
    },
    scale: function() {
      if(this.$refs.box != null)
        this.style = "width: " + this.$refs.box.offsetWidth + "px";
    }
  }
}
</script>

<style lang="sass?indentedSyntax">
$default: #fff
$border: #d1d1d1
$text: #222
$secondary: #888
$selected: #f5f5f5

.vuenderful
  margin-bottom: 10px
  box-sizing: border-box

.v-tags
  display: block
  box-sizing: border-box
  font-family: 'Raleway', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif
  font-size: 14px
  font-weight: 400
  color: $text
  cursor: text
  padding: 4px 10px
  border: 1px solid $border
  border-radius: 4px
  line-height: 1.6
  position: relative

  .arrowdown
    width: 0
    height: 0
    border-left: 5px solid transparent
    border-right: 5px solid transparent
    border-top: 5px solid $secondary
    position: absolute
    right: 10px
    top: 16px

  &.dropped
    border-radius: 4px 4px 0 0

  input, input:focus
    display: inline-flex
    box-shadow: none
    padding: 0 4px
    margin: 0
    border: none
    outline: 0
    width: 10px
    height: 28px
    -webkit-appearance: textfield

  .v-tags-tag
    display: inline-flex
    background-color: #eaeaea
    cursor: pointer
    padding: 0 8px
    margin: 2px 4px 2px 0
    border: 1px solid #D1D1D1
    border-radius: 4px
    height: 22px

    span
      font-size: 14px
      line-height: 18px
      white-space: nowrap

      &::after
        content: "x"
        font-size: 14px
        color: $secondary
        cursor: pointer
        margin-left: 4px
        line-height: 22px

.v-dropdown
  display: block
  box-sizing: border-box
  position: absolute
  border: 1px solid $border
  border-radius: 0 0 4px 4px
  overflow: hidden
  z-index: 10
  margin-top: -1px

  ul
    padding: 0
    margin: 0
    overflow-x: hidden
    overflow-y: scroll
    max-height: 200px

    &::-webkit-scrollbar
      width: 6px
      height: 6px

    &::-webkit-scrollbar-track
      background-color: $selected

    &::-webkit-scrollbar-thumb
      background-color: $text

    li
      font-size: 15px
      background-color: $default
      cursor: pointer
      padding: 4px 10px
      margin: 0
      border-bottom: 1px solid $border
      line-height: 24px
      height: 24px
      list-style: none

      &.selected
        background-color: $selected

      &:last-child
        border-bottom: 0

</style>
