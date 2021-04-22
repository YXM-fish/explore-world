## 用法
+ 用于`el-form`
```javascript
<template>
    <el-form :rules="{minValue: [$rules()
                        .validateEmpty('请输入最小值')
                        .validateMinNumber(`最小值不能大于${maxValue}`, maxValue)
                        .end()]}">
    </el-form>
</template>
``` 

+ 用于`el-form-item`
```javascript
<template>
    <el-form>
        <el-form-item label="最小值：" prop="minValue" :rules="[$rules()
                            .validateEmpty('请输入最小值')
                            .validateMinNumber(`最小值不能大于${maxValue}`, maxValue)
                            .end()]">
        </el-form-item>
    </el-form>
</template>
```

+ 页面使用自定义校验(通过addCustomize方法)
```javascript
<template>
    <el-form-item label="最小值：" prop="minValue" :rules="[$rules()
                        .validateEmpty('请输入最小值')
                        .validateMinNumber(`最小值不能大于${maxValue}`, maxValue)
                        .addCustomize(customize('请输入2000'))
                        .end()]">
    </el-form-item>
</template>

<script>
export default {
    methods: {
        customize(tips) {
            return (value) => {
                if (Number(value) !== 2000) {
                    return tips
                }
                return true
            }
        },
    }
}
</script>
```
