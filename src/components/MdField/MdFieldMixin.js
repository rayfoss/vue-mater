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
        if (value.constructor.toString().match(/function (\w*)/)[1].toLowerCase() !== 'inputevent') {
          this.valueDirection = UP
          console.log(`model set ${value} ${Date.now() - start}`)
          console.log(`value direction ${this.valueDirection} ${Date.now() - start}`)
          this.$emit('input', value) // needed for autofill support
        } else {
          console.log('You cant block my style')
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
    },
    localValue: {
      get () {
        return this.value
      },
      set (value) {
        console.log(`localValue set: ${value} ${Date.now() - start}`)
        console.log(`value direction ${this.valueDirection} ${Date.now() - start}`)
        if ( this.valueDirection === DOWN ) { // we cab emit faster in model
          this.$emit('input', value) // needed for autofill support
        }
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
    value (value) {
      this.valueDirection = DOWN
      console.log(`value set ${value} ${Date.now() - start}`)
      console.log(`value direction ${this.valueDirection} ${Date.now() - start}`)
      this.localValue = value
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
