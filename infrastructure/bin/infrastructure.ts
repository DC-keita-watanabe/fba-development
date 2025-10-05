#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { BastionEc2Stack } from '../lib/ec2-stack';
import { RdsStack } from '../lib/rds-stack';
import { AppStack } from '../lib/app-stack';

const app = new cdk.App();
// VPC スタック作成
const vpcStack = new VpcStack(app, 'FBA-VPC-Stack');

// 踏み台 EC2 スタック作成
const bastionEc2Stack = new BastionEc2Stack(app, 'FBA-EC2-Stack', {
  vpc: vpcStack.vpc,
});

// RDS スタック作成
const rdsStack = new RdsStack(app, 'FBA-RDS-Stack', {
  vpc: vpcStack.vpc,
  bastionEc2SecurityGroup: bastionEc2Stack.securityGroup,
});

// Lambdaアプリケーションスタック作成
const appStack = new AppStack(app, 'FBA-App-Stack', {
  vpc: vpcStack.vpc,
  dbInstance: rdsStack.dbInstance,
});
