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
        stage('staging deployment') {
            steps {
                echo 'TODO aws blue/green deployment'
            }
        }
        stage('e2e tests') {
            steps {
                echo 'TODO cypress tests'
            }
        }
        stage('ready to deploy') {
            options {
                timeout(time: 5, unit: 'MINUTES')
            }
            steps {
                input(message: "Deploy to production?")
            }
        }
        stage('prod deployment') {
            steps {
                echo 'TODO deployment to prod'
            }
        }
    }
}