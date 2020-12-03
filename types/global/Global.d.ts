import {JSONObject} from '../../apijson/JSONObject';
import {StringUtil} from '../../apijson/StringUtil';
import {CodeUtil}   from '../../apijson/CodeUtil';


declare global {
  const JSONObject = JSONObject;
  const StringUtil = StringUtil;
  const CodeUtil   = CodeUtil;

  interface DocObjType {
    '[]': unknown;
  }

  interface Window {
    StringUtil: StringUtil;
  }
}
