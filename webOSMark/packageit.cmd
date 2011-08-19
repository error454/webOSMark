set STAGING_DIR=STAGING\com.wordpress.mobilecoder.webosmark

rmdir /s /y %STAGING_DIR%
del *.ipk
mkdir %STAGING_DIR%
call buildit.cmd
copy appinfo.json %STAGING_DIR%
copy webosmark %STAGING_DIR%
copy images\* %STAGING_DIR%
copy *.ttf %STAGING_DIR%
echo filemode.755=webosmark > %STAGING_DIR%\package.properties
palm-package %STAGING_DIR%
