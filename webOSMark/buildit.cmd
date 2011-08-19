@echo off
@rem Set the device you want to build for to 1
@rem Use Pixi to allow running on either device
set PRE=0
set PIXI=1
set DEBUG=0

@rem List your source files here
set SRC=coremark/core_list_join.c coremark/core_main.c coremark/core_matrix.c coremark/core_state.c coremark/core_util.c coremark/core_portme.c md5/md5.cpp src/WebOSMark.cpp

@rem List the libraries needed
set LIBS=-lSDL -lpdl -lSDL_image -lSDL_ttf -lcurl

@rem Name your output executable
set OUTFILE=webosmark

if %PRE% equ 0 if %PIXI% equ 0 goto :END

if %DEBUG% equ 1 (
   set DEVICEOPTS=-g
) else (
   set DEVICEOPTS=
)

if %PRE% equ 1 (
   set DEVICEOPTS=%DEVICEOPTS% -mcpu=cortex-a8 -mfpu=neon -mfloat-abi=softfp
)

if %PIXI% equ 1 (
   set DEVICEOPTS=%DEVICEOPTS% -mcpu=arm1136jf-s -mfpu=vfp -mfloat-abi=softfp
)

echo %DEVICEOPTS%

arm-none-linux-gnueabi-gcc %DEVICEOPTS% -o %OUTFILE% %SRC% "-I.\coremark" "-I.\md5" "-I.\curl" "-I%PALMPDK%\include" "-I%PALMPDK%\include\SDL" "-L%PALMPDK%\device\lib" "-L.\curl" -s -Wl,--allow-shlib-undefined %LIBS% -lrt

goto :EOF

:END
echo Please select the target device by editing the PRE/PIXI variable in this file.
exit /b 1

