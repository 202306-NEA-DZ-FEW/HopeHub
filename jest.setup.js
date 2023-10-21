import "@testing-library/jest-dom/extend-expect";
// the next test is common between diferent components
// it mocks firebase diferent functions and useRouter, and useTranslation
// sendPasswordResetEmail is mocked to always return a resolved promise.
// useRoutere is mocked to exist and return an object
// useTranslation is mocked to exist and return an object
jest.mock('@/util/firebase', () => {
  return {
    auth: jest.fn(() => ({
      sendPasswordResetEmail: jest.fn(() => Promise.resolve('Password reset email sent.')),
    })),
    initializeApp: jest.fn(),
    getAuth: jest.fn(),
  };
});

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      route: '/current-route',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    }),
  }));

jest.mock('next-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));