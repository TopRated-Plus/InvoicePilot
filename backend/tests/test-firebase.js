const { db } = require('../services/firebase');

async function test() {
  try {
    // Write test document
    await db.collection('test').doc('connection').set({
      status: 'connected',
      testedAt: new Date()
    });
    console.log('Firebase write: OK');

    // Read it back
    const doc = await db.collection('test')
      .doc('connection').get();
    console.log('Firebase read: OK');
    console.log('Data:', doc.data());

    // Delete test document
    await db.collection('test')
      .doc('connection').delete();
    console.log('Firebase delete: OK');

  } catch (error) {
    console.error('Firebase error:', error.message);
  }
}

test();