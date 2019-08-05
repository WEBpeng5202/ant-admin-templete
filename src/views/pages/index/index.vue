<template>
  <div class="shell">
    {{this.$route.path}}
    debounce-button: <debounce-button :options="{size:'small'}" :click="onclick" text="button">BUTTON</debounce-button>
    <br>
    <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination" :loading="loading" @change="handleTableChange" >
      <template v-for="col in ['name', 'age', 'address']" :slot="col" slot-scope="text, record, index">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class='editable-row-operations'>
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
          <span v-else>
          <a @click="() => edit(record.key)">Edit </a>
          <a @click="() => edit(record.key)">Edit </a>
          <a @click="() => edit(record.key)">Edit </a>
          <a @click="() => edit(record.key)">Edit </a>
        </span>
        </div>
      </template>
    </a-table>
    表单：
    <br>
    <form-render
      :formOptions="[
      {type:'text',label:'姓名',name:'name',value:'张三',rule:{ rules: [{ required: true, message: 'Please input your name!', }],
        }},
      {type:'radio',label:'选择框1',name:'month',selectOpt:[{label:'开始',value:'1'},{label:'截至',value:'2'}],value:'2',rule:{ rules: [{ required: true, message: 'Please input your month!', }],
        }},
      {type:'switch',label:'选择框',name:'names',selectOpt:[{label:'张三',value:'1'},{label:'李四',value:'2'}],value:0,rule:{ rules: [{ required: true, message: 'Please input your names!', }]
        }}
      ]"
      submit="index"
      :submitUrl="'subModule/indexSubmit'"
      :selectHandelChange="onclick"></form-render>
  </div>
</template>

<script lang="ts">
  /*  vue-property-decorator 装饰器
  *  @Emit
  *  @Inject
  *  @Model
  *  @Prop
  *  @Provide
  *  @Watch
  *  @Component
   */
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import FormRender from '../../../components/form-render.vue'
  // 引用组件
  @Component({
    components:{
      FormRender
    }
  })
// export default class
  export default class index extends Vue {
    // Prop

    // initial data 数据模型

    columns = [{
      title: 'name',
      dataIndex: 'name',
      // width: '25%',
      scopedSlots: { customRender: 'name' },
    }, {
      title: 'age',
      dataIndex: 'age',
      // width: '15%',
      scopedSlots: { customRender: 'age' },
    }, {
      title: 'address',
      dataIndex: 'address',
      // width: '40%',
      scopedSlots: { customRender: 'address' },
    }, {
      title: 'operation',
      dataIndex: 'operation',
      // width: '20%',
      scopedSlots: { customRender: 'operation' },
    }];

    data:any = [];
    pagination:any = {};
    cacheData:any = [];

    loading:any = false;
    // methods 方法

    onclick(e:any,v:any){
      // this.$router.push({path:'/login'})
    }
    handleTableChange (pagination:any, filters:any, sorter:any) {
      console.log(pagination);
      // Read total count from server
      let pager:any = { ...this.pagination };
      // pagination.total = data.totalCount;
      pager.total = 100;
      pager.current = pagination.current;
      this.pagination = pager;
      console.log(this.pagination);
    }

    handleChange (value:any, key:any, column:any) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData
      }
    }

    edit (key:any) {
      const newData = [...this.data];
      const target = newData.filter((item:any) => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData
      }
    }

    save (key:any) {
      const newData = [...this.data];
      const target = newData.filter((item:any) => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map((item:any) => ({ ...item }))
      }
    }

    cancel (key:any) {
      const newData = [...this.data];
      const target = newData.filter((item:any) => key === item.key)[0];
      if (target) {
        Object.assign(target, this.cacheData.filter((item:any) => key === item.key)[0]);
        delete target.editable;
        this.data = newData
      }
    }

    // lifecycle hook 生命周期函数

    created (){
      for (let i = 0; i < 100; i++) {
        this.data.push({
          key: i.toString(),
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no.London Park no. ${i}`,
        });
        this.cacheData.push({
          key: i.toString(),
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no. ${i}`,
        })
      }
    }
    mounted (){}
    destoryed (){}
    // computed 计算属性

    // watch

  }
</script>

<style scoped lang="scss">
  .shell{
    height: 100%;
    overflow: auto;
  }
</style>
