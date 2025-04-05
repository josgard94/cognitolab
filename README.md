# Cognitolab

This repository contains a CloudFormation template that allows you to deploy the following AWS services:

- **Amazon S3 Bucket**
- **Amazon API Gateway**
- **Amazon Cognito User Pool**

It also includes an example demonstrating how to secure an API using token-based authorization powered by Amazon Cognito.

## 🚀 Features

- Automated infrastructure deployment with CloudFormation
- Seamless integration between Cognito and API Gateway
- Token-based authentication using JWTs
- Serverless Framework configuration

## 🧰 Technologies Used

- AWS CloudFormation
- AWS API Gateway
- AWS Cognito
- AWS Lambda
- Serverless Framework
- Node.js / Python

## 📦 Project Structure

```
├── common/ # Shared resources (IAM roles, policies, etc.)
├── resources/ # CloudFormation resource definitions
├── scripts/ # Helper scripts
├── services/ # Lambda function code
├── serverless.yml # Serverless Framework configuration
├── package.json # Project dependencies
└── README.md # This file
```

## 🔧 Prerequisites

- An AWS account with necessary permissions
- Node.js >= 14.x
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started) installed globally

```bash
npm install -g serverless
```
1. 🚀 Deployment
   ```
   Install dependencies:
   ```
2. Deploy the stack using Serverless:
   ```
   sls deploy
   ```
3. After deployment, you will receive the API Gateway endpoint URL protected by Cognito.

## 🔐 Authentication
This project uses Amazon Cognito for authentication and API protection. To access protected endpoints:

1. Register a new user in the Cognito User Pool.
2. Authenticate the user and retrieve a JWT token.
3. Use the token in the Authorization header when making requests to the API.

## ⭐ Like this project?
Star it if you found it useful ⭐ and feel free to contribute!
