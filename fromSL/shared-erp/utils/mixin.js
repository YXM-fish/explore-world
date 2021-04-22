const mixin = {
    methods:{
        getDefaultWarehouseId() {
            return this.$store.state.user.defaultWarehouseId
        }
    }
}
export default mixin