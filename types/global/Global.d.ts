import {JSONObject} from '../../src/apijson/JSONObject';
import {StringUtil} from '../../src/apijson/StringUtil';
import {CodeUtil}   from '../../src/apijson/CodeUtil';


declare global {
  // const JSONObject = JSONObject;
  // const StringUtil = StringUtil;
  // const CodeUtil   = CodeUtil;

  interface DocObjType {
    '[]': unknown;
  }

  interface Window {
    // StringUtil: StringUtil;
  }
}
