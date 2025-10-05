import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

interface RdsStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;                  // 既存 VPC
  bastionEc2SecurityGroup: ec2.SecurityGroup; // 踏み台 EC2 の SG
}

export class RdsStack extends cdk.Stack {
  public readonly dbInstance: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: RdsStackProps) {
    super(scope, id, props);

    // RDS 用セキュリティグループ
    const rdsSecurityGroup = new ec2.SecurityGroup(this, 'RdsSecurityGroup', {
      vpc: props.vpc,
      description: 'Allow PostgreSQL access from bastion EC2',
      allowAllOutbound: true,
    });

    // 踏み台 EC2 からのみ 5432(PostgreSQL) を許可
    rdsSecurityGroup.addIngressRule(
      ec2.Peer.securityGroupId(props.bastionEc2SecurityGroup.securityGroupId),
      ec2.Port.tcp(5432),
      'Allow PostgreSQL from Bastion EC2'
    );

    // PostgreSQL RDS インスタンス作成
    this.dbInstance = new rds.DatabaseInstance(this, 'MyPostgresInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_16,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc: props.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      credentials: rds.Credentials.fromGeneratedSecret('fba_admin'),
      securityGroups: [rdsSecurityGroup],
      multiAz: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,   // 検証用       // 検証用
    });
  }
}
