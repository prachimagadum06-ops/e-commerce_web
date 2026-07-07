pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t ecommerce-web .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker stop ecommerce-web || exit 0'
                bat 'docker rm ecommerce-web || exit 0'
                bat 'docker run -d -p 8081:80 --name ecommerce-web ecommerce-web'
            }
        }
    }
}