import {JSONObject} from '../../src/apijson/JSONObject';
import {StringUtil} from '../../src/apijson/StringUtil';
import {CodeUtil}   from '../../src/apijson/CodeUtil';
import {globalVars} from '../../src/global';


declare global {
  // const JSONObject = JSONObject;
  // const StringUtil = StringUtil;
  // const CodeUtil   = CodeUtil;


  interface DocObjType {
    '[]': Array<any>;
    'Access[]': Array<any>;
    'Function[]': Array<any>;
    'Request[]': Array<any>;
  }

  interface Window {
    // StringUtil: StringUtil;
    globalVars: typeof globalVars;
  }

  namespace ThirdParty {
    interface ListCb {
      (
        platform: string, docUrl: string, listUrl: string, itemUrl: string, url_: string,
        res: null | IndexedObj, err: null | Error,
      ): void;
    }

    interface ItemCb {
      (
        platform: string, docUrl: string, listUrl: string, itemUrl: string, url_: string,
        res: null | IndexedObj, err: null | Error,
      ): void;
    }

    interface ParseCb {
      (platform, jsonData, docUrl, listUrl, itemUrl): void;
    }

  }

  namespace RequestNS {
    interface Cb {
      (url: string, res: IndexedObj, err: null | Error | {
        err: string;
        msg: string;
      }, random?: IndexedObj): void;
    }
  }

  namespace HistoryNS {
    interface Val {
      name: string;
      type: string;
      url: string;
      request: string;
      response: string;
      header: string;
      random: string;
      //
      key?: string;
    }
  }

  namespace AccountNS {
    interface Item {
      'isLoggedIn': boolean;
      'name': string;
      'phone': UndefinedAbleType<string>;
      'password': UndefinedAbleType<string>;
      id?: number;
      remember?: boolean;
    }
  }

  namespace LocalNS {
    interface Item {
      'Document': {
        'userId': UndefinedAbleType<number>;
        'name': string;
        'type': string;
        'url': string;
        'request': string;
        'header': string;
        //
        version?: number;
      }
    }
  }

}
