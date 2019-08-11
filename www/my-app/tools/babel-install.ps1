#
# Installs Babel in the current directory
#
# REF:  https://babeljs.io/docs/en/babel-cli/
#
# NOTE: require Node.js installed
# 
# Create a dummy package file to collect babel dependencies in the root folder
#
#
 Set-Location ..

$pFile='package.json'
if ( !(Test-Path -PathType Leaf -Path $pFile) ) {
  '{}' | Out-File -FilePath $pFile -Encoding ascii
}


npm install --save-dev @babel/core @babel/cli
npm install --save-dev @babel/preset-env babel-preset-minify
npm install --save core-js@3
