import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface BastionEc2StackProps extends cdk.StackProps {
  vpc: ec2.Vpc; // VPC を props で受け取る
}

export class BastionEc2Stack extends cdk.Stack {
  public readonly securityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: BastionEc2StackProps) {
    super(scope, id, props);

    // セキュリティグループ作成
    this.securityGroup = new ec2.SecurityGroup(this, 'MyEC2SG', {
      vpc: props.vpc,
      description: 'Allow SSH access',
      allowAllOutbound: true,
    });

    // SSH (22) を許可
    this.securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH access from anywhere');

    // 既存キーペアの取得
    const importedKeyPair = ec2.KeyPair.fromKeyPairName(this, 'ImportedKeyPair', 'my-keypair');

    // EC2 インスタンス作成
    const ec2Instance = new ec2.Instance(this, 'MyEC2Instance', {
      vpc: props.vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.NANO),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      securityGroup: this.securityGroup,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC }, // 公開サブネットに配置
      keyPair: importedKeyPair,
    });
  }
}
