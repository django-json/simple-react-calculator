pipeline {
    agent any

    environment {
        // Replace with your Docker Hub details
        DOCKER_USER     = 'djangodockerhub'
        IMAGE_NAME      = 'simple-react-calculator'
        REGISTRY_CREDS  = 'ce5d70f3-6000-449e-a8b3-b9fd1d403257' // The ID of your Jenkins Credentials
    }

    stages {
        stage("Prepare Version") {
            steps {
                script {
                    // Pull version from package.json file and add the 'v' prefix
                    def pkgVersion = sh(script: "grep 'version' package.json | cut -d '\"' -f4", returnStdout: true).trim()
                    env.SEMANTIC_VERSION = "v${pkgVersion}"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    # intentional error script to test slack notification
                    sh "exit 1"
                    // Builds the image using the local Dockerfile
                    echo "Building version ${env.BUILD_NUMBER}..."
                    sh "docker build -t ${DOCKER_USER}/${IMAGE_NAME}:latest ."
                    sh "docker tag ${DOCKER_USER}/${IMAGE_NAME}:latest ${DOCKER_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    sh "docker tag ${DOCKER_USER}/${IMAGE_NAME}:latest ${DOCKER_USER}/${IMAGE_NAME}:${env.SEMANTIC_VERSION}"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Securely logs in and pushes the images
                    docker.withRegistry('', "${REGISTRY_CREDS}") {
                        sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:latest"
                        sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                        sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:${env.SEMANTIC_VERSION}"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo "Cleaning images from Jenkins runner..."
                sh "docker rmi ${DOCKER_USER}/${IMAGE_NAME}:latest || true"
                sh "docker rmi ${DOCKER_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER} || true"
                sh "docker rmi ${DOCKER_USER}/${IMAGE_NAME}:${env.SEMANTIC_VERSION} || true"
            }
        }
        success {
            echo "Successfully built and pushed ${DOCKER_USER}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
            slackSend(color: "good", message: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            echo "Build failed. Check the logs for Docker errors."
            slackSend(
                color: "danger", 
                message: """*BUILD FAILED* :red_circle:
                    *Job:* ${env.JOB_NAME} #${env.BUILD_NUMBER}
                    *Author:* ${env.GIT_AUTHOR}
                    *Commit:* ${env.GIT_COMMIT_MSG}
                    *Logs:* <${env.BUILD_URL}console|View Console Output>"""
            )
        }
    }
}