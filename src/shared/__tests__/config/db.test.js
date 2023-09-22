const admin = require('firebase-admin');

jest.mock('firebase-admin', () => ({
   initializeApp: jest.fn(),
   credential: {
      cert: jest.fn(),
   },
   firestore: jest.fn(() => ({})),
}));

// Mock the service account credentials
const mockServiceAccount = { type: 'service_account' };
jest.mock('../../config/credentials/firestore-test.json', () => mockServiceAccount);

describe('Firebase Database Initialization', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('should initialize firebase-admin with the correct service account', () => {
      require('../../config/db');
      expect(admin.initializeApp).toHaveBeenCalledWith({
         credential: admin.credential.cert(mockServiceAccount),
      });
   });

   it('should export the Firestore instance', () => {
      const db = require('../../config/db');
      expect(db).toBeDefined();
   });
});
