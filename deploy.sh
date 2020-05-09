chmod 755 dist -R
rm -f dist.bz2
echo compress
tar --create --bzip --verbose --file dist.bz2 dist/
# > /dev/null 2>&1
echo scp
scp dist.bz2 iae.dyndns.org:/tmp
echo ssh 'rm -rf /prg/iae.admin/dist/* ; tar -jxvf /tmp/dist.bz2 -C /prg/iae.admin > /dev/null 2>&1 ; chmod 755 /prg/iae.admin/dist -R'
ssh iae.dyndns.org 'rm -rf /prg/iae.admin/dist/* ; tar -jxvf /tmp/dist.bz2 -C /prg/iae.admin > /dev/null 2>&1 ; chmod 755 /prg/iae.admin/dist -R'
rm -f dist.bz2
echo Listo
