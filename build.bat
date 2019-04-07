set /P ZombieKeysRev=<revision.txt
set /a oldRev=%ZombieKeysRev%
set /a ZombieKeysRev+=1
pwsh -Command "(gc -en UTF8NoBOM install.rdf) -replace 'pre%oldRev%'.trim(), 'pre%ZombieKeysRev%' | Out-File install.rdf"
"C:\Program Files\7-Zip\7z" a -xr!.svn ZombieKeys.zip install.rdf chrome.manifest chrome defaults license.txt
echo %ZombieKeysRev% > revision.txt
move *.xpi ..\..\_Test\2.21\
rename ZombieKeys.zip zombie_keys_multilanguage_keyboard-2.21.1pre%ZombieKeysRev%.xpi