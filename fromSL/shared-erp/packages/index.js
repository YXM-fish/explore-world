import DictionaryServer from './dictionary'
import RulesServer from './rules'
import ConstantServer from './constant'

/**
 * 本地服务boot服务
 */
const BootServer = {
    // 本地服务安装
    install: (Vue) => {
        DictionaryServer.install(Vue)
        RulesServer.install(Vue)
        ConstantServer.install(Vue)
    }
}

export default BootServer
