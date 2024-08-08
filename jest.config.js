export default {
  displayName: 'lorem-ipsum-photo-gallery',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }]
  },
  // ...other configs
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      tsConfig: {
        strict: false,
        skipLibCheck: true
      }
    }
  }
};
