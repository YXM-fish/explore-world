/*
 * elementui -> el-table 合并单元格帮助类
 * Created by zhangjian on 20/06/02.
 */
export default class ElTableHelper {
    constructor(oprions) {
        this.data = null
        this.needMergeArr = null
        this.rowMergeArrs = {}

        this.init(oprions)
    }

    init(oprions) {
        if (!oprions) return

        for (let option in oprions) {
            if (oprions.hasOwnProperty(option)) {
                this[option] = oprions[option]
            }
        }

        this.rowMergeHandle()
    }

    onArraySpanMethod(column, rowIndex) {
        if (this.needMergeArr.includes(column.property)) {
            return this.mergeAction(column.property, rowIndex)
        }
    }

    mergeAction(val, rowIndex) {
        let _row = this.rowMergeArrs[val].rowArr[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return [_row, _col];
    }

    rowMergeHandle() {
        if (!Array.isArray(this.needMergeArr) && !this.needMergeArr.length) return false;
        if (!Array.isArray(this.data) && !this.data.length) return false;
        let needMerge = {}, arr = this.needMergeArr, data = this.data
        arr.forEach(i => {
            needMerge[i] = {
                rowArr: [],
                rowMergeNum: 0
            };
            data.forEach((m, index) => {
                if (index === 0) {
                    needMerge[i].rowArr.push(1)
                    needMerge[i].rowMergeNum = 0
                }
                else {
                    if (m[i] === data[index - 1][i]) {
                        needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1
                        needMerge[i].rowArr.push(0)
                    }
                    else {
                        needMerge[i].rowArr.push(1)
                        needMerge[i].rowMergeNum = index
                    }
                }
            })
        })
        this.rowMergeArrs = needMerge
    }
}