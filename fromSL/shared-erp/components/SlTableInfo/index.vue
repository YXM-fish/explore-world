<template>
    <el-table :data="tableData" v-bind="$attrs" v-on="$listeners" style="width: 100%" border ref="tableInfo">
        <el-table-column type="index" align="center" width="50" v-if="showIndex">
        </el-table-column>
        <el-table-column type="selection" align="center" width="55" v-if="multiple">
        </el-table-column>
        <el-table-column type="expand" v-if="expand">
            <template v-slot="{row}">
                <slot name="expand" :row="row">
                </slot>
            </template>
        </el-table-column>
        <template v-for="col in columns">
            <el-table-column :label="col.label" :key="col.name" :align="align" :header-align="headerAlign"
                :width="col.width" :class-name="col.className">
                <template slot-scope="scope">
                    <slot :name="col.name" :row="scope.row">
                        <ShowImage :src="scope.row[col.name]" v-if="col.isImage" :params="col.imagesParams" />
                        <a :href="scope.row[col.linkUrl]" v-else-if="col.isLink" target="_blank"
                            class="link">{{scope.row[col.name]}}</a>
                        <span v-else>{{scope.row[col.name]}}</span>
                    </slot>
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import ShowImage from 'components/StarLinkTable/show_image'
export default {
    name: 'SlTableInfo',
    components: { ShowImage, VRuntimeTemplate },
    props: {
        columns: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        },
        tableData: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        },
        showIndex: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        expand: {
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: 'left'
        },
        headerAlign: {
            type: String,
            default: 'center'
        },
        params: {
            type: Object,
            required: false,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {
        clearSelection() {
            this.$refs.tableInfo.clearSelection()
        }
    }
}
</script>

<style scoped lang="scss">
/deep/.align-top {
    vertical-align: top;
}
/deep/.vertical-operation {
    .cell {
        display: flex;
        flex-flow: column;
        button {
            margin-left: 0;
            margin-bottom: 10px;
        }
    }
}
.link {
    text-decoration: underline;
    text-decoration-color: grey;
    display: inline-block;
    max-width: 200px;
    &:hover {
        color: red;
    }
}
</style>
