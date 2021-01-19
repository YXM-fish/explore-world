<template>
    <div style="width: 300px;">
        <YuSelect v-model="val" :options="list" :multiple="true" filterable>
            <template v-slot="slotScope">
                <div>
                    <div style="height: 30px;">ID:{{slotScope.item.value}}</div>
                    <div style="line-height: 30px;">LABEL:{{slotScope.item.label}}</div>
                </div>
            </template>
        </YuSelect>
    </div>
</template>
<script>
import YuSelect from '_c_/YuSelect.vue'
export default {
    components: {
        YuSelect
    },
    data() {
        return {
            val: [1],
            options: [
                {
                    value: 1,
                    label: 1
                },
                {
                    value: 2,
                    label: 2
                }
            ],
            list: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            let arr = ['好么', '真的一切都好', '己所不欲，勿施于人。', 'anything is possibble, trust yourself!']
            for (let i = 0; i < 10000; i++) {
                this.list.push({
                    label: `选项${i}：${arr[i % 4]}`,
                    value: i
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
