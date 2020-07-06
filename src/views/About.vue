<template>
  <div class="about">
    <div class="input">
      <vue-json-editor v-model="jsonSchema" :show-btns="true" :expandedOnStart="true" @json-change="create" style="height: 100%;" />
    </div>
    <div class="show">
      <vue-json-form v-if="status" v-model="formdata" ref="form1" :formId="1" :formSchema="jsonSchema" />
      <button type="button" class="btn btn-primary" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import vueJsonEditor from 'vue-json-editor'
export default {
  components: {
    vueJsonEditor
  },
  data () {
    return {
      status: true,
      schema: '',
      formdata: {},
      jsonSchema: {
        schema: {
          name: {
            title: 'Default Name',
            description: 'Nickname allowed',
            type: 'string'
          },
          'checkboxField': {
            'type': 'array',
            'title': '多选框',
            'enum': ['option1', 'option2']
          }
        },
        form: [
          {
            'key': 'name',
            'type': 'input',
            required: true
          },
          {
            'key': 'checkboxField',
            'type': 'checkboxes',
            required: true,
            'titleMap': {
              'option1': '选项1',
              'option2': '选项2'
            }
          }
        ],
        value: {
          name: '',
          checkboxField: []
        }
      }
    }
  },
  methods: {
    create () {
      this.status = false
      setTimeout(() => {
        this.status = true
      }, 100);
    },
    async submit () {
      const validateStatus = await this.$refs['form1'].validateForm()
      console.log(validateStatus)
    }
  }
}
</script>
<style lang="css">
.about {
  height: 100%;
  width: 100%;
  display: flex;
}
.input {
  width: 50%;
  padding: 40px;
}
.jsoneditor-vue {
  height: 100%;
}
textarea {
  height: 30%;
  width: 100%;
}
.show {
  width: 50%;
}
</style>