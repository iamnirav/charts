# Staging script WITH cache manifest

# copy files over: (r)ecursively and (v)erbosely
# exclude various shell scripts and readme
rsync -rv --exclude 'scripts' --exclude 'README.md' ./* ~/Dropbox/Public/chartsdev_withmanifest/
echo "Staged to ~/Dropbox/Public/chartsdev_withmanifest/"
echo "Public URL: http://dl.dropbox.com/u/76817/chartsdev_withmanifest/index.html"
