"C:\Program Files\7-Zip\7z" a -xr!.svn ZombieKeys.zip install.rdf chrome.manifest chrome defaults license.txt
set /P ZombieKeysRev=<revision.txt
set /a ZombieKeysRev+=1
echo %ZombieKeysRev% > revision.txt
move *.xpi ..\..\_Test\2.19\
rename ZombieKeys.zip zombie_keys_multilanguage_keyboard-2.19pre%ZombieKeysRev%.xpi