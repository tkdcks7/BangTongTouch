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
                            git pull origin master
                            echo "git pull origin master 완료"
                            docker compose up -d --build
                        "
                    '''
                }
            }
        }
    }
}