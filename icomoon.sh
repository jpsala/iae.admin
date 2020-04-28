origen="/home/jpsala/Downloads/icomoon.zip"
destino="/prg/iae.v2/src/assets/icomoon"
unzip -o $origen style.css -d $destino
unzip -o $origen fonts/icomoon.woff -d $destino
unzip -o $origen selection.json -d $destino
sed -i '5s/,/;/' $destino/style.css
sed -i '4d' $destino/style.css
sed -i '5d' $destino/style.css

