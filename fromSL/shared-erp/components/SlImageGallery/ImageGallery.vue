<template>
    <SlImageGallery :list="imageList">
        <template v-slot="slotProps">
            <ShowImage :src="slotProps.item" :params="imgParams" :imageZoomSize="imgZoomParams">
            </ShowImage>
        </template>
    </SlImageGallery>
</template>
<script>
import SlImageGallery from 'components/SlImageGallery'
import ShowImage from 'components/StarLinkTable/show_image'

export default {
    components: {
        ShowImage,
        SlImageGallery
    },
    props: {
        imageList: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            imgParams: {
                width: 100,
                height: 100
            },
            imgZoomParams: {
                width: 700,
                height: 700
            }
        }
    },
    watch: {}
}
</script>
<style lang="scss" scoped>
.image-wrap {
    margin: 0 5px;
    border: 1px solid #ebeef5;
    border-radius: 5px;
    overflow: hidden;
}
</style>
