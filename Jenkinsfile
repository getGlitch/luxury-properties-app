pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kunaldevopsjourney/react-frontend"
        K8S_GIT_REPO = "git@github.com:getGlitch/your-k8s-repo-name.git"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/getGlitch/luxury-properties-app.git'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm install && npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_HUB_PASSWORD')]) {
                    sh '''
                    echo "$DOCKER_HUB_PASSWORD" | docker login -u "kunaldevopsjourney" --password-stdin
                    docker push ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                sh '''
                git clone ${K8S_GIT_REPO} k8s-manifests
                cd k8s-manifests
                sed -i "s|image:.*|image: ${DOCKER_IMAGE}:latest|" deployment.yaml
                git add .
                git commit -m "Updated image version"
                git push origin main
                '''
            }
        }
    }
}
