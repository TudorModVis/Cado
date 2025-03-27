import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const deleteFromBucket = async (image: string) => {
    const awsAccessKey = process.env.AWS_PUBLIC_ACCESS_KEY;
    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!awsAccessKey || !awsSecretAccessKey) {
      return { 
        success: false, 
        error: 'AWS credentials not provided' 
      };
    }

    const s3 = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey,
      },
    });

    // Extract key from CloudFront URL
    const key = image.replace('https://d3le09nbvee0zx.cloudfront.net/', '');
    
    // Delete from S3
    await s3.send(new DeleteObjectCommand({
      Bucket: 'studio36',
      Key: key
    }));
}