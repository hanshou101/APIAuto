export const globalVars = function () {
  const URL_BASE = 'http://apijson.cn:8080'; // 基地址
  const KEY_ID   = 'id';

  return {
    URL_BASE,                       // 基地址
    URL_GET                   : URL_BASE + '/get', // 常规获取数据方式
    URL_HEAD                  : URL_BASE + '/head', // 检查，默认是非空检查，返回数据总数
    URL_GETS                  : URL_BASE + '/gets', // 通过POST来GET数据，不显示请求内容和返回结果，一般用于对安全要求比较高的请求
    URL_HEADS                 : URL_BASE + '/heads', // 通过POST来HEAD数据，不显示请求内容和返回结果，一般用于对安全要求比较高的请求
    URL_POST                  : URL_BASE + '/post', // 新增(或者说插入)数据
    URL_PUT                   : URL_BASE + '/put', // 修改数据，只修改传入字段对应的值
    URL_DELETE                : URL_BASE + '/delete', // 删除数据
    //
    //
    //
    isSingle                  : true,
    docObj                    : undefined as (DocObjType | null | undefined),
    //
    //
    //
    CODE_SUCCESS              : 200, //成功
    CODE_UNSUPPORTED_ENCODING : 400, //编码错误
    CODE_ILLEGAL_ACCESS       : 401, //权限错误
    CODE_UNSUPPORTED_OPERATION: 403, //禁止操作
    CODE_NOT_FOUND            : 404, //未找到
    CODE_ILLEGAL_ARGUMENT     : 406, //参数错误
    CODE_NOT_LOGGED_IN        : 407, //未登录
    CODE_TIME_OUT             : 408, //超时
    CODE_CONFLICT             : 409, //重复，已存在
    CODE_CONDITION_ERROR      : 412, //条件错误，如密码错误
    CODE_UNSUPPORTED_TYPE     : 415, //类型错误
    CODE_OUT_OF_RANGE         : 416, //超出范围
    CODE_NULL_POINTER         : 417, //对象为空
    CODE_SERVER_ERROR         : 500, //服务器内部错误
    //
    MSG_SUCCEED               : 'success', //成功
    MSG_SERVER_ERROR          : 'Internal Server Error!', //服务器内部错误
    //
    KEY_CODE                  : 'code',
    KEY_MSG                   : 'msg',
    KEY_ID,
    KEY_ID_IN                 : KEY_ID + '{}',
    KEY_COUNT                 : 'count',
    KEY_TOTAL                 : 'total',

  };
}();
