@echo off
call buildit.cmd
call uploadit.cmd
plink -P 22 root@192.168.0.66 -pw "" "/media/internal/simple"

