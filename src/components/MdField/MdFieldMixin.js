const start = Date.now()
const UP = 1
const DOWN = 0
export default {
  props: {
    value: {},
    placeholder: String,
    name: String,
    maxlength: [String, Number],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    mdCounter: [String, Number]
  },
  data () {
    return {
      localValue: this.value,
      valueDirection: DOWN,
      textareaHeight: false
    }
  },
  computed: {
    model: {
      get () {
        return this.localValue
      },
      set (value) {
        console.log(`model set ${value} ${Date.now() - start}`)
        console.log(`value direction ${this.valueDirection} ${Date.now() - start}`)
        if (value.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== 'inputevent') {
          this.valueDirection = UP
          this.$emit('input', value) // needed for autofill support
          this.localValue = value
        }
      }
    },
    clear () {
      return this.MdField.clear
    },
    attributes () {
      return {
        ...this.$attrs,
        type: this.type,
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        required: this.required,
        placeholder: this.placeholder,
        readonly: this.readonly,
        maxlength: this.maxlength
      }
    }
  },
  watch: {
    model () {
      this.setFieldValue()
    },
    clear (clear) {
      if (clear) {
        this.clearField()
      }
    },
    placeholder () {
      this.setPlaceholder()
    },
    disabled () {
      this.setDisabled()
    },
    required () {
      this.setRequired()
    },
    maxlength () {
      this.setMaxlength()
    },
    mdCounter () {
      this.setMaxlength()
    },
    localValue (val) { // needs to emit quickly, upstream might set
      console.log(`localValue set: ${val} ${Date.now() - start}`)
      console.log(`value direction ${this.valueDirection} ${Date.now() - start}`)
      if ( this.valueDirection === DOWN ) { // we cab emit faster in model
        this.$emit('input', val) // needed for autofill support
      }
    },
    value (val) {
      this.valueDirection = DOWN
      console.log(`value set ${val} ${Date.now() - start}`)
      console.log(`value direction ${this.valueDirection} ${Date.now() - start}`)
      this.localValue = val
    }
  },
  methods: {
    clearField () {
      this.$el.value = ''
      this.model = ''
      this.setFieldValue()
    },
    setLabelFor () {
      if (this.$el.parentNode) {
        const label = this.$el.parentNode.querySelector('label')

        if (label) {
          const forAttribute = label.getAttribute('for')

          if (!forAttribute || forAttribute.indexOf('md-') >= 0) {
            label.setAttribute('for', this.id)
          }
        }
      }
    },
    setFieldValue () {
      this.MdField.value = this.model
    },
    setPlaceholder () {
      this.MdField.placeholder = Boolean(this.placeholder)
    },
    setDisabled () {
      this.MdField.disabled = Boolean(this.disabled)
    },
    setRequired () {
      this.MdField.required = Boolean(this.required)
    },
    setMaxlength () {
      if (this.mdCounter) {
        this.MdField.counter = parseInt(this.mdCounter, 10)
      } else {
        this.MdField.maxlength = parseInt(this.maxlength, 10)
      }
    },
    onFocus () {
      this.MdField.focused = true
    },
    onBlur () {
      this.MdField.focused = false
    }
  },
  created () {
    this.setFieldValue()
    this.setPlaceholder()
    this.setDisabled()
    this.setRequired()
    this.setMaxlength()
  },
  mounted () {
    this.setLabelFor()
  }
}
