import Vue from 'vue'
import { FOCUS_ELEMENTS, KEYCODES, checkHidden } from './helpers'

const warn = msg => {
  if (!Vue.config.silent) {
    console.warn(msg)
  }
}

export default {
  name: 'focustrap',
  abstract: true,

  // prop to toggle active state
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tabbable: [],
      firstTabbable: '',
      lastTabbable: '',
      focusedIndex: 0,
      previousFocusElem: ''
    }
  },

  // lazy way to get count
  computed: {
    count() {
      return this.tabbable.length
    }
  },

  // toggle trap when active changes
  watch: {
    active(val) {
      this.$nextTick(() => {
        this.getTabbable()
        this.trap()
      })
    }
  },

  methods: {
    /**
     * Get all tabbable elements in child component
     */
    getTabbable() {
      if (!this.active) return
      const tabbable = this.$slots.default[0].elm.querySelectorAll(
        FOCUS_ELEMENTS
      )

      this.tabbable = [...tabbable].filter(checkHidden)
      this.firstTabbable = this.tabbable[0]
      this.lastTabbable = this.tabbable[-1]
    },

    /**
     * Toggle focus trap
     */
    trap() {
      if (this.active) {
        // cache previous selected element
        this.previousFocusElem = document.activeElement

        // add listener to child element only
        this.$slots.default[0].elm.addEventListener(
          'keydown',
          this.handleKeydown
        )

        // focus current index element
        this.$nextTick(() => {
          this.handleFocus()
        })
      } else {
        // remove child event listeners
        this.$slots.default[0].elm.removeEventListener(
          'keydown',
          this.handleKeydown
        )

        // focus previous active element
        this.$nextTick(() => {
          if (this.previousFocusElem) {
            this.previousFocusElem.focus()
          }
        })
      }
    },

    /**
     * Handle tab forward/backward
     */
    handleKeydown(event) {
      if (event.keyCode === KEYCODES.tab) {
        if (event.shiftKey) {
          event.preventDefault()
          this.prevFocus()
        } else {
          event.preventDefault()
          this.nextFocus()
        }
      }
    },

    /**
     * Logic for going backwards
     */
    prevFocus() {
      const index = this.focusedIndex - 1
      index < 0
        ? (this.focusedIndex = this.count - 1)
        : (this.focusedIndex = index)

      this.handleFocus()
    },

    /**
     * Logic for going forwards
     */
    nextFocus() {
      const index = this.focusedIndex + 1
      index === this.count
        ? (this.focusedIndex = 0)
        : (this.focusedIndex = index)

      this.handleFocus()
    },

    /**
     * Focus helper
     */
    handleFocus() {
      this.tabbable[this.focusedIndex].focus()
    }
  },

  /**
   * Count tabbable elements on creation
   */
  created() {
    this.$nextTick(() => {
      this.getTabbable()
    })
  },

  /**
   * Run trap on creation
   */
  mounted() {
    this.$nextTick(() => {
      if (this.$slots.default && this.$slots.default.length > 1) {
        // error if more than one child
        warn('focustrap can only be used on a single child')
      } else if (!this.$slots.default || this.$slots.default.length < 1) {
        // error if no children or less than 1
        warn('focustrap requires a single child element')
      } else {
        this.$slots.default[0]
        this.trap()
      }
    })
  },

  beforeDestroy() {
    // remove child event listeners
    this.$slots.default[0].elm.removeEventListener(
      'keydown',
      this.handleKeydown
    )
  },

  render() {
    return this.$slots.default ? this.$slots.default[0] : null
  }
}
