/*Copyright ©2017 TommyLemon(https://github.com/TommyLemon/APIAuto)

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.*/


import {log} from './api-util';

/**common keys and functions for APIJSON object
 * @author Lemon
 */
var JSONObject = {
  TAG: 'JSONObject',

  /**判断key是否为表名
   * @return
   */
  isTableKey: function (key?: null | string, value?: null|object, isRestful?: boolean) {
    log(this.TAG, 'isTableKey  typeof key = ' + (typeof key));
    if (key == null) {
      return false;
    }

    if (value != null && typeof value != 'object') {
      return false;
    }

    if (isRestful == true) {
      return true;
    }

    return /^[A-Z][A-Za-z0-9_]*$/.test(key);
  },
  /**判断key是否为数组名
   */
  isArrayKey: function (key?: null | string, value?: Array<any> | null | object, isRestful?: boolean) {
    log(this.TAG, 'isArrayKey  typeof key = ' + (typeof key));

    if (key == null) {
      return false;
    }

    if (isRestful == true) {
      // @ts-ignore
      return value == null || typeof value == 'array';
    }

    if (value != null && value instanceof Object == false) {
      return false;
    }

    return key.endsWith('[]');
  }

};

//TODO 取消注释  Object.freeze(JSONObject) //不可修改

export {
  JSONObject,
};
