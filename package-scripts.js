const npsUtils = require('nps-utils'); // not required, but handy!

module.exports = {
  scripts: {
    // 'dev': 'parcel ./index.html ',
    'pre_dev_build': npsUtils.series(
      `echo  "开始predev"  `,
      // `( mkdir  dist || exit 0 )`,  // 只是为了创建一个目录
      `( mkdir  dist || echo '目录已存在' )`,  // 只是为了创建一个目录
      //
      //
      `ncp    ./js          ./dist/js         --filter '**/*.*'`,
      // `ncp    ./apijson     ./dist/apijson    --filter '**/*.*'`,        // 已处理完毕，内置化了
      `ncp    ./md          ./dist/md         --filter '**/*.*'`,
      `ncp    ./svg         ./dist/svg        --filter '**/*.*'`,   // WARN 为了处理【--no-minify】后，svg相关文件，打包后位置不正确的问题
    ),
    'dev'          : npsUtils.series(
      `echo "开始dev"  `,
      'parcel ./index.html',
    ),
    /**
     * 1.临时先关闭【SVG】的体积精简，以避免触发报错。
     *        1.留待以后有时间时，再加以解决。
     */
    'build'        : 'parcel build ./index.html    --no-minify     --public-url ./    ',
  }
};
