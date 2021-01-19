<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <div>
            <button @click="view('//erp-image-dev-1255302958.cos.ap-chengdu.myqcloud.com/6a66ee9345798862b7b0d3bddf0dfa92-1582956906.jpg?imageView2/0/w/180/h/180')">查看图片</button>
            <button @click="view('newteach.pbworks.com/f/ele+newsletter.docx')">查看word文档</button>
            <button @click="
                    view(
                        'http://video.ch9.ms/build/2011/slides/TOOL-532T_Sutter.pptx'
                    )
                ">查看ppt</button>
        </div>

        <el-input v-model="num" v-valid-gold="{ obj: this, key: 'num' }"></el-input>
        <div>{{ num }}</div>
        <el-input v-model="gold.value" v-valid-gold="{ obj: gold, key: 'value' }"></el-input>
        <div>{{ gold.value }}</div>
        <el-input v-model="gold.obj.count" v-valid-gold="{ obj: gold.obj, key: 'count' }"></el-input>
        {{ gold.obj.count }}
        <div  style="margin-top:1200px;">
            <template>
                <el-table ref="table" v-fixed-scroll="{
                    scrollNode: '.layout-main',
                    bindNode: '.el-table__body-wrapper'
                }" :data="tableData" @sort-change="sortChange" @expand-change="expandChange" style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.tableData" border style="width: 100%">
                                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                <el-table-column prop="address" label="地址"></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column sortable="custome" label="商品 ID" prop="id"></el-table-column>
                    <el-table-column label="商品名称" prop="name"></el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column sortable="custome" prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                                <popper position="bottom">
                                    <div slot="pop" style="font-size: 12px;font-weight: normal;">
                                        <h3>说明：</h3>
                                        <p>1、有待审核的罚款时，不允许发起付款申请和处理入库少货。</p>
                                        <p>2、审核通过后，将以金额的维度将罚款金额均摊到每个SKU的可申请付款金额上。</p>
                                        <p>3、特殊字段说明</p>
                                        <p>罚款：已审核通过的罚款</p>
                                        <p>需退款金额：入库少货中该笔采购单需退款金额（普通审核已通过的数据）。</p>
                                    </div>
                                    <div>
                                        <i class="el-icon-question" style="font-size: 20px; cursor: pointer; vertical-align: middle;color:black;"></i>
                                    </div>
                                </popper>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column label="描述" prop="desc"></el-table-column>
                </el-table>
            </template>
        </div>

        <div style="margin-top:100px;">
            <template>
                <el-table v-fixed-scroll:[self]="'.layout-main'" ref="table" :data="tableData" @expand-change="expandChange" style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.tableData" border style="width: 100%">
                                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                                <el-table-column prop="address" label="地址"></el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品 ID" prop="id"></el-table-column>
                    <el-table-column label="商品名称" prop="name"></el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" min-width="400">
                        <template slot="header">
                            <div>
                                <span style="vertical-align:middle;">采购单</span>
                                <popper position="bottom">
                                    <div slot="pop" style="font-size: 12px;font-weight: normal;">
                                        <h3>说明：</h3>
                                        <p>1、有待审核的罚款时，不允许发起付款申请和处理入库少货。</p>
                                        <p>2、审核通过后，将以金额的维度将罚款金额均摊到每个SKU的可申请付款金额上。</p>
                                        <p>3、特殊字段说明</p>
                                        <p>罚款：已审核通过的罚款</p>
                                        <p>需退款金额：入库少货中该笔采购单需退款金额（普通审核已通过的数据）。</p>
                                    </div>
                                    <div>
                                        <i class="el-icon-question" style="font-size: 20px; cursor: pointer; vertical-align: middle;color:black;"></i>
                                    </div>
                                </popper>
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <button @click="toggleFold(scope.row)">{{ scope.row.isFold ? '展开' : '收起' }}</button>
                        </template>
                    </el-table-column>
                    <el-table-column label="描述" prop="desc"></el-table-column>
                </el-table>
            </template>
        </div>

        <div v-fixed-scroll="'.layout-main'" style="overflow:auto;width:100%;padding:30px;">
            <div style="width:2000px;height:1000px;background:red;">有什么</div>
        </div>

        <div>
            <t-table :list="tableData" :config="config">
                <template v-slot:id="slotProps">
                    <div>
                        <el-button :value="slotProps.props.item.id"></el-button>
                    </div>
                </template>
                <template v-slot:name="slotProps">
                    <div>
                        <el-button :value="slotProps.props.item.name"></el-button>
                    </div>
                </template>
                <template v-slot:unfold="slotProps">
                    <div>
                        <button @click="tf(slotProps)">{{ !slotProps.props.item.unfold ? '展开' : '收起' }}</button>
                    </div>
                </template>
                <template v-slot:category="slotProps">
                    <div>
                        <el-button :value="slotProps.props.item.category"></el-button>
                    </div>
                </template>
                <template v-slot:desc="slotProps">
                    <div>
                        <button class="btn" v-if="slotProps.props.item.id != 1" @click="fight(slotProps, 'del')">删除</button>
                        <button class="btn" @click="fight(slotProps, 'add')">新增</button>
                        <button class="btn" @click="fight(slotProps, 'edit')">编辑</button>
                    </div>
                </template>

                <template v-slot:formInline="slotProps">
                    <div>
                        <el-form :inline="true" :model="slotProps.props.item.formInline" class="demo-form-inline">
                            <el-form-item label="审批人">
                                <el-input v-model="
                                        slotProps.props.item.formInline.user
                                    " placeholder="审批人"></el-input>
                            </el-form-item>
                            <el-form-item label="活动区域">
                                <el-select v-model="
                                        slotProps.props.item.formInline.region
                                    " placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </t-table>
        </div>
    </div>
</template>

<script>
import TTable from '_c_/TTable'
import popper from '_c_/YuPoper'
import watermark from '_c_/watermark.vue'
import gwm from 'gwm'

export default {
    name: 'App',
    data() {
        return {
            self: '.el-table__body-wrapper',
            num: null,
            gold: {
                value: '0.1mm',
                obj: {
                    count: '123.456'
                }
            },
            config: {
                index: {
                    show: true,
                    alias: '#'
                },
                expand: {
                    valueField: 'formInline',
                    statusField: 'unfold'
                },
                content: [
                    {
                        field: 'id',
                        alias: 'id'
                    },
                    {
                        field: 'name',
                        alias: '名称'
                    },
                    {
                        field: 'unfold',
                        alias: '展开/收起'
                    },
                    {
                        field: 'category',
                        alias: '分类'
                    },
                    {
                        field: 'desc',
                        alias: '描述'
                    }
                ],
                border: {
                    type: 'grid', // grid,line
                    width: '1px',
                    style: 'solid',
                    color: '#caccd0'
                }
            },
            list: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            formInline: {
                user: '',
                region: ''
            },
            tableData: [
                {
                    id: '1',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    unfold: false,
                    shop: '王小虎夫妻店',
                    shopId: '10333',
                    formInline: {
                        user: '',
                        region: ''
                    }
                },
                {
                    id: '2',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    unfold: false,
                    shop: '王小虎夫妻店',
                    shopId: '10333',
                    formInline: {
                        user: '',
                        region: ''
                    }
                },
                {
                    id: '3',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    unfold: false,
                    shop: '王小虎夫妻店',
                    shopId: '10333',
                    formInline: {
                        user: '',
                        region: ''
                    }
                },
                {
                    id: '4',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    desc: '荷兰优质淡奶，奶香浓而不腻',
                    address: '上海市普陀区真北路',
                    unfold: false,
                    shop: '王小虎夫妻店',
                    shopId: '10333',
                    formInline: {
                        user: '',
                        region: ''
                    }
                }
            ]
        }
    },
    computed: {
        // config() {
        //   return {
        //     index: {
        //       show: true,
        //       alias: '#'
        //     },
        //     expand: {
        //       'valueField': 'formInline',
        //       'statusField': 'unfold'
        //     },
        //     content: [
        //       {
        //         'field': 'id',
        //         'alias': 'id',
        //       },{
        //         'field': 'name',
        //         'alias': '名称',
        //       },{
        //         'field': 'unfold',
        //         'alias': '展开/收起',
        //       },{
        //         'field': 'category',
        //         'alias': '分类',
        //       },{
        //         'field': 'desc',
        //         'alias': '描述',
        //       }
        //     ]
        //   }
        // }
    },
    components: {
        TTable,
        popper,
        watermark
    },
    directives: {},
    created() {
        this.tableData.forEach(t => {
            t.isFold = true
        })
    },
    mounted() {
        gwm.creation({
            txt: '..王小明 2020-5-29',
            container: '#app',
            css: {
                'z-index': '10000',
                'pointer-events': 'none'
            },
            fontSize: 16,
            angle: 25,
            width: 260,
            height: 260
        })
    },
    watch: {},
    methods: {
        sortChange({ column, prop, order }) {
            console.log(column, prop, order)
            // prop: 属性
            // order: ascending升序，descending降序
        },
        numChange(v) {
            let newValue = v.toString()
            newValue = v
                .replace(/[^\d.]/g, '')
                .replace(/\.{2,}/g, '.')
                .replace('.', '$#$')
                .replace(/\./g, '')
                .replace('$#$', '.')
                .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
            if (
                newValue.length > 1 &&
                newValue.indexOf('.') !== 1 &&
                newValue.indexOf('0') === 0
            ) {
                newValue = newValue.toString().substring(1)
            }
            this.num = newValue
        },
        numBlur(v) {
            this.num = Number(v.target.value.replace(/\.$/, ''))
        },
        onSubmit() {
            console.log('submit!')
        },
        view(url) {
            const types = ['doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx']
            const fileTypeName = url
                .substring(url.lastIndexOf('.') + 1, url.length)
                .split('?')[0]
            const isDoc = types.find(type => type === fileTypeName)
            if (isDoc) {
                url = encodeURIComponent(url)
                url = 'http://view.officeapps.live.com/op/view.aspx?src=' + url
            }
            window.open(url, '_blank')
        },
        toggleFold(row) {
            this.$refs.table.toggleRowExpansion(row)
        },
        expandChange(row) {
            this.tableData.forEach(t => {
                t.id === row.id ? (t.isFold = !t.isFold) : ''
            })
        },
        close(e) {
            console.log(e)
        },
        fight(e, type) {
            console.log(e, type)
            this.tableData.splice(e.props.index, 1)
        },
        tf(e) {
            this.tableData[e.props.index].unfold = !this.tableData[
                e.props.index
            ].unfold
            console.log(e)
        },
        formatter(row, column) {
            return row.address
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    margin-bottom: 260px;
}
</style>
