import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as path from 'path';

interface AppStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  dbInstance: rds.DatabaseInstance;
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    // Lambda 用 SG
    const lambdaSg = new ec2.SecurityGroup(this, 'LambdaSG', {
      vpc: props.vpc,
      description: 'Allow Lambda outbound to RDS Proxy',
      allowAllOutbound: true,
    });

    // RDS Proxy 用 SG
    const proxySg = new ec2.SecurityGroup(this, 'ProxySG', {
      vpc: props.vpc,
      description: 'RDS Proxy security group',
    });

    // RDS Proxy 作成
    const proxy = props.dbInstance.addProxy('DbProxy', {
      secrets: [props.dbInstance.secret!],
      vpc: props.vpc,
      securityGroups: [proxySg],
      iamAuth: false, // 検証用
    });

    // Lambda → Proxy 許可
    proxySg.addIngressRule(lambdaSg, ec2.Port.tcp(5432), 'Lambda to RDS Proxy');

    // Proxy → RDS 許可
    props.dbInstance.connections.allowFrom(proxySg, ec2.Port.tcp(5432));

    // Lambda Docker イメージ関数作成
    const webLambda = new lambda.DockerImageFunction(this, 'WebLambda', {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '')),
      vpc: props.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [lambdaSg],
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      environment: {
        DB_PROXY_ENDPOINT: proxy.endpoint,
        DB_NAME: 'postgres',
        DB_SECRET_ARN: props.dbInstance.secret!.secretArn,
      },
    });

    // Secretへのアクセス権限を付与
    props.dbInstance.secret!.grantRead(webLambda);

    // Lambda Function URL
    const funcUrl = webLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    // CloudFront Distribution
    const url = new URL(funcUrl.url);

    const cloudfrontDistribution = new cloudfront.Distribution(this, 'WebDistribution', {
      defaultBehavior: {
        origin: new origins.HttpOrigin(url.host, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
        }),
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
      },
    });
  }
}
