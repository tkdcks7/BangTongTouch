pipeline {
    agent any
    stages {
        stage("Build") {
            steps {

            }
        }
        stage("Deploy") {
            steps {
                sshagent(credentials: ['ssafy']) {
                    sh '''
                        ssh ubuntu@i11d206.p.ssafy.io "
                            cd S11P12D206
                            sudo git pull origin master
                            docker compose up -d --build
                        "
                    '''
                }
            }
        }
    }
}