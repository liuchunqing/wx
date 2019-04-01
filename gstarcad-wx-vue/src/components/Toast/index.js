/**
 * 自定义Toast弹框
 */

var showToast = false, //存储Toast显示状态
    showLoad = false, //存储loading显示状态
    toastVM = null, //存储toast vm
    loadNode = null; //存储toast node

var Toast = {
    install(Vue, options) {
        //参数
        var opt = {
            defaultType: 'bottom',
            duration: '2500',
            wordWarp: false
        }
        for (var property in options) {
            opt[property] = options[property]
        }
        Vue.prototype.$toast = function(tips, type) {
            var curType = type ? type : opt.defaultType
            var wordWrap = opt.wordWrap ? 'lx-word-wrap' : ''
            var style = opt.width ? 'style="width: ' + opt.width + '"' : ''
            var tmp = '<div v-show="show" :class="type" class="lx-toast ' + wordWrap + '" ' + style + '>{{tip}}</div>'

            if (showToast) {
                return;
            }
            if (!toastVM) {
                var ToastTpl = Vue.extend({
                    data() {
                        return {
                            show: showToast,
                            tip: tips,
                            type: 'lx-toast-' + curType
                        }
                    },
                    template: tmp
                })
                toastVM = new ToastTpl()
                var tpl = toastVM.$mount().$el
                document.body.appendChild(tpl)
            }
            toastVM.type = 'lx-toast-' + curType
            toastVM.tip = tips
            toastVM.show = showToast = true

            setTimeout(() => {
                toastVM.show = showToast = false
            }, opt.duration)
        }
        var toastType = ['bottom', 'center', 'top']
        toastType.forEach(function(type) {
            Vue.prototype.$toast[type] = function(tips) {
                return Vue.prototype.$toast(tips, type)
            }
        });

        Vue.prototype.$loading = function(tips, type) {
            if (type === 'close') {
                loadNode.show = showLoad = false
            } else {
                if (showLoad) {
                    return
                }
                var loadTmp = Vue.entend({
                    data() {
                        return {
                            show: showLoad
                        }
                    },
                    template: '<div v-show="show" class="lx-load-mark"><div class="lx-load-box"><div class="lx-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="lx-load-content">' + tips + '</div></div></div>'

                })
                loadNode = new loadTmp()
                var tmp = loadNode.$mount().$el

                document.body.appendChild(tmp)

                loadNode.show = showLoad = true
            }
        }
        var loadType = ['open', 'close'];
        loadType.forEach(type => {
            Vue.prototype.$loading[type] = function(tips) {
                return Vue.prototype.$loading(tips, type)
            }
        })
    }
}

module.exports = Toast