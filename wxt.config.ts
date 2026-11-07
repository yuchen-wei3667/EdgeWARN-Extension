import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'EdgeWARN',
    description:
      'Real-time severe weather notifications with customizable alert tones.',
    permissions: ['alarms', 'notifications', 'storage'],
    host_permissions: ['https://api.weather.gov/*'],
    icons: {
      '16': '/icon/16.png',
      '32': '/icon/32.png',
      '48': '/icon/48.png',
      '96': '/icon/96.png',
      '128': '/icon/128.png',
    },
    action: {
      default_title: 'EdgeWARN',
      default_icon: {
        '16': '/icon/16.png',
        '32': '/icon/32.png',
        '48': '/icon/48.png',
      },
    },
  },
});
