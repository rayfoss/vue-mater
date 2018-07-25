<template>
  <div>
    <h1>MdInput: {{executions}}</h1>
    <md-field>
      <label>Initial Value</label>
      <md-input v-model="initial" @input="handleInput"></md-input>
    </md-field>
    <md-button @click="setValue">click</md-button>
    <div>result: {{inputValue}}</div><hr>

    <md-toolbar class="md-primary">
        <h1 class="md-title">vue-material T0-D{{yolo%10}}'s</h1>
    </md-toolbar>

     <form class="create md-layout" @submit.prevent="validateTodo">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">To-Do next: {{form.server}}</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="todo">md-input</label>
                <md-input id="todo" v-model="form.todo" />
              </md-field>
              <div class="md-field md-theme-default">
                <input id="todo" v-model="form.todo" placeholder="html input"/>
              </div>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary">Create Todo</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import '../../dist/vue-material.min.css'
import '../../dist/theme/default.css'

const start = Date.now()

export default {
  name: 'TextFields',
  data() {
    return {
      executions: 0,
      initial: '',
      inputValue: '',
      form: {
        todo: '',
        server: ''
      }
    }
  },
  methods: {
    setValue() {
      console.log(`setValue set ${Date.now() - start}`)
      this.executions++
      this.initial = 'Set Value'
    },
    handleInput(val) {
      console.log(`handleInput set ${val} ${Date.now() - start}`)
      this.executions++
      this.inputValue = val
    },
    validateTodo() {
      this.form.server = this.form.todo
      this.form.todo = ''
    }
  },
  created() {
    this.yolo = 0
    setInterval(() => {
      this.yolo++
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
.create {
  padding: 5px;
  background: gray;
  & > div {
    margin: auto;
  }
}

.list {
  padding: 16px;
  .md-card {
    width: 320px;
    margin: 4px;
  }
}
</style>
