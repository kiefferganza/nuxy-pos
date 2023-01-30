// import { directive as onClickaway } from 'vue-clickaway'
import vClickOutside from 'v-click-outside'
import Vue from 'vue'

Vue.mixin({
  directives: {
    onClickaway: vClickOutside.directive,
  },
})
