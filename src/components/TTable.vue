<template>
    <div>
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th
                        v-if="config.index.show"
                        :style="styleObject(0, 0, 0, 0)"
                    >{{ config.index.alias || '#' }}</th>
                    <template v-for="(prop, index) in config.content">
                        <th
                            :key="index"
                            v-if="prop.field !== 'foldContent'"
                            :style="
                                styleObject(0, 0, index, config.content.length)
                            "
                        >{{ prop.alias }}</th>
                    </template>
                </tr>
            </thead>
            <tbody v-if="filtedList && filtedList.length">
                <template v-for="(item, index) in filtedList">
                    <tr :key="index">
                        <td
                            v-if="config.index.show"
                            :style="styleObject(index, filtedList.length, 0, 0)"
                        >{{ index + 1 }}</td>
                        <template v-for="(c, cindex) in config.content">
                            <td
                                :key="c.field"
                                :style="
                                    styleObject(
                                        index,
                                        filtedList.length,
                                        cindex,
                                        config.content.length
                                    )
                                "
                            >
                                <slot :name="c.field" :props="{item, index, c}"></slot>
                            </td>
                        </template>
                    </tr>
                    <tr v-if="item[config.expand.statusField]" :key="index + 'fold'">
                        <td
                            :colspan="
                                config.content.length +
                                    (config.index.show ? 1 : 0)
                            "
                            :style="styleObject(0, config.content.length, 0, 1)"
                        >
                            <slot :name="config.expand.valueField" :props="{item, index}"></slot>
                        </td>
                    </tr>
                </template>
            </tbody>
            <tbody v-else>
                <tr>
                    <td
                        :style="styleObject(0, config.content.length, 0, 1)"
                        :colspan="
                            config.content.length + (config.index.show ? 1 : 0)
                        "
                    >暂无数据</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>
<script>
// import VRuntimeTemplate from "v-runtime-template"
// import TButton from './TButton'
export default {
    name: 'TTable',
    components: {
        // VRuntimeTemplate,
        // TButton
    },
    props: {
        list: {
            type: Array,
            default: function() {
                return []
            }
        },
        config: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    computed: {
        filtedList() {
            // let include = this.config.include && this.config.include.length ? this.config.include : []
            // let filtedList = []
            // if(!include.length) filtedList = []
            // if(include.length){
            //     this.list.forEach(item => {
            //         let obj = {}
            //         include.forEach(prop => {
            //             obj[prop] = item[prop] != undefined ? item[prop] : ''
            //         })
            //         filtedList.push(obj)
            //     })
            // }
            return this.list
        }
    },
    methods: {
        setConfig() {
            const config = {
                include: []
            }
            return config
        },
        styleObject(index, length, oindex, olength) {
            let borderTop, borderLeft, borderRight
            const type = this.config.border.type || 'line'
            const width = this.config.border.width
            const style = this.config.border.style
            const color = this.config.border.color

            if (type === 'grid') {
                borderTop = `${width} ${style} ${color}`
                borderLeft = `${width} ${style} ${color}`
                borderRight =
                    oindex === olength - 1
                        ? `${width} ${style} ${color}`
                        : 'none'
            } else if (type === 'line') {
                borderTop = `${width} ${style} ${color}`
                borderLeft = 'none'
                borderRight = 'none'
            }
            return {
                borderTop: borderTop,
                borderBottom:
                    index === length - 1
                        ? `${width} ${style} ${color}`
                        : 'none',
                borderLeft: borderLeft,
                borderRight: borderRight
            }
        }
    }
}
</script>
<style lang="css" scoped>
th,
td {
    padding: 7px 5px;
}
</style>
