# Important: DO NOT USE LATEST HERE!
FROM beevelop/android:v2021.06.2

RUN apt-get update && \
    echo "Installing environment" && \
    apt-get install -y curl gnupg2 lsb-release git bzip2 openssh-client && \
    apt-get update && apt-get install -y curl gnupg2 lsb-release && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
    apt-key fingerprint 1655A0AB68576280 && \
    export VERSION=node_16.x && \
    export DISTRO="$(lsb_release -s -c)" && \
    echo "deb https://deb.nodesource.com/$VERSION $DISTRO main" | tee /etc/apt/sources.list.d/nodesource.list && \
    echo "deb-src https://deb.nodesource.com/$VERSION $DISTRO main" | tee -a /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && apt-get install -y nodejs && \
    node -v && npm -v && \
    npm install -g npm && \
    npm install -g yarn && \
    yarn -v && \
    echo "Installing dependencies" && \
    npm install -g cordova@latest && \
    npm install -g @angular/cli@latest && \
    npm install -g @ionic/cli@latest && \
    echo "Configuring CLIs" && \
    ng config -g cli.packageManager yarn && \
    ionic config set -g yarn true && \
    echo "Installing Android dependencies" && \
    cd /tmp && \
    # Download Android Build tools to this sample project
    ionic start myNewProject blank --type=ionic-angular --no-deps --no-git && \
    cd myNewProject && \
    yarn &&\
    ionic build && \
    ionic capacitor add android && \
    ionic capacitor build android --no-open && \
    rm -rf /tmp/myNewProject && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    echo "Done"

# Note: Polling is necessary because the linked folder is not created until after the build
CMD ["/bin/bash", "-c", "cd /var/www/ionic_docker && ng serve --poll 200 --host=0.0.0.0 --port=8100"]
