<template type="text/template" id="template_pagination">
    <section class="pages-wrap" v-show="pageInfo.total > 0">
        <ul class="pagination clearfix">
            <!-- <li :class="{'disabled': pageInfo.current == 1}"><a href="javascript:;" @click="clickCurrent(1)"> 首页 </a></li> -->
            <li :class="{'disabled': pageInfo.current == 1}">
                <a href="javascript:;" @click="clickCurrent(pageInfo.current - 1)" title="上一页">&lsaquo;</a>
            </li>
            <li v-for="(p,index) in setList" :class="{'active': pageInfo.current == p.val}" v-bind:key="index">
                <a href="javascript:;" v-if="pageInfo.current == p.val"
                    :style="{'backgroundColor':pageInfo.skin , 'borderColor':pageInfo.skin}"
                    @click="clickCurrent(p.val)">{{ p.text }}</a>
                <a href="javascript:;" v-else @click="clickCurrent(p.val)">{{ p.text }}</a>
            </li>
            <li :class="{'disabled': pageInfo.current == pageInfo.page}">
                <a href="javascript:;" @click="clickCurrent(pageInfo.current + 1)" title="下一页">&rsaquo;</a>
            </li>
            <!-- <li :class="{'disabled': pageInfo.current == pageInfo.page}"><a href="javascript:;" @click="clickCurrent(pageInfo.page)"> 尾页 </a></li> -->
            <li>
                <a>共{{pageInfo.total}}条</a>
            </li>
            <li>
                <el-dropdown class @command="handleCommand" placement="bottom-start">
                    <a class="page-sizes" href="javascript:;">{{pageInfo.pagenum}}条/页</a>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="menu-size-item" v-for="size in pageSizes" :key="size" :command="size">
                            {{size}}条/页</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="jump">
                <el-input @keyup.enter.native="jumpToTarget" v-model.trim="jumpTo"
                    v-slFormatNumber="{type: 'integer', max: 99999999, compareLength: true}" placeholder="回车跳转"
                    style="width:60px" @blur="onBlur" />
                <!-- <el-button type="primary" @click="jumpToTarget">跳转</el-button> -->
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    name: 'SlPagination',
    props: {
        pageInfo: {
            type: Object,
            required: true
        },
        pageSizes: {
            type: Array,
            required: false,
            default: () => [10, 20, 50, 100, 200]
        },
        pagegroup: {
            type: Number,
            required: false,
            default: 6
        }
    },
    data() {
        return {
            jumpTo: 1,
            checked: false
        }
    },
    computed: {
        page() {
            if (this.pageInfo.total) {
                return Math.ceil(this.pageInfo.total / this.pageInfo.pagenum)
            }
            return 0
        },
        setList() {
            let len = this.page
            let temp = []
            let list = []
            let count = Math.floor(this.pagegroup / 2)
            const remainder = this.pagegroup % 2
            if (this.pagegroup + 4 >= len) {
                while (len--) {
                    list.push({
                        text: this.page - len,
                        val: this.page - len
                    })
                }
                return list
            }
            const { current } = this.pageInfo
            const min =
                current >= this.pagegroup
                    ? len - count - 1 > current
                        ? current - count
                        : len - this.pagegroup
                    : 1
            const max = this.pagegroup + min - 1
            let num = min
            while (num <= max) {
                temp.push(num)
                num++
            }

            list = temp.map((item) => {
                return {
                    text: item,
                    val: item
                }
            })
            if (current >= this.pagegroup) {
                if (current === this.pagegroup) {
                    list.unshift({
                        text: 2,
                        val: 2
                    })
                } else {
                    list.unshift({
                        text: '...',
                        val: min - count - remainder
                    })
                }
                list.unshift({
                    text: 1,
                    val: 1
                })
            }
            if (len - count - 2 > current) {
                list.push({
                    text: '...',
                    val: max + count + 1
                })
            }
            if (len - count - 2 === current) {
                list.push({
                    text: len - 1,
                    val: len - 1
                })
            }
            list.push({
                text: this.page,
                val: this.page
            })
            return list
        }
    },
    created(argument) {},
    methods: {
        clickCurrent(idx) {
            idx = +idx
            if (
                this.pageInfo.current !== idx &&
                idx > 0 &&
                idx < this.page + 1
            ) {
                this.pageInfo.current = idx
                this.jumpTo = idx
                const pageInfo = {
                    pageIndex: this.pageInfo.current,
                    pageSize: this.pageInfo.pagenum
                }
                this.$emit('change', pageInfo)
            }
        },
        jumpToTarget() {
            if (this.jumpTo && this.jumpTo.trim() !== '') {
                this.clickCurrent(Math.min(this.jumpTo, this.page))
            }
        },
        handleCommand(val) {
            this.pageInfo.pagenum = val
            const pageInfo = {
                pageIndex: 1,
                pageSize: this.pageInfo.pagenum
            }
            this.$emit('change', pageInfo)
        },

        onBlur() {
            this.jumpTo = this.pageInfo.current
        }
    },
    watch: {
        pageInfo(val) {
            this.pageInfo = val
            this.pageInfo.page = this.pageInfo.page || this.page

            this.jumpTo = val.current
        },
        pageSizes(val) {
            this.pageSizes = val
        },
        allPageChecked(val) {
            this.checked = val
        }
    }
}
</script>
<style lang="scss" scoped>
.pages-wrap {
    text-align: center;
    vertical-align: middle;
    * {
        vertical-align: middle;
    }
}
.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 10px 0;
    border-radius: 4px;
    font-size: 14px;
}
.pagination > li {
    display: inline;
}
.pagination > .active > a,
.pagination > .active > a:hover,
.pagination > .active > span,
.pagination > .active > span:hover {
    z-index: 3;
    color: #fff;
    cursor: default;
    background-color: #00d1b2;
    border-color: #00d1b2;
}
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > span,
.pagination > .disabled > span:hover {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
}
.page-sizes:hover,
.pagination > li > a:hover,
.pagination > li > span:hover {
    z-index: 2;
    color: rgba(0, 0, 0, 0.6);
    background-color: #eee;
    border-color: #ddd;
}
.page-sizes {
    position: relative;
    padding: 0 12px;
    margin-left: -1px;
    line-height: 34px;
    height: 34px;
    display: inline-block;
    color: #000;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
}
.menu-size-item {
    padding: 5px 20px;
    font-size: 14px;
}
.pagination > li > a,
.pagination > li > span {
    position: relative;
    float: left;
    padding: 0 12px;
    margin-left: -1px;
    line-height: 34px;
    height: 34px;
    display: inline-block;
    color: #000;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
}
.pagination .jump {
    input {
        margin-top: 1px;
        margin-left: 10px;
        width: 50px;
        padding: 4px 1px;
        text-align: center;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 2px;
        border: 1px solid #c3c5c7;
    }
    button {
        margin-left: 10px;
    }
    /deep/ .el-input__inner {
        padding: 0 3px;
        height: 34px;
        text-align: center;
    }
}
</style>
