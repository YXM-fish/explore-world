export default function tabClick(e) {
    let ids = [
        'allSalesStatisticOverall',
        'allSalesStatisticChooser',
        'allSalesStatisticColor',
        'allSalesStatisticNation',
        'allSalesStatisticCategory'
    ]
    let arrowId = `allSalesStatistic${this.activeName}`
    ids.map((id) => {
        let dom = document.getElementById(id)
        if (dom) {
            dom.style.visibility = id === arrowId ? '' : 'hidden'
        }
    })
    // this.$refs.pad.style.display = 'block'
    // // 不能使用window.scrollTo方法，此方法会造成浏览器崩溃
    // document.documentElement.scrollTop = 10
    // this.timer = setTimeout(() => {
    //     this.$refs.pad.style.display = 'none'
    //     document.documentElement.scrollTop = 0
    //     clearTimeout(this.timer)
    // }, 10)
}
