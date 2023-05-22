import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const getDb = await openDB("jate", 1);
    const text = getDb.transaction("jate", "readnwrite");
    const store = text.objectStore("jate");
    const req = store.put({ id: 1, value: content });
    const res = await req;
  } catch (err) {
    console.error("putDb not implemented");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const getDb = await openDB("jate", 1);
    const text = getDb.transaction("jate", "read");
    const store = text.objectStore("jate");
    const req = store.getAll();
    const res = await req;
    return res?.value;
  } catch (err) {
    console.error("getDb not implemented");
  }
};

initdb();