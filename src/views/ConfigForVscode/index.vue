<template>
    <div>
        <vue-markdown>### vscode 配置详情</vue-markdown>
        <div v-html="md" v-highlightjs></div>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import configForVscode from './configForVscode.json'
const md = require('./configForVscode.md')

export default {
    data() {
        return {
            configForVscode,
            md
        }
    },
    components: {
        VueMarkdown
    }
}
</script>
<style lang="scss" scoped>
</style>
