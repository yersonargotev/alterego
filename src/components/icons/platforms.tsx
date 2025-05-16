import React from 'react';
import {
  AppleLight,
  AppleDark,
  Linux,
  Windows,
  Android,
  Docker,
  Kubernetes,
  Chrome,
  RaspberryPI,
  Java,
} from '@ridemountainpig/svgl-react';
import { Cloudy, Monitor, PcCase } from 'lucide-react';

export type Platform =
  | 'apple'
  | 'android'
  | 'windows'
  | 'linux'
  | 'docker'
  | 'kubernetes'
  | 'desktop'
  | 'self'
  | 'cloud'
  | 'macos'
  | 'ios'
  | 'chrome'
  | 'browser'
  | 'raspberry'
  | 'java';

export interface PlatformIconsProps {
  platform: Platform;
  theme: 'light' | 'dark';
}

const Icons = {
  apple: {
    light: AppleLight,
    dark: AppleDark,
  },
  android: {
    light: Android,
    dark: Android,
  },
  windows: {
    light: Windows,
    dark: Windows,
  },
  linux: {
    light: Linux,
    dark: Linux,
  },
  docker: {
    light: Docker,
    dark: Docker,
  },
  kubernetes: {
    light: Kubernetes,
    dark: Kubernetes,
  },
  desktop: {
    light: Monitor,
    dark: Monitor,
  },
  self: {
    light: PcCase,
    dark: PcCase,
  },
  cloud: {
    light: Cloudy,
    dark: Cloudy,
  },
  macos: {
    light: AppleLight,
    dark: AppleDark,
  },
  ios: {
    light: AppleLight,
    dark: AppleDark,
  },
  chrome: {
    light: Chrome,
    dark: Chrome,
  },
  browser: {
    light: Chrome,
    dark: Chrome,
  },
  raspberry: {
    light: RaspberryPI,
    dark: RaspberryPI,
  },
  java: {
    light: Java,
    dark: Java,
  },
};

export const PlatformIcon = ({ platform, theme }: PlatformIconsProps) => {
  const Icon = Icons[platform][theme];
  return <Icon />;
};
