<template>
    <div>
        <div class="clearfix" style="line-height:30px">
            <slot></slot>
            <el-button type="text" style="float:right;margin-right:4em" @click="selectAllPictures">
                {{hasSelectedAllPictures?'取消全选':'全选'}}</el-button>
        </div>
        <div class="sl-picture-library" :class="{'sl-picture-library--border':addBorder}">
            <div class="picture-item" :style="{height:itemHeight}" v-for="(item,index) in items" :key="`item-${index}`">
                <div class="picture-item--img" @click.stop="itemClick(item)">
                    <i v-if="item.checked" class="el-icon-success checked-icon--fix"></i>
                    <img :src="item.src" alt="图片">
                </div>
                <span class="font-size-12 picture-item--label" v-if="item.showLabel && item.label"
                    :title="item.label">{{item.label}}</span>

                <p v-show="needLimitProportion && item.checked && validateHWFail(index)" class="size-error">
                    {{$t('imgError.proportion')}}
                </p>
                <p v-show="needLimitSize && item.checked && validateSizeFail(index)" class="size-error">
                    {{$t('imgError.size')}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { validateImgUrlHW, validateImgUrlSize } from 'utils/imageHelper'
import { isEmpty } from 'utils'

export default {
    name: 'SlPictureLibrary',
    components: {},
    model: {
        prop: 'list',
        event: 'listChange'
    },
    data() {
        return {
            items: []
        }
    },
    props: {
        itemHeight: {
            type: String,
            default: '10em'
        },
        addBorder: {
            type: Boolean,
            default: true
        },
        list: {
            type: Array,
            default: () => []
        },
        allowProportion: {
            // 图片比例限制，不传为不限制
            type: Array,
            required: false,
            default: () => []
        },
        limitSize: {
            // 图片大小限制，单位为Mb，不传为不限制
            type: [String, Number],
            required: false,
            default: ''
        }
    },
    computed: {
        validateHWFail() {
            return (index) => {
                return (
                    this.items[index].proportionOk !== null &&
                    !this.items[index].proportionOk
                )
            }
        },
        validateSizeFail() {
            return (index) => {
                return (
                    this.items[index].sizeOk !== null &&
                    !this.items[index].sizeOk
                )
            }
        },
        needLimitSize() {
            return !isEmpty(this.limitSize)
        },
        needLimitProportion() {
            return this.allowProportion.length > 0
        },
        hasSelectedAllPictures() {
            return (
                this.items.length > 0 &&
                this.items.every((every) => every.checked)
            )
        }
    },
    watch: {
        list: {
            handler: function (val, oldVal) {
                this.items = JSON.parse(JSON.stringify(val))
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        selectAllPictures() {
            let hasSeletedAll = this.hasSelectedAllPictures
            this.items.forEach((item) => {
                if (hasSeletedAll) {
                    item.checked = false
                } else {
                    if (!item.checked) {
                        item.checked = true
                    }
                }
            })
            this.allValidate()
            this.emitListChange()
        },
        itemClick(item) {
            item.checked = !item.checked
            this.allValidate()
            this.emitListChange()
        },
        allValidate() {
            if (this.needLimitProportion) {
                this.validateProportion()
            }
            if (this.needLimitSize) {
                this.validateSize()
            }
        },
        validateProportion() {
            this.items.forEach((item, index) => {
                if (!item.checked) return
                let noValidated = this.items[index].proportionOk === null

                let imgUrl = item.src
                if (noValidated) {
                    let allowProportion = [1.33, 1]
                    // 首次校验
                    validateImgUrlHW(imgUrl, allowProportion).then(
                        () => {
                            this.$set(this.items[index], 'proportionOk', true)
                            this.emitListChange()
                        },
                        () => {
                            this.$set(this.items[index], 'proportionOk', false)
                            this.emitListChange()
                        }
                    )
                }
            })
        },
        validateSize() {
            this.items.forEach((item, index) => {
                if (!item.checked) return
                let noValidated = this.items[index].sizeOk === null
                let imgUrl = item.src

                if (noValidated) {
                    // 首次校验
                    validateImgUrlSize(imgUrl, this.limitSize).then(
                        () => {
                            this.$set(this.items[index], 'sizeOk', true)
                            this.emitListChange()
                        },
                        () => {
                            this.$set(this.items[index], 'sizeOk', false)
                            this.emitListChange()
                        }
                    )
                }
            })
        },
        emitListChange() {
            this.$emit('listChange', this.items)
        }
    }
}
</script>

<style lang="scss" scoped>
.checked-icon--fix {
    position: absolute;
    right: 0;
    font-size: 1.5em;
    color: #67c23a;
    background: content-box
        radial-gradient(circle at center, #fff 0, #fff 50%, transparent 60%);
}

.picture-item--label {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.1em;
    max-width: 100%;
    color: #fff;
    text-align: right;
    background: rgba(0, 0, 0, 0.4);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.sl-picture-library--border {
    border: 1px solid #ebeef5;
}

.sl-picture-library {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5em 0.5em 0 0.5em;
    .picture-item {
        position: relative;
        height: 10em;
        margin-right: 0.5em;
        // margin-bottom: 0.5em;
        margin-bottom: 2.5em;
        .picture-item--img {
            height: 100%;
            img {
                height: 100%;
            }
        }
        &:hover {
            cursor: pointer;
        }
    }
}

.size-error {
    text-align: center;
    color: red;
}
</style>
