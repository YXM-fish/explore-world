<template>
    <div>
        <el-input :type="inputType" :rows="8" v-model="innerValue" ref="textbox" :maxlength="maxlength"
            :disabled="disabled" :readonly="readonly" :placeholder="placeholder" @input="valueChanged"
            style="position: relative;">
            <template slot="prepend" v-if="showPrepend">{{prependText}}</template>
            <template slot="append" v-if="maxlength && maxlength> 0">
                <label class="prompt" v-text="maxlength - (innerValue ? innerValue.length : 0)"></label>
            </template>
        </el-input>
        <span v-if="inputType === 'textarea' && maxlength" class="el-input-count">{{innerValue.length}} /
            {{maxlength}}</span>
    </div>
</template>

<script>
export default {
    name: 'SlTextBox',
    props: {
        inputType: {
            type: String,
            required: false,
            default: 'text'
        },
        value: {
            type: [String],
            required: false,
            default: ''
        },
        maxlength: {
            type: Number,
            required: false,
            default: undefined
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false
        },
        placeholder: {
            type: String,
            required: false,
            default: undefined
        },
        showPrepend: {
            type: Boolean,
            required: false,
            default: false
        },
        prependText: {
            type: [String, Number],
            required: false,
            default: undefined
        }
    },
    mounted() {},
    data() {
        return {
            innerValue: this.value || ''
        }
    },
    methods: {
        valueChanged() {
            this.$emit('input', this.innerValue)
        }
    },
    computed: {},
    watch: {
        value(v) {
            this.innerValue = v ? v : ''
        }
    },
    components: {}
}
</script>
<style lang="scss" scoped>
.prompt {
    &::before {
        content: '';
    }
}
.el-input-count {
    color: #909399;
    background: #fff;
    position: absolute;
    font-size: 12px;
    bottom: 1px;
    right: 10px;
}
</style>

<style>
.el-textarea {
    position: relative;
}
</style>
