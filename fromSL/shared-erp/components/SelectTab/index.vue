<template>
    <div class="select-tab">
        <div class="select-tab-item">

        </div>
        <div class="select-tab-item"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.select-tab {
    display: inline-block;
    border: 1px solid #eee;
    .select-tab-item {
        width: 50%;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #000;
    }
    .active {
        background-color: #449dfc;
        color: white;
    }
    .hover {
        animation: font-blue 2s infinite;
    }
}

@-webkit-keyframes font-blue {
    0% {
        color: #78baff;
    }
    50% {
        color: #409eff;
    }
    100% {
        color: #409eff;
    }
}
</style>