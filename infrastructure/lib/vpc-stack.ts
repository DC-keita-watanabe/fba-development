import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC, サブネットの作成
    this.vpc = new ec2.Vpc(this, 'MyVPC', {
      ipAddresses: ec2.IpAddresses.cidr('192.168.0.0/17'),
      vpcName: 'fba-dev-vpc',
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'fba-dev-public1',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        { name: 'fba-dev-private1',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24
        },
        { name: 'fba-dev-private2',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24
        },
      ],
    });
  }
}