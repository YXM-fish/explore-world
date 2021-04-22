export function buildListShow(cols, row, hideLabelWhenValIsEmtpy = false) {
    let result = []
    result = cols.map(item => {
        let innverVal = item.fun ? item.fun(row) : row[item.name]
        let html = `<p style="${item.style ? item.style : ''}">
                        <label style="vertical-align: top;">${item.title ? item.title + '：' : ''}</label>
                        <span style="${item.valueStyle ? item.valueStyle : ''}">${innverVal ? innverVal : ''}</span>
                    </p>`

        return hideLabelWhenValIsEmtpy ? innverVal ? html : '' : html
    })
    return result.join('')
}
