<template>
    <div class="image-wrap"
        :style="{ 'width': (params.boderWidth || params.width) + 'px', 'height': (params.boderHeight || params.height) +'px'}"
        ref="imgWrap">
        <div :class="{border: !showZoomIcon , 'image-main': true}" style="width: 100%; height: 100%">
            <slot></slot>
            <i v-if="allowDel && showBtn" @click.stop="rmImage(src)" class="sl-del el-icon-delete"></i>
            <a v-show="showDownload && showBtn" class="sl-download el-icon-download" @click="downloadFile(src)"></a>
            <i v-show="showZoomIcon && showBtn" class="el-icon-zoom-in zoom-icon" @mouseenter="show"
                @mouseleave.stop="hide"></i>
            <div class="img-wrap-cover" v-if="singleUse && showBtn"></div>
            <img @click="handleImgClick" :class="{img: !showZoomIcon}" tabindex="0"
                :src="sourceImage(src, params.width, params.height)" @mouseenter.stop="show" @mouseleave.stop="hide"
                :style="{ 'maxWidth': (params.boderWidth || params.width) - 1 + 'px', 'maxHeight': (params.boderHeight || params.height) - 1 + 'px' }" />
            <div class="popover fade in" :class="direction" v-show="showPopover">
                <div class="arrow"></div>
                <div class="popover-content">
                    <img :ref="src" :src="sourceImage(src, imageZoomSize.width, imageZoomSize.height)"
                        :style="{maxWidth:imageZoomSize.width+'px',maxHeight:imageZoomSize.height+'px'}" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { sourceImageToCut } from 'utils/helper'
import UploadFile from '@/api/basicData/upload'
import Viewer from 'viewerjs'
export default {
    name: 'SlShowImage',
    props: {
        src: String,
        showZoomIcon: {
            type: Boolean,
            required: false,
            default: false
        },
        showDownload: {
            type: Boolean,
            required: false,
            default: false
        },
        showViewer: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
            required: false,
            default: 'right'
        },
        params: {
            type: Object,
            required: false,
            default: () => {
                return {
                    width: 48,
                    height: 48
                }
            }
        },
        operation: {
            type: Boolean,
            required: false,
            default: false
        },
        allowDel: {
            type: Boolean,
            required: false,
            default: false
        },
        showBtn: {
            type: Boolean,
            default: false
        },
        singleUse: {
            // 本组件仅单独使用时设置为true
            type: Boolean,
            default: false
        },
        imageZoomSize: {
            type: Object,
            default: () => ({ width: 320, height: 320 })
        }
    },
    data() {
        return {
            showPopover: false,
            viewer: null
        }
    },
    destroy() {
        this.viewer && this.viewer.destroy()
    },
    methods: {
        sourceImage(src, w, h) {
            return sourceImageToCut(src, w, h)
        },
        downloadFile(url) {
            event.stopPropagation()
            let data = url.split('/')
            UploadFile.download(url, data[data.length - 1])
        },
        handleImgClick($event) {
            if (this.operation) {
                this.$emit('handleClick')
            }
            if (this.showViewer) {
                let _this = this
                _this.viewer = new Viewer($event.target, {
                    inline: false,
                    toggleOnDblclick: false,
                    url() {
                        return _this.src
                    },
                    hide() {
                        _this.viewer.destroy()
                    }
                })
                setTimeout(() => {
                    _this.viewer.show()
                })
            }
        },
        rmImage() {
            this.$confirm('确实要删除该图片吗？', '提示', {
                lockScroll: false
            }).then(() => {
                this.$emit('imageDel')
            })
        },
        compputePosition(direction, left, right, popoverNode, dowWeight) {
            let popoverNodeLeft
            switch (direction) {
                case 'left':
                    popoverNodeLeft = left - popoverNode.offsetWidth - 12 + 'px'
                    break
                case 'right':
                    popoverNodeLeft = right + 0 + 'px'
                    break
                case 'top':
                case 'bottom':
                    popoverNodeLeft =
                        left -
                        popoverNode.offsetWidth / 2 +
                        dowWeight / 2 +
                        'px'
                    break
                default:
                    break
            }
            popoverNode.style.left = popoverNodeLeft
        },
        changeClass(popoverNode, addClassName, removeClassName) {
            popoverNode.classList.add(addClassName)
            popoverNode.classList.remove(removeClassName)
        },
        show() {
            const parentNode = this.$refs['imgWrap']
            if (!this.src || !parentNode) {
                return
            }
            this.showPopover = true
            this.$nextTick(() => {
                let popoverNode = parentNode.getElementsByClassName(
                    'popover'
                )[0]
                let arrow = popoverNode.firstChild

                let dowWeight = this.params.boderWidth || this.params.width
                let dowHeight = this.params.boderHeight || this.params.height

                const {
                    top,
                    left,
                    bottom,
                    right
                } = parentNode.getBoundingClientRect()
                const bottomDistance =
                    document.documentElement.clientHeight - bottom
                const rightDistance =
                    document.documentElement.clientWidth - right
                let height = (popoverNode.offsetHeight - dowHeight) / 2
                let width = popoverNode.offsetWidth + 20
                const space = 12

                let popoverNodeTop, popoverNodeBottom, arrowTop
                // 当direction为right/left时，顶部/底部高度不够时的处理
                if (this.direction === 'right' || this.direction === 'left') {
                    if (top < height) {
                        popoverNodeTop = 0
                        popoverNodeBottom = 'auto'
                        arrow.style.top = top + dowHeight / 2 + 'px'
                    } else if (bottomDistance < height) {
                        popoverNodeTop = 'auto'
                        popoverNodeBottom = 0
                        const arrowTopNum =
                            popoverNode.offsetHeight -
                            bottomDistance -
                            dowHeight / 2
                        arrowTop = arrowTopNum + 'px'
                        if (bottomDistance - space < -(dowHeight / 2)) {
                            arrowTop = arrowTopNum - 9 + 'px'
                        }
                    } else {
                        popoverNodeTop =
                            top -
                            popoverNode.offsetHeight / 2 +
                            dowHeight / 2 +
                            'px'
                        popoverNodeBottom = 'auto'
                        arrowTop = 50 + '%'
                    }
                }
                // 当direction为top/bottom时，设置popoverNode的left偏移
                if (this.direction === 'top' || this.direction === 'bottom') {
                    this.compputePosition(
                        this.direction,
                        left,
                        right,
                        popoverNode,
                        dowWeight
                    )
                }
                switch (this.direction) {
                    case 'top':
                        if (top > popoverNode.offsetHeight) {
                            popoverNodeTop =
                                top - popoverNode.offsetHeight - space + 'px'
                        } else {
                            popoverNodeTop = bottom + space + 'px'
                            this.changeClass(popoverNode, 'bottom', 'top')
                        }
                        break
                    case 'bottom':
                        if (bottomDistance > popoverNode.offsetHeight) {
                            popoverNodeTop = bottom + space + 'px'
                        } else {
                            popoverNodeTop =
                                top - popoverNode.offsetHeight - space + 'px'
                        }
                        break
                    case 'left':
                        if (left < width) {
                            this.compputePosition(
                                'right',
                                left,
                                right,
                                popoverNode
                            )
                            this.changeClass(popoverNode, 'right', 'left')
                        } else {
                            this.compputePosition(
                                'left',
                                left,
                                right,
                                popoverNode
                            )
                        }
                        break
                    case 'right':
                        if (rightDistance < width) {
                            this.compputePosition(
                                'left',
                                left,
                                right,
                                popoverNode
                            )
                            this.changeClass(popoverNode, 'left', 'right')
                        } else {
                            this.compputePosition(
                                'right',
                                left,
                                right,
                                popoverNode
                            )
                        }
                        break
                    default:
                        break
                }
                popoverNode.style.top = popoverNodeTop
                popoverNode.style.bottom = popoverNodeBottom
                if (arrowTop) {
                    arrow.style.top = arrowTop
                }
            })
        },
        hide() {
            this.showPopover = false
        }
    }
}
</script>

<style lang="scss" scoped>
.image-wrap {
    margin: 0 auto;
}
.border {
    border-radius: 5px;
    border: 0px solid #f2f6fc;
}
.image-main {
    position: relative;
    text-align: center;
    line-height: 1;
    cursor: pointer;
    > img {
        width: auto !important;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        outline: none;
    }
    .sl-del {
        position: absolute;
        left: 2px;
        bottom: 2px;
        font-size: 15px;
        color: #fff;
        cursor: pointer;
        z-index: 2;
    }
    .sl-download {
        position: absolute;
        left: 48%;
        bottom: 2px;
        font-size: 15px;
        color: #fff;
        cursor: pointer;
        z-index: 2;
    }
    .zoom-icon {
        position: absolute;
        right: 2px;
        bottom: 2px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        z-index: 2;
        font-size: 15px;
    }
    .popover {
        position: fixed;
        z-index: 9999999;
        padding: 1px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: left;
        text-align: start;
        text-decoration: none;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        word-break: normal;
        word-spacing: normal;
        word-wrap: normal;
        white-space: normal;
        background-color: #fff;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        line-break: auto;
        > .arrow {
            border-width: 7px;
            // border-width: 7px 12px;
        }
        > .arrow,
        > .arrow:after {
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
        }
        > .arrow:after {
            content: '';
            border-width: 10px;
        }
        .popover-content {
            padding: 9px 14px;
            img {
                width: auto !important;
                height: auto !important;
                max-width: 450px;
                max-height: 450px;
                border: 1px solid rgb(205, 205, 205);
                border-radius: 5px;
            }
        }
    }
    .popover.right {
        margin-left: 10px;
        > .arrow {
            top: 50%;
            left: -8px;
            margin-top: -11px;
            border-right-color: #999;
            border-right-color: rgba(0, 0, 0, 0.25);
            border-left-width: 0;
        }
        > .arrow:after {
            bottom: -10px;
            left: 1px;
            content: ' ';
            border-right-color: #fff;
            border-left-width: 0;
        }
    }
    .fade.in {
        opacity: 1;
    }
    .popover.top > .arrow {
        bottom: -8px;
        left: 50%;
        margin-left: -11px;
        border-bottom-width: 0;
        border-top-color: #999;
        border-top-color: rgba(0, 0, 0, 0.25);
    }
    .popover.top > .arrow:after {
        bottom: 1px;
        margin-left: -10px;
        content: ' ';
        border-bottom-width: 0;
        border-top-color: #fff;
    }

    .popover.bottom > .arrow {
        top: -8px;
        left: 50%;
        margin-left: -11px;
        border-top-width: 0;
        border-bottom-color: #999;
        border-bottom-color: rgba(0, 0, 0, 0.25);
    }
    .popover.bottom > .arrow:after {
        top: 1px;
        margin-left: -10px;
        content: ' ';
        border-top-width: 0;
        border-bottom-color: #fff;
    }
    .popover.left > .arrow {
        top: 50%;
        right: -8px;
        margin-top: -11px;
        border-right-width: 0;
        border-left-color: #999;
        border-left-color: rgba(0, 0, 0, 0.25);
    }
    .popover.left > .arrow:after {
        right: 1px;
        bottom: -10px;
        content: ' ';
        border-right-width: 0;
        border-left-color: #fff;
    }

    .img-wrap-cover {
        width: calc(100% - 4px);
        height: 16px;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.4);
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }
}
</style>
