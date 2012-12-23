# Staging script

# copy files over: (r)ecursively and (v)erbosely
# exclude various shell scripts, readme, and cache manifest
rsync -rv --exclude 'scripts' --exclude 'README.md' --exclude 'manifest.appcache' ../* ~/Dropbox/Public/chartsdev/
echo "Staged to ~/Dropbox/Public/chartsdev/"
echo "Public URL: http://dl.dropbox.com/u/76817/chartsdev/index.html"
