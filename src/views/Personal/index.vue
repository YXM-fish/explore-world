<template>
    <div>
        <page-top-form>
            <el-form :model="formInline" label-position="right" label-width="150px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="审批人">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="活动区域">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="活动区域">
                            <el-radio-group v-model="formInline.radio">
                                <el-radio :label="3">备选项</el-radio>
                                <el-radio :label="6">备选项</el-radio>
                                <el-radio :label="9">备选项</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="审批人">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="活动区域">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="活动区域">
                            <el-checkbox-group v-model="formInline.checkList">
                                <el-checkbox label="复选框 A"></el-checkbox>
                                <el-checkbox label="复选框 B"></el-checkbox>
                                <el-checkbox label="复选框 C"></el-checkbox>
                                <el-checkbox label="禁用" disabled></el-checkbox>
                                <el-checkbox label="选中且禁用" disabled></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="审批人">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="活动区域">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="活动区域">
                            <el-checkbox-group v-model="formInline.checkList">
                                <el-checkbox label="复选框 A"></el-checkbox>
                                <el-checkbox label="复选框 B"></el-checkbox>
                                <el-checkbox label="复选框 C"></el-checkbox>
                                <el-checkbox label="禁用" disabled></el-checkbox>
                                <el-checkbox label="选中且禁用" disabled></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="审批人">
                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="活动区域">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="活动区域">
                            <el-checkbox-group v-model="formInline.checkList">
                                <el-checkbox label="复选框 A"></el-checkbox>
                                <el-checkbox label="复选框 B"></el-checkbox>
                                <el-checkbox label="复选框 C"></el-checkbox>
                                <el-checkbox label="禁用" disabled></el-checkbox>
                                <el-checkbox label="选中且禁用" disabled></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </page-top-form>

        <el-table :data="tableData" :span-method="objectSpanMethod" :border="false" style="width: 100%; margin-top: 20px">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="index" width="50"></el-table-column>
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="spu" label="spu"></el-table-column>
            <el-table-column prop="sku" label="sku"></el-table-column>
            <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
            <el-table-column label="销量" align="center">
                <el-table-column prop="amount2" align="center" label="数值 2（元）"></el-table-column>
                <el-table-column prop="amount3" align="center" label="数值 3（元）"></el-table-column>
            </el-table-column>
            <el-table-column align="center">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="查看" placement="top">
                    <el-button type="info" icon="el-icon-view" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </el-tooltip>
            </el-table-column>
        </el-table>

        <el-table ref="tb1" :data="tableData1" style="width: 100%" row-key="id" lazy @selection-change="handleSelectionChange" :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期" width="380">
                <template slot-scope="scope">
                    <i v-if="scope.row.hasChildren && !scope.treeNode.expanded && !scope.treeNode.loading" class="el-icon-circle-plus-outline" @click="toggleExpand(scope, scope.row, $event)"></i>
                    <i v-if="scope.row.hasChildren && scope.treeNode.expanded && !scope.treeNode.loading" class="el-icon-remove-outline" @click="toggleExpand(scope, scope.row, $event)"></i>
                    <i v-if="scope.row.hasChildren && scope.treeNode.loading" class="el-icon-loading"></i>
                    <span>{{scope.row.date}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import pageTopForm from '_c_/pageTopForm.vue'
export default {
    data() {
        return {
            formInline: {
                user: '',
                region: '',
                checkList: [],
                radio: ''
            },
            formHeight: '',
            collapse: false,
            tableData: [
                {
                    id: '12987122',
                    name: '王小虎',
                    amount1: '234',
                    amount2: '3.2',
                    amount3: 10,
                    spu: '123',
                    sku: '123-1'
                },
                {
                    id: '12987123',
                    name: '王小虎',
                    amount1: '165',
                    amount2: '4.43',
                    amount3: 12,
                    spu: '123',
                    sku: '123-2'
                },
                {
                    id: '12987124',
                    name: '王小虎',
                    amount1: '324',
                    amount2: '1.9',
                    amount3: 9,
                    spu: '123',
                    sku: '123-3'
                },
                {
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17,
                    spu: '123',
                    sku: '123-5'
                },
                {
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15,
                    spu: '124',
                    sku: '123-5'
                },
                {
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17,
                    spu: '124',
                    sku: '123-5'
                },
                {
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15,
                    spu: '125',
                    sku: '123-5'
                },
                {
                    id: '12987125',
                    name: '王小虎',
                    amount1: '621',
                    amount2: '2.2',
                    amount3: 17,
                    spu: '125',
                    sku: '123-5'
                },
                {
                    id: '12987126',
                    name: '王小虎',
                    amount1: '539',
                    amount2: '4.1',
                    amount3: 15,
                    spu: '125',
                    sku: '123-5'
                }
            ],

            tableData1: [
                {
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    hasChildren: true
                },
                {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ]
        }
    },
    components: {
        pageTopForm
    },
    mounted() {
        this.computeIndex()
    },
    methods: {
        onSubmit() {
            console.log('submit!')
        },
        computeIndex() {
            let preIndex = 0
            let sign = 1
            this.tableData.forEach((item, index) => {
                if (index === 0) {
                    item.index = 1
                } else {
                    if (item.spu !== this.tableData[preIndex].spu) {
                        sign++
                    }
                    preIndex++
                    item.index = sign
                }
            })
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            let list = [{ spu: 'no-pre' }]
                .concat(JSON.parse(JSON.stringify(this.tableData)))
                .concat([{ spu: 'no-next' }])
            if ([0, 3, 6, 7].includes(columnIndex)) {
                let currentIndex = rowIndex + 1
                let nextIndex = currentIndex + 1
                let preIndex = currentIndex - 1
                if (list[preIndex].spu === list[currentIndex].spu) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                } else {
                    if (list[nextIndex].spu === list[currentIndex].spu) {
                        nextIndex++
                        while (list[nextIndex].spu === list[currentIndex].spu) {
                            nextIndex++
                        }
                        return {
                            rowspan: nextIndex - currentIndex,
                            colspan: 1
                        }
                    } else {
                        return {
                            rowspan: 1,
                            colspan: 1
                        }
                    }
                }
            }
        },
        load(tree, treeNode, resolve) {
            console.log(tree, treeNode)
            setTimeout(() => {
                resolve([
                    {
                        id: tree.id + '1',
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        hasChildren: true
                    },
                    {
                        id: tree.id + '2',
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }
                ])
            }, 1000)
        },
        handleSelectionChange(val) {
            console.log(val)
        },
        toggleExpand(scope, row, event) {
            console.log(scope)
            let cell = event.target.parentElement
            let icon = cell.querySelector('.el-icon-arrow-right')
            icon.click()
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-table {
    .el-table__expand-icon {
        display: none;
    }
}
</style>
