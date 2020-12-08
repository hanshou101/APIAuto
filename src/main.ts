import Vue          from 'vue';
import Main         from '../main.vue';
import {JSONObject} from './apijson/JSONObject';
import {StringUtil} from './apijson/StringUtil';
import {CodeUtil}   from './apijson/CodeUtil';
import {globalVars} from './global';

declare const $: JQShortNS.Static$;

Vue.component('vue-item', {
  props   : ['jsondata', 'theme'],
  template: '#item-template'
});

Vue.component('vue-outer', {
  props   : ['jsondata', 'isend', 'path', 'theme'],
  template: '#outer-template'
});

Vue.component('vue-expand', {
  props   : [],
  template: '#expand-template'
});

Vue.component('vue-val', {
  props   : ['field', 'val', 'isend', 'path', 'theme'],
  template: '#val-template'
});

Vue.use({
  install: function (Vue, options) {

    // 判断数据类型
    Vue.prototype.getTyp = function (val: any) {
      return toString.call(val).split(']')[0].split(' ')[1];
    };

    // 判断是否是对象或者数组，以对下级进行渲染
    Vue.prototype.isObjectArr = function (val: any) {
      return ['Object', 'Array'].indexOf(this.getTyp(val)) > -1;
    };

    // 折叠
    Vue.prototype.fold   = function ($event) {
      var target = Vue.prototype.expandTarget($event);
      target.siblings('svg').show();
      target.hide().parent().siblings('.expand-view').hide();
      target.parent().siblings('.fold-view').show();
    };
    // 展开
    Vue.prototype.expand = function ($event) {
      var target = Vue.prototype.expandTarget($event);
      target.siblings('svg').show();
      target.hide().parent().siblings('.expand-view').show();
      target.parent().siblings('.fold-view').hide();
    };

    //获取展开折叠的target
    Vue.prototype.expandTarget = function ($event: any) {
      switch ($event.target.tagName.toLowerCase()) {
        case 'use':
          return $($event.target).parent();
        case 'label':
          return $($event.target).closest('.fold-view').siblings('.expand-wraper').find('.icon-square-plus').first();
        default:
          return $($event.target);
      }
    };

    // 格式化值
    Vue.prototype.formatVal = function (val) {
      switch (Vue.prototype.getTyp(val)) {
        case 'String':
          return '"' + val + '"';
        case 'Null':
          return 'null';
        default:
          return val;
      }
    };

    // 判断值是否是链接
    Vue.prototype.isaLink = function (val) {
      return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(val);
    };

    // 计算对象的长度
    Vue.prototype.objLength = function (obj) {
      return Object.keys(obj).length;
    };

    /**渲染 JSON key:value 项
     * @author TommyLemon
     * @param val
     * @param key
     * @return {boolean}
     */
    Vue.prototype.onRenderJSONItem = function (val, key, path) {
      if (globalVars.isSingle || key == null) {
        return true;
      }
      if (key == '_$_this_$_') {
        // return true
        return false;
      }

      var method    = (AppTrueCp).getMethod();
      var mIndex    = method == null ? -1 : method.indexOf('/');
      var isRestful = mIndex > 0 && mIndex < method.length - 1;

      try {
        if (val instanceof Array) {
          if (val[0] instanceof Object && (val[0] instanceof Array == false) && JSONObject.isArrayKey(key, null, isRestful)) {
            // alert('onRenderJSONItem  key = ' + key + '; val = ' + JSON.stringify(val))

            var ckey = key.substring(0, key.lastIndexOf('[]'));

            var aliaIndex = ckey.indexOf(':');
            var objName   = aliaIndex < 0 ? ckey : ckey.substring(0, aliaIndex);

            var firstIndex = objName.indexOf('-');
            var firstKey   = firstIndex < 0 ? objName : objName.substring(0, firstIndex);

            for (var i = 0; i < val.length; i++) {
              var cPath = (StringUtil.isEmpty(path, false) ? '' : path + '/') + key;

              if (JSONObject.isTableKey(firstKey, val, isRestful)) {
                // var newVal = JSON.parse(JSON.stringify(val[i]))

                var newVal: IndexedObj = {};
                for (var k in val[i]) {
                  newVal[k] = val[i][k]; //提升性能
                  delete val[i][k];
                }

                val[i]._$_this_$_ = JSON.stringify({
                  path : cPath + '/' + i,
                  table: firstKey
                });

                for (var k in newVal) {
                  val[i][k] = newVal[k];
                }
              } else {
                this.onRenderJSONItem(val[i], '' + i, cPath);
              }

              // this.$children[i]._$_this_$_ = key
              // alert('this.$children[i]._$_this_$_ = ' + this.$children[i]._$_this_$_)
            }
          }
        } else if (val instanceof Object) {
          var aliaIndex = key.indexOf(':');
          var objName   = aliaIndex < 0 ? key : key.substring(0, aliaIndex);

          // var newVal = JSON.parse(JSON.stringify(val))

          var newVal: IndexedObj = {};
          for (var k in val) {
            newVal[k] = val[k]; //提升性能
            delete val[k];
          }

          val._$_this_$_ = JSON.stringify({
            path : (StringUtil.isEmpty(path, false) ? '' : path + '/') + key,
            table: JSONObject.isTableKey(objName, val, isRestful) ? objName : null
          });

          for (var k in newVal) {
            val[k] = newVal[k];
          }

          // val = Object.assign({ _$_this_$_: objName }, val) //解决多显示一个逗号 ,

          // this._$_this_$_ = key  TODO  不影响 JSON 的方式，直接在组件读写属性
          // alert('this._$_this_$_ = ' + this._$_this_$_)
        }


      } catch (e) {
        alert('onRenderJSONItem  try { ... } catch (e) {\n' + e.message);
      }

      return true;

    };


    /**显示 Response JSON 的注释
     * @author TommyLemon
     * @param val
     * @param key
     * @param $event
     */
    Vue.prototype.setResponseHint = function (val, key, $event) {
      console.log('setResponseHint');
      ((this as any).$refs.responseKey as HTMLSpanElement).setAttribute('data-hint',
        globalVars.isSingle ? '' : this.getResponseHint(val, key, $event));
    };
    /**获取 Response JSON 的注释
     * 方案一：
     * 拿到父组件的 key，逐层向下传递
     * 问题：拿不到爷爷组件 "Comment[]": [ { "id": 1, "content": "content1" }, { "id": 2 }... ]
     *
     * 方案二：
     * 改写 jsonon 的 refKey 为 key0/key1/.../refKey
     * 问题：遍历，改 key；容易和特殊情况下返回的同样格式的字段冲突
     *
     * 方案三：
     * 改写 jsonon 的结构，val 里加 .path 或 $.path 之类的隐藏字段
     * 问题：遍历，改 key；容易和特殊情况下返回的同样格式的字段冲突
     *
     * @author TommyLemon
     * @param val
     * @param key
     * @param $event
     */
    Vue.prototype.getResponseHint = function (val, key, $event: any) {
      // alert('setResponseHint  key = ' + key + '; val = ' + JSON.stringify(val))

      var s = '';

      try {

        var path   = null;
        var table  = null;
        var column = null;

        var method    = (AppTrueCp).getMethod();
        var mIndex    = method == null ? -1 : method.indexOf('/');
        var isRestful = mIndex > 0 && mIndex < method.length - 1;

        if (val instanceof Object && (val instanceof Array == false)) {

          var parent    = $event.currentTarget.parentElement.parentElement;
          var valString = parent.textContent;

          // alert('valString = ' + valString)

          var i = valString.indexOf('"_$_this_$_":  "');
          if (i >= 0) {
            valString = valString.substring(i + '"_$_this_$_":  "'.length);
            i         = valString.indexOf('}"');
            if (i >= 0) {
              valString      = valString.substring(0, i + 1);
              // alert('valString = ' + valString)
              var _$_this_$_ = JSON.parse(valString) || {};
              path           = _$_this_$_.path;
              table          = _$_this_$_.table;
            }


            var aliaIndex       = key == null ? -1 : key.indexOf(':');
            var objName: string = aliaIndex < 0 ? key : key.substring(0, aliaIndex);

            if (JSONObject.isTableKey(objName, val, isRestful)) {
              table = objName;
            } else if (JSONObject.isTableKey(table, val, isRestful)) {
              column = key;
            }

            // alert('path = ' + path + '; table = ' + table + '; column = ' + column)
          }
        } else {
          var parent    = $event.currentTarget.parentElement.parentElement;
          var valString = parent.textContent;

          // alert('valString = ' + valString)

          var i = valString.indexOf('"_$_this_$_":  "');
          if (i >= 0) {
            valString = valString.substring(i + '"_$_this_$_":  "'.length);
            i         = valString.indexOf('}"');
            if (i >= 0) {
              valString      = valString.substring(0, i + 1);
              // alert('valString = ' + valString)
              var _$_this_$_ = JSON.parse(valString) || {};
              path           = _$_this_$_.path;
              table          = _$_this_$_.table;
            }
          }

          if (val instanceof Array && JSONObject.isArrayKey(key, val, isRestful)) {
            var key2 = key == null ? null : key.substring(0, key.lastIndexOf('[]'));

            var aliaIndex       = key2 == null ? -1 : key2.indexOf(':');
            var objName: string = (aliaIndex < 0 ? key2 : key2?.substring(0, aliaIndex)) as string;    // FIXME 此处，用了一个强转类型。

            var firstIndex = objName == null ? -1 : objName.indexOf('-');
            var firstKey   = firstIndex < 0 ? objName : objName.substring(0, firstIndex);

            // alert('key = ' + key + '; firstKey = ' + firstKey + '; firstIndex = ' + firstIndex)
            if (JSONObject.isTableKey(firstKey, null, isRestful)) {
              table = firstKey;

              var s0 = '';
              if (firstIndex > 0) {
                objName    = objName.substring(firstIndex + 1);
                firstIndex = objName.indexOf('-');
                column     = firstIndex < 0 ? objName : objName.substring(0, firstIndex);

                var pathUri = (StringUtil.isEmpty(path) ? '' : path + '/') + key;

                var c = CodeUtil.getCommentFromDoc(globalVars.docObj == null ? null : globalVars.docObj['[]'], table, column, (AppTrueCp).getMethod(), (AppTrueCp).database, (AppTrueCp).language, true, false, pathUri.split('/'), isRestful, val); // this.getResponseHint({}, table, $event
                s0    = column + (StringUtil.isEmpty(c, true) ? '' : ': ' + c);
              }

              var pathUri = (StringUtil.isEmpty(path) ? '' : path + '/') + (StringUtil.isEmpty(column) ? key : column);

              var c = CodeUtil.getCommentFromDoc(
                globalVars.docObj == null ? null : globalVars.docObj['[]'], table, isRestful ? key : null,
                (AppTrueCp).getMethod(), (AppTrueCp).database, (AppTrueCp).language,
                true, false, pathUri.split('/'), isRestful, val);
              s     = (StringUtil.isEmpty(path) ? '' : path + '/') + key + ' 中 '
                + (
                  StringUtil.isEmpty(c, true) ? '' : table + ': '
                    + c + ((StringUtil.isEmpty(s0, true) ? '' : '  -  ' + s0))
                );

              return s;
            }
            //导致 key[] 的 hint 显示为  key[]key[]   else {
            //   s = (StringUtil.isEmpty(path) ? '' : path + '/') + key
            // }
          } else {
            if (isRestful || JSONObject.isTableKey(table)) {
              column = key;
            }
            // alert('path = ' + path + '; table = ' + table + '; column = ' + column)
          }
        }
        // alert('setResponseHint  table = ' + table + '; column = ' + column)

        var pathUri = (StringUtil.isEmpty(path) ? '' : path + '/') + key;
        var c       = CodeUtil.getCommentFromDoc(globalVars.docObj == null ? null : globalVars.docObj['[]'], table, isRestful ? key : column, method, (AppTrueCp).database, (AppTrueCp).language, true, false, pathUri.split('/'), isRestful, val);

        s += pathUri + (StringUtil.isEmpty(c, true) ? '' : ': ' + c);
      } catch (e) {
        s += '\n' + e.message;
      }

      return s;
    };

  }
});

//这些全局变量不能放在data中，否则会报undefined错误

// APIJSON >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var __App = new Vue({
  el    : '#app',
  render: (h) => h(Main),
});
// .$mount('#app');


var AppTrueCp: any = __App.$children[0];

// console.log('App', App);
