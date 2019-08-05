<template>
  <a-form
    :form="form"
    @submit="onChange"
  >
    <a-form-item
      v-bind="formItemLayout"
      :label="formItem.label"
      v-for="(formItem,index) in formOptions"
      :key="index"
    >
      <!--输入框-->
      <a-input
        v-if="formItem.type === 'text'"
        v-decorator="[
          formItem.name,
          formItem.rule
        ]"
      />

      <!--密码框-->
      <a-input
        v-else-if="formItem.type === 'password'"
        v-decorator="[ formItem.name, formItem.rule ]"
        type="password"
      />

      <!--日期选择-->
      <a-date-picker
        v-else-if="formItem.type === 'date-picker'"
        v-decorator="[ formItem.name, formItem.rule ]"
      ></a-date-picker>

      <!--日期 时间-->
      <a-date-picker
        v-else-if="formItem.type === 'date-time-picker'"
        v-decorator="[ formItem.name, formItem.rule ]"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
      ></a-date-picker>

      <!-- 月份选择 -->
      <a-monthPicker
        v-else-if="formItem.type === 'month-picker'"
        v-decorator="[ formItem.name, formItem.rule ]">
      </a-monthPicker>

      <!-- 开始/截至 日期 -->
      <a-range-picker
        v-else-if="formItem.type === 'range-picker'"
        v-decorator="[ formItem.name, formItem.rule ]"
      ></a-range-picker>
      <!-- 开始/截至 时间 -->
      <a-range-picker
        v-else-if="formItem.type === 'range-time-picker'"
        v-decorator="[ formItem.name, formItem.rule ]"
        show-time
        format="YYYY-MM-DD HH:mm:ss"
      ></a-range-picker>

      <!-- 选择框 -->
      <a-select
        v-else-if="formItem.type === 'select'"
        v-decorator="[ formItem.name, {initialValue: formItem.value, rules:formItem.rule.rules}]"
        style="width: 120px" @change='selectHandelChange'>
        <a-select-option :value="selectItem.value" v-for="(selectItem,index) in formItem.selectOpt" :key="index">
          {{selectItem.label}}
        </a-select-option>
      </a-select>

      <!-- Switch -->
      <a-switch
        v-else-if="formItem.type === 'switch'"
        @change='onSwitchChange'
        :defaultChecked="formItem.value?true:false"
        v-decorator="[ formItem.name, {initialValue: formItem.value?true:false, rules:formItem.rule.rules}]" />

      <!-- Radio -->
      <a-radio-group
        v-else-if="formItem.type === 'radio'"
        :options="formItem.selectOpt"
        v-decorator="[ formItem.name, {initialValue: formItem.value, rules:formItem.rule.rules}]"
        >
      </a-radio-group>

      <!-- upload -->
      <a-upload
        v-else-if="formItem.type === 'upload'"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        :fileList="[...formItem.fileList]"
        @change="handleChange"
        :showUploadList="true"
      >

        <div v-if="formItem.fileList.length < 1">
          <a-icon type="upload"  style="font-size: 24px;"/>
          <div class="ant-upload-text">{{formItem.label}}</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import subModule from '../state/modules/FormRender'
  export default {
    props: ['formOptions', 'selectHandelChange', 'submit','submitSuccessBack','submitUrl'],
    data() {
      return {
        labelCol: {
          xs: {span: 24},
          sm: {span: 5},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 12},
        },
        formItemLayout: {
          labelCol: {
            xs: {span: 24},
            sm: {span: 8},
          },
          wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
          },
        },
        config: {
          rules: [{type: 'object', required: true, message: 'Please select time!'}],
        },
        rangeConfig: {
          rules: [{type: 'array', required: true, message: 'Please select time!'}],
        },
        fileList:[]
      };
    },

    beforeCreate() {
      this.form = this.$form.createForm(this);
    },
    created() {
      // console.log(this.$store.dispatch());
    },
    mounted() {
      // 在这里动态注册模块
      this.$store.registerModule('subModule',subModule);
    },
    beforeDestroy () {
    // 当组件被销毁时，取消注册
      this.$store.unregisterModule('subModule');
    },
    methods: {
      onSwitchChange(checked){
        console.log(checked);
      },
      onChange(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            for (let i in values){
              if(typeof values[i] === 'boolean'){
                console.log(values[i]);
                values[i] = values[i] === true ? 1 : 0;
              }
            }
            console.log(values);
            let dataObj = {};
            dataObj.data = {...values};
            dataObj.$router = this.$router;
            //dispatch
            let res = this.$store.dispatch( this.submitUrl, dataObj);
            // res.then(res=>{
            //   console.log(res);
            //   // this.$router.go(0)
            // })
            this.$store.commit( this.submitUrl, dataObj);//同步
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  /deep/ .ant-switch:after{
    margin-left: -1px;
    top: -4px;
    width:21px;
    height:21px;
    left: 0;
  }
  /deep/ .ant-switch-checked:after{
    margin-left: 1px;
    width:21px;
    height:21px;
    background:rgba(77,136,253,1);
    box-shadow:0px 1px 2px 0px rgba(77,136,253,1);
    top: -4px;
    left: 100%;
  }
  /deep/ .ant-switch-checked{
    background-color: rgba(77,136,253,0.5);
    line-height: 16px;
    width:44px;
    height:16px;
    border-radius:16px;
  }
  /deep/ .ant-form-item .ant-switch{
    line-height: 16px;
    width:44px;
    height:16px;
    border-radius:16px;
  }
</style>
