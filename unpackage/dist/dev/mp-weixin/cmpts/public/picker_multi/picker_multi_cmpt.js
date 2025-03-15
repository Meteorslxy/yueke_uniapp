(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["cmpts/public/picker_multi/picker_multi_cmpt"],{

/***/ 689:
/*!******************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/TurboTrainning-main_uni/cmpts/public/picker_multi/picker_multi_cmpt.vue ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./picker_multi_cmpt.vue?vue&type=template&id=30227308& */ 690);
/* harmony import */ var _picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./picker_multi_cmpt.vue?vue&type=script&lang=js& */ 692);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _picker_multi_cmpt_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./picker_multi_cmpt.vue?vue&type=style&index=0&lang=css& */ 694);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 45);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__["render"],
  _picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "cmpts/public/picker_multi/picker_multi_cmpt"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 690:
/*!*************************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/TurboTrainning-main_uni/cmpts/public/picker_multi/picker_multi_cmpt.vue?vue&type=template&id=30227308& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./picker_multi_cmpt.vue?vue&type=template&id=30227308& */ 691);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_template_id_30227308___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 691:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/TurboTrainning-main_uni/cmpts/public/picker_multi/picker_multi_cmpt.vue?vue&type=template&id=30227308& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = !_vm.isSlot ? _vm.multiIndex.length : null
  var g1 = !_vm.isSlot ? _vm.multiIndex.length : null
  var g2 = !_vm.isSlot ? _vm.multiIndex.length : null
  var g3 = !_vm.isSlot ? _vm.multiIndex.length : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 692:
/*!*******************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/TurboTrainning-main_uni/cmpts/public/picker_multi/picker_multi_cmpt.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./picker_multi_cmpt.vue?vue&type=script&lang=js& */ 693);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 693:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/TurboTrainning-main_uni/cmpts/public/picker_multi/picker_multi_cmpt.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* 参考文档: https://github.com/IceApriler/miniprogram-picker */
/*
[{
	label:'ddd' // 展示数据的字段名称
	val:'v1',
},
{
	label:'cccc',
	val:'v2'
}]
*/
var dataHelper = __webpack_require__(/*! ../../../helper/data_helper.js */ 69);
function isExist(field) {
  return field !== null && field !== undefined;
}
var _default2 = {
  data: function data() {
    return {
      // Picker当前所选择的索引数组 => 比如:[0, 0, 2]，表示第一列选择第0项，第二列选择第0项，第三列选择第2项。
      multiIndex: {
        type: Array,
        value: []
      },
      // Picker当前所展示的数组 => 比如:[['河北', '山东'], ['石家庄', '保定'], ['桥西区', '裕华区', '长安区']]。
      multiArray: {
        type: Array,
        value: []
      },
      // 用户点击确定后，所选择的值数组 => 比如:
      // [{name: '河北', id: '3110'}, {name: '石家庄', id: '3110xx'}, {name: '长安区', id: '3110xxx'}]。
      selectedArray: {
        type: Array,
        value: []
      }
    };
  },
  externalClasses: ['outside-picker-multi-class'],
  /**
   * 组件的属性列表
   */
  props: {
    // 特定类型 time
    mode: {
      // minute
      type: String,
      default: ''
    },
    // time特定类型 对应的分钟步长
    timeModeStep: {
      type: Number,
      default: 1
    },
    // 初始化时，是否需要自动返回结果给开发者
    autoSelect: {
      type: Boolean,
      default: false
    },
    // 源数组，sourceData有几维，Picker就可以有几阶
    sourceData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 阶数
    steps: {
      type: Number,
      default: 1
    },
    // 选择了第n列后，是否将大于n的列的选择值自动初始化为0
    initColumnSelectedIndex: {
      type: Boolean,
      default: false
    },
    // 默认选中项的下标数组
    itemIndex: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 默认选中项的值数组
    itemMulti: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    isSlot: {
      //是否开启slot
      type: Boolean,
      default: true
    }
  },
  created: function created() {},
  mounted: function mounted() {
    var _this = this;
    // 处理小程序 attached 生命周期
    this.attached();
    // 处理小程序 ready 生命周期
    this.$nextTick(function () {
      return _this.ready();
    });
  },
  destroyed: function destroyed() {
    // 在组件实例被从页面节点树移除时执行
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handlePageShow: function handlePageShow() {},
    handlePageHide: function handlePageHide() {},
    handlePageResize: function handlePageResize(size) {},
    ready: function ready() {},
    attached: function attached() {
      if (this.autoSelect) {
        this.processData();
      }
    },
    /**
     * 监听源数组更新变化
     *
     * @param {Array} newSourceData 源数组，newSourceData有几维，Picker就可以有几阶。
     */
    sourceDataChange: function sourceDataChange(newSourceData) {
      var steps = this.steps;
      // 源数组更新，则需要更新multiIndex、multiArray
      var multiIndex = [];
      var multiArray = [];
      newSourceData = this.checkSourceData(newSourceData);

      // console.warn(newSourceData)
      var itemIndex = this.getDefaultIndex(newSourceData);
      var handle = function handle() {
        var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var columnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        // 当前遍历Picker的第columnIndex列，
        // 当columnIndex = 0时，source表示sourceData，其它则表示子集subset
        var _multiArrayColumn0 = [];
        source.forEach(function (item, index) {
          if (columnIndex === 0) {
            // newSourceData的第0维要单独处理，最后unshift到multiArray中
            _multiArrayColumn0.push(item.label);
          }
          if (isExist(item.label) && index === (itemIndex[columnIndex] || 0)) {
            // 选中的索引和值，默认取每列的第0个
            multiIndex.push(index);
            if (columnIndex < steps - 1) {
              if (isExist(item.children)) {
                // 开始处理下一维的数据
                var _subsetArr = item.children.map(function (sub) {
                  return sub.label;
                });
                multiArray.push(_subsetArr);
                handle(item.children, columnIndex + 1);
              }
            }
          }
        });
        if (columnIndex === 0) {
          multiArray.unshift(_multiArrayColumn0);
        }
      };
      handle(newSourceData);
      this.setData({
        multiIndex: multiIndex,
        multiArray: multiArray
      });
      if (this.autoSelect) {
        this.processData();
      }
    },
    /**
     * 获取默认值index
     * @param {Array} newSourceData 源数组
     */
    getDefaultIndex: function getDefaultIndex(newSourceData) {
      var itemIndex = this.itemIndex,
        itemMulti = this.itemMulti,
        steps = this.steps;
      if (itemIndex.length) {
        return itemIndex; // 返回默认选中的下标数据
      } else if (itemMulti.length) {
        if (itemMulti.length !== steps) {
          this.consoleError(new Error('你设置的"itemMulti"字段阶数与"steps"不符，请修改后再试。'));
          return [];
        } else {
          var _defaultIndex = [];
          var handle = function handle() {
            var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var columnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            // 默认值
            _defaultIndex[columnIndex] = 0;
            source.forEach(function (item, index) {
              if (itemMulti[columnIndex] === item.val) {
                _defaultIndex[columnIndex] = index;
                if (columnIndex < steps - 1) {
                  if (item.children) {
                    // 开始处理下一维的数据
                    handle(item.children, columnIndex + 1);
                  }
                }
              }
            });
          };
          handle(newSourceData);
          return _defaultIndex;
        }
      } else {
        return [];
      }
    },
    /**
     * 校验源数组是否正确
     *
     * @param {Array} sourceData 源数组
     */
    checkSourceData: function checkSourceData(sourceData) {
      var steps = this.steps;
      var handle = function handle() {
        var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var columnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        // 当前遍历Picker的第columnIndex列，
        // 当columnIndex = 0时，source表示sourceData，其它则表示子集subset
        if (!source.length) {
          var temp = {};
          temp.label = '';
          temp.children = [];
          source.push(temp);
        }
        return source.map(function (item) {
          // 有label字段才会去遍历children字段
          if (columnIndex < steps - 1) {
            // 开始处理下一维的数据
            item.children = handle(item.children, columnIndex + 1);
          }
          return item;
        });
      };
      return handle(sourceData);
    },
    /**
     * 用户点击了确认。
     *
     * @param {Object} e 事件对象，具体参考微信小程序api。
     * @param {Array} e.detail.value 用户选择的下标数组。
     */
    pickerChange: function pickerChange(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)

      this.setData({
        multiIndex: e.detail.value
      });
      this.processData();
    },
    /**
     * 处理最终数据，将返回给开发者。
     *
     */
    processData: function processData() {
      var _this2 = this;
      var sourceData = this.sourceData,
        multiIndex = this.multiIndex;
      var selectedArray = [];
      var handle = function handle() {
        var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var columnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        source.forEach(function (item, index) {
          if (index === multiIndex[columnIndex]) {
            var node = dataHelper.deepClone(item);
            delete node.children;
            selectedArray.push(node);
            if (columnIndex < _this2.steps - 1) {
              handle(item.children, columnIndex + 1);
            }
          }
        });
      };
      handle(sourceData);
      this.setData({
        selectedArray: selectedArray
      });

      /*
      const detail = {
      selectedIndex: this.data.multiIndex,
      selectedArray: this.data.selectedArray
      }*/

      var ret = dataHelper.getArrByKey(selectedArray, 'val');
      this.$emit('select', {
        detail: ret
      });
    },
    /**
     * 用户滚动了某一列。
     *
     * @param {Object} e 事件对象，具体参考微信小程序api。
     */
    pickerColumnChange: function pickerColumnChange(e) {
      var multiArray = this.multiArray,
        sourceData = this.sourceData,
        steps = this.steps,
        initColumnSelectedIndex = this.initColumnSelectedIndex;
      var multiIndex = this.multiIndex;
      var _e$detail = e.detail,
        column = _e$detail.column,
        changeIndex = _e$detail.value;

      // console.log(`修改了Picker的第${column}列(从0开始计算)，选中了第${changeIndex}个值(从0开始计算)`)

      // multiIndex变化了，所以也要同步更新multiArray
      multiIndex[column] = changeIndex;
      if (initColumnSelectedIndex) {
        // 每次重置之后的index为0，但是有bug，待定。 => 经检查，是编辑器的问题，真机上是没有问题的。
        var _multiIndex = multiIndex.map(function (item, index) {
          if (column >= index) {
            return item;
          } else {
            return 0;
          }
        });
        multiIndex = _multiIndex;
      }
      var handle = function handle() {
        var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var columnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        // 当前遍历第 columnIndex 列
        source.forEach(function (item, index) {
          if (index === multiIndex[columnIndex]) {
            if (columnIndex < steps - 1) {
              if (!item.children) {
                item.children = [];
              }
              var multiArrayItem = item.children.map(function (sub) {
                return sub.label;
              });
              // 从第1列开始，才有可能变化
              multiArray[columnIndex + 1] = multiArrayItem;
              handle(item.children, columnIndex + 1);
            }
          }
        });
      };
      handle(sourceData);
      this.setData({
        multiArray: multiArray,
        multiIndex: multiIndex
      });
      this.$emit('columnchange', {
        detail: e
      });
    },
    /**
     * 用户点击了取消触发
     * @param {Object} e 事件对象
     */
    pickerCancel: function pickerCancel(e) {
      this.$emit('cancel', {
        detail: e
      });
    },
    /**
     * 绑定console.error
     * @param  {...any} arg 打印参数
     */
    consoleError: function consoleError() {
      var _console;
      (_console = console).error.apply(_console, arguments);
    }
  },
  watch: {
    sourceData: {
      handler: function handler(newSourceData) {
        var steps = this.steps;
        // 源数组更新，则需要更新multiIndex、multiArray
        var multiIndex = [];
        var multiArray = [];
        newSourceData = this.checkSourceData(newSourceData);

        // console.warn(newSourceData)
        var itemIndex = this.getDefaultIndex(newSourceData);
        var handle = function handle() {
          var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var columnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          // 当前遍历Picker的第columnIndex列，
          // 当columnIndex = 0时，source表示sourceData，其它则表示子集subset
          var _multiArrayColumn0 = [];
          source.forEach(function (item, index) {
            if (columnIndex === 0) {
              // newSourceData的第0维要单独处理，最后unshift到multiArray中
              _multiArrayColumn0.push(item.label);
            }
            if (isExist(item.label) && index === (itemIndex[columnIndex] || 0)) {
              // 选中的索引和值，默认取每列的第0个
              multiIndex.push(index);
              if (columnIndex < steps - 1) {
                if (isExist(item.children)) {
                  // 开始处理下一维的数据
                  var _subsetArr = item.children.map(function (sub) {
                    return sub.label;
                  });
                  multiArray.push(_subsetArr);
                  handle(item.children, columnIndex + 1);
                }
              }
            }
          });
          if (columnIndex === 0) {
            multiArray.unshift(_multiArrayColumn0);
          }
        };
        handle(newSourceData);
        this.setData({
          multiIndex: multiIndex,
          multiArray: multiArray
        });
        if (this.autoSelect) {
          this.processData();
        }
      },
      immediate: true,
      deep: true
    },
    itemMulti: {
      handler: function handler(newVal, oldVal) {
        if (JSON.stringify(newVal) != JSON.stringify(oldVal)) {
          this.sourceDataChange(this.sourceData);
        }
      },
      immediate: true,
      deep: true
    }
  }
};
exports.default = _default2;

/***/ }),

/***/ 694:
/*!***************************************************************************************************************************************************************!*\
  !*** C:/Users/liuxingyu/Desktop/TurboTrainning-main/TurboTrainning-main_uni/cmpts/public/picker_multi/picker_multi_cmpt.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./picker_multi_cmpt.vue?vue&type=style&index=0&lang=css& */ 695);
/* harmony import */ var _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_4_55_2025030718_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_picker_multi_cmpt_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 695:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/liuxingyu/Desktop/TurboTrainning-main/TurboTrainning-main_uni/cmpts/public/picker_multi/picker_multi_cmpt.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/cmpts/public/picker_multi/picker_multi_cmpt.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'cmpts/public/picker_multi/picker_multi_cmpt-create-component',
    {
        'cmpts/public/picker_multi/picker_multi_cmpt-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(689))
        })
    },
    [['cmpts/public/picker_multi/picker_multi_cmpt-create-component']]
]);
