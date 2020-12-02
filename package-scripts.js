const npsUtils = require('nps-utils'); // not required, but handy!

module.exports = {
  scripts: {
    // 'dev': 'parcel ./index.html ',
    'predev': npsUtils.series(
      `echo  "开始predev"  `,
      // `( mkdir  dist || exit 0 )`,  // 只是为了创建一个目录
      `( mkdir  dist || echo '目录已存在' )`,  // 只是为了创建一个目录
      //
      `ncp    ./js          ./dist/js         --filter '**/*.*'`,
      `ncp    ./apijson     ./dist/apijson    --filter '**/*.*'`,
      `ncp    ./md          ./dist/md         --filter '**/*.*'`,
    ),
    'dev'   : npsUtils.series(
      `echo "开始dev"  `,
      'parcel ./index.html',
    ),
    'build' : 'parcel build ./index.html js/**/*',
  }
};
