<template>
    <div>
        <canvas id="canvas" width="400px" height="200px"></canvas>
        <el-row :gutter="10">
            <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">2</div></el-col>
            <el-col :span="6" :offset="3" :pull="3"><div class="grid-content bg-purple">3</div></el-col>
            <!-- <el-col :span="6"><div class="grid-content bg-purple">4</div></el-col> -->
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        this.initCanvas()
    },
    methods: {
        initCanvas() {
            // 定点着色器程序
            const VSHADER_SOURCE =
                'void main() {' +
                'gl_Position = vec4(0.0, 0.0, 0.0, 1.0);' +
                'gl_PointSize = 10.0;' +
                '}'
            // 片元着色器
            const FSHADER_SOURCE =
                'void main() {' +
                'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
                '}'
            const canvas = document.getElementById('canvas')
            const gl = canvas.getContext('webgl')
            // 编译着色器
            gl.clearColor(0.0, 0.0, 0.0, 1.0)
            gl.clear(gl.COLOR_BUFFER_BIT)
            const vertShader = gl.createShader(gl.VERTEX_SHADER)
            gl.shaderSource(vertShader, VSHADER_SOURCE)
            gl.compileShader(vertShader)
            const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
            gl.shaderSource(fragShader, FSHADER_SOURCE)
            gl.compileShader(fragShader)
            // 合并程序
            const shaderProgram = gl.createProgram()
            gl.attachShader(shaderProgram, vertShader)
            gl.attachShader(shaderProgram, fragShader)
            gl.linkProgram(shaderProgram)
            gl.useProgram(shaderProgram)

            gl.drawArrays(gl.POINTS, 0, 1)
        }
    }
}
</script>

<style scoped>
    .bg-purple{
        background-color: bisque;
    }
</style>
