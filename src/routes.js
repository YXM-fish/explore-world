
var _dynamicComponent = path => require('@/views/' + path + '.vue').default
const RouteContainer = () => import('@/RouteContainer.vue')

export const menus = [
    {
        path: 'personal',
        name: 'personal',
        meta: {
            title: '布袋公仔录',
            icon: 'el-icon-attract'
        },
        component: _dynamicComponent('Personal/index')
    },
    {
        path: 'public',
        name: 'public',
        redirect: 'public/frontend',
        meta: {
            title: '布袋人物志',
            icon: 'el-icon-printer'
        },
        component: RouteContainer,
        children: [
            {
                path: 'frontend',
                name: 'frontend',
                meta: {
                    title: '清香白莲',
                    icon: 'el-icon-mobile'
                },
                component: _dynamicComponent('Public/Frontend/index')
            },
            {
                path: 'poem',
                name: 'poem',
                meta: {
                    title: '梵天',
                    icon: 'el-icon-coordinate'
                },
                component: _dynamicComponent('Public/Poem/index')
            }
        ]
    },
    {
        path: 'vsconfig',
        name: 'vsconfig',
        meta: {
            title: 'vscode配置',
            icon: 'el-icon-attract'
        },
        component: _dynamicComponent('ConfigForVscode/index')
    },
    {
        path: 'eslintConfig',
        name: 'eslintConfig',
        meta: {
            title: 'eslint配置',
            icon: 'el-icon-attract'
        },
        component: _dynamicComponent('ConfigForEslint/index')
    },
    {
        path: 'exampler',
        name: 'exampler',
        meta: {
            title: '小李子',
            icon: 'el-icon-attract'
        },
        component: _dynamicComponent('Test')
    },
    {
        path: 'regexp',
        name: 'regexp',
        meta: {
            title: '正则',
            icon: 'el-icon-attract'
        },
        component: _dynamicComponent('Regexp/index')
    },
    {
        path: 'select',
        name: 'select',
        meta: {
            title: '下拉',
            icon: 'el-icon-attract'
        },
        component: _dynamicComponent('Select/index')
    },
    {
        path: 'gallery',
        name: 'gallery',
        meta: {
            title: '图片长廊',
            icon: 'el-icon-attract'
        },
        component: _dynamicComponent('ImageGallery/index')
    }
]

export const routes = [
    {
        path: '*',
        redirect: '/',
        component: RouteContainer
    },
    {
        path: '/',
        component: RouteContainer,
        redirect: '/layout',
        children: [
            {
                path: 'login',
                component: _dynamicComponent('Login')
            },
            {
                path: 'layout',
                component: _dynamicComponent('Layout'),
                redirect: 'layout/personal',
                children: menus
            }
        ]
    }
]
