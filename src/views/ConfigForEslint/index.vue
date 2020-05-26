<template>
    <div>
        <vue-markdown>### ESLint 配置详情</vue-markdown>
        <div v-html="md" v-highlightjs></div>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import configForEslint from './configForEslint.js'
const md = require('./configForEslint.md')

export default {
    data() {
        return {
            configForEslint,
            md
        }
    },
    components: {
        VueMarkdown
    },
    mounted() {}
}
</script>
<style lang="scss" scoped>
</style>
