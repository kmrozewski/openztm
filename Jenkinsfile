pipeline {
    agent any

    stages {
        stage('install') {
            steps {
                sh 'npm install'
            }
        }
        stage('test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('test deployment') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: "aws-keys",
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh 'aws s3 sync ./build s3://test.ztmgdansk/ --delete'
                }
            }
        }
        stage('ready to deploy') {
            options {
                timeout(time: 15, unit: 'MINUTES')
            }
            steps {
                input(message: 'Deploy to production?')
            }
        }
        stage('prod deployment') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: "aws-keys",
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh 'aws s3 sync ./build s3://ztmgdansk/ --delete'
                }
            }
        }
    }
}