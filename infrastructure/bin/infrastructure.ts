#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { BastionEc2Stack } from '../lib/ec2-stack';
import { RdsStack } from '../lib/rds-stack';

const app = new cdk.App();
// VPC スタック作成
const vpcStack = new VpcStack(app, 'VPCStack');

// 踏み台 EC2 スタック作成
const bastionEc2Stack = new BastionEc2Stack(app, 'BastionEC2Stack', {
  vpc: vpcStack.vpc,
});

// RDS スタック作成
const rdsStack = new RdsStack(app, 'RDSStack', {
  vpc: vpcStack.vpc,
  bastionEc2SecurityGroup: bastionEc2Stack.securityGroup,
});
