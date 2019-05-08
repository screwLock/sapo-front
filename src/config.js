const dev = {
  /*    
        s3: {
        REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
        BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
      },
  */
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ty6vugcymi.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_4FwE45JXJ",
    APP_CLIENT_ID: "4tqg813uev9m2ukopsi4fs9hhq",
    IDENTITY_POOL_ID: "us-east-1:b4073e9a-e0a6-4cb4-a953-aa97e309aa9c"
  }
};

const prod = {
  /*    
        s3: {
        REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
        BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
      },
  */
 apiGateway: {
  REGION: "us-east-1",
  URL: "https://1vz50gsavh.execute-api.us-east-1.amazonaws.com/prod"
},
cognito: {
  REGION: "us-east-1",
  USER_POOL_ID: "us-east-1_4FwE45JXJ",
  APP_CLIENT_ID: "4tqg813uev9m2ukopsi4fs9hhq",
  IDENTITY_POOL_ID: "us-east-1:b4073e9a-e0a6-4cb4-a953-aa97e309aa9c"
}
};

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default {
  // Add common config values here
  // MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};