export default {
    props: {
        data: Array,
        count: Number,
        height: Number
    },
    data() {
        return {
            tableHeight: window.innerHeight - 300
        }
    },
    created() {
        this.$nextTick(() => {
            this.getHeight()
        })
        window.addEventListener('resize', this.getHeight)
    },
    computed: {
        realTableHeight() {
            return this.height || this.tableHeight
        }
    },
    watch: {
        count(newVal) {
            setTimeout(this.getHeight)
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.getHeight)
    },

    methods: {
        getHeight() {
            this.tableHeight =
                window.innerHeight - this.$refs.table.$el.offsetTop - 80
        }
    }
}
