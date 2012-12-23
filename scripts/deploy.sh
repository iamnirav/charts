# Production deploy script

function deploy() {
  # copy files over: (r)ecursively and (v)erbosely
  # exclude various shell scripts and readme
  rsync -rv --exclude 'scripts' --exclude 'README.md' ../* ~/Dropbox/Public/charts/
  echo "Deployed to ~/Dropbox/Public/charts/"
  echo "Public URL: http://dl.dropbox.com/u/76817/charts/index.html"
}

echo "Really deploy?"

select yn in "Yes" "No"
do
  case $yn in
    Yes ) deploy; break;;
    No ) echo "Deploy aborted."; break;;
  esac
done
