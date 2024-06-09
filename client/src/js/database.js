import { openDB } from 'idb';

const initdb = async () =>
  openDB('texty', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('texty')) {
        console.log('texty database already exists');
        return;
      }
      db.createObjectStore('texty', { keyPath: 'id', autoIncrement: true });
      console.log('texty database created');
    },
  });

export const putDb = async (id, content) => {
  console.log('PUT to the database');
const textyDb = await openDB('texty', 1);
const tx = textyDb.transaction('texty', 'readwrite');
const store = tx.objectStore('texty');
const request = store.put({ id: id, text: content });
const result = await request;
console.log('Data saved to the database', result);;}

export const getDb = async () => {console.log('GET all from the database');
const textyDb = await openDB('texty', 1);
const tx = textyDb.transaction('texty', 'readonly');
const store = tx.objectStore('texty');
const request = store.getAll();
const result = await request;
console.log('result.value', result);
return result;
};

initdb();
