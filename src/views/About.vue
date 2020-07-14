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
          },
          "phoneField": {
            "type": "object",
            "title": "手机号码",
            "properties": {
              "area": {
                "type": "string",
                "title": "区号",
                "enum": ["0086", "00852"]
              },
              "phone": {
                "type": "string",
                "title": "号码"
              },
            }
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
          },
          {
            "type": "phone",
            "key": "phoneField",
            "items": [
              {
                "type": "select",
                "key": "area",
                "titleMap": {
                  "0086": "+86",
                  "00852": "+852"
                }
              },
              {
                "type": "number",
                "key": "phone"
              }
            ]
          }
        ],
        value: {
          name: '',
          checkboxField: [],
          "phoneField": {
            "area": "0086",
            "phone": ""
          }
        }
      }
    }
  },
  methods: {
    create () {
      this.status = false
      setTimeout(() => {
        this.status = true
      }, 200);
    },
    async submit () {
      const validateStatus = await this.$refs['form1'].validateForm()
      console.log('validateStatus', validateStatus)

      if (true) {
        console.log('formdata', this.formdata)

      }
    }
  }
}
</script>
<style lang="css">
.about {
  height: 100%;
  width: 100%;
  display: flex;
  font-size: 15px;
}
.md-cell-item-content {
  font-size: 15px !important;
  min-width: 80px;
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
  text-align: center;
}
@media screen and (max-width: 500px) {
  .about {
    flex-direction: column;
  }
  .input,
  .show {
    width: 100%;
  }
}
</style>