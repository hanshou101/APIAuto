const npsUtils = require('nps-utils'); // not required, but handy!

module.exports = {
  scripts: {
    // 'dev': 'parcel ./index.html ',
    'pre_dev_build': npsUtils.series(
      `echo  "开始predev"  `,
      // `( mkdir  dist || exit 0 )`,  // 只是为了创建一个目录
      `( mkdir  dist || echo '目录已存在' )`,  // 只是为了创建一个目录
      //
      `ncp    ./js          ./dist/js         --filter '**/*.*'`,
      `ncp    ./apijson     ./dist/apijson    --filter '**/*.*'`,
      `ncp    ./md          ./dist/md         --filter '**/*.*'`,
    ),
    'dev'          : npsUtils.series(
      `echo "开始dev"  `,
      'parcel ./index.html',
    ),
    /**
     * 1.临时先关闭【SVG】的体积精简，以避免触发报错。
     *        1.留待以后有时间时，再加以解决。
     */
    'build'        : 'parcel build ./index.html --no-minify',
  }
};
