<template>
    <el-button class="solid-button" icon="el-icon-download" circle @click="handleDownload">导出当前页</el-button>
</template>

<script>
    export default {
        name: "Excel",
        props:{
            filename:{
                type: String,
                default:'excel'
            },
            tHeader:{
                type: Array,
                default:function(){
                    return [];//或者是return {}
                }
            },
            filterVal:{
                type: Array,
                default:function(){
                    return [];//或者是return {}
                }
            },
            list:{
                type: Array,
                default:function(){
                    return [];//或者是return {}
                }
            },
            autoWidth:{
                type: Boolean,
                default:true
            }
        },
        methods:{
            handleDownload() {
                import('../vendor/Export2Excel').then(excel => {
                    const tHeader = this.tHeader;
                    const filterVal = this.filterVal;
                    const list = this.list;
                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename,
                        autoWidth: this.autoWidth,
                        bookType: 'xlsx'
                    })
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
        }
    }
</script>

<style scoped>

</style>
