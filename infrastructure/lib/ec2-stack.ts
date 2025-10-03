import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface Ec2StackProps extends cdk.StackProps {
  vpc: ec2.Vpc; // VPC を props で受け取る
}

export class Ec2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    // セキュリティグループ作成
    const securityGroup = new ec2.SecurityGroup(this, 'MyEC2SG', {
      vpc: props.vpc,
      description: 'Allow SSH and HTTP access',
      allowAllOutbound: true,
    });

    // SSH (22) と HTTP (80) を許可
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH access from anywhere');
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP access from anywhere');

    // EC2 インスタンス作成
    const ec2Instance = new ec2.Instance(this, 'MyEC2Instance', {
      vpc: props.vpc,
      instanceType: new ec2.InstanceType('t3.nano'),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      securityGroup: securityGroup,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC }, // 公開サブネットに配置
      keyName: 'my-existing-keypair',
    });
  }
}
