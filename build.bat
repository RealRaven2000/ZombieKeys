set /P ZombieKeysRev=<revision.txt
set /a oldRev=%ZombieKeysRev%
set /a ZombieKeysRev+=1
pwsh -Command "(gc -en UTF8NoBOM manifest.json) -replace 'pre%oldRev%'.trim(), 'pre%ZombieKeysRev%' | Out-File manifest.json"
"C:\Program Files\7-Zip\7z" a -xr!.svn ZombieKeys.zip manifest.json chrome defaults scripts zk-background.html zk-background.js license.txt
echo %ZombieKeysRev% > revision.txt
move *.xpi ..\..\..\_Test\3.0\
rename ZombieKeys.zip zombie_keys_multilanguage_keyboard-3.0pre%ZombieKeysRev%.xpi