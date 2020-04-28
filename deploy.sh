chmod 755 dist -R
rm -f dist.bz2
echo compress
tar --create --bzip --verbose --file dist.bz2 dist/
# > /dev/null 2>&1
echo scp
scp dist.bz2 iae.dyndns.org:/tmp
echo ssh 'rm -rf /prg/iae.v2/dist/* ; tar -jxvf /tmp/dist.bz2 -C /prg/iae.v2 > /dev/null 2>&1 ; chmod 755 /prg/iae.v2/dist -R'
ssh iae.dyndns.org 'rm -rf /prg/iae.v2/dist/* ; tar -jxvf /tmp/dist.bz2 -C /prg/iae.v2 > /dev/null 2>&1 ; chmod 755 /prg/iae.v2/dist -R'
rm -f dist.bz2
echo Listo
