// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  collection,
  enableIndexedDbPersistence,
  getDocs,
  getFirestore,
  query,
  where,
  // getDocFromCache,
  // doc,
} from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';
import { dispatchMyEvent } from './utils';
// import ItemsData from './inventory/items.json';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAg0cVb-NI8UNGGmXxIe9vxk1fVTcMA2VQ',
  authDomain: 'dnd-project-b2aa4.firebaseapp.com',
  databaseURL: 'https://dnd-project-b2aa4-default-rtdb.firebaseio.com',
  projectId: 'dnd-project-b2aa4',
  storageBucket: 'dnd-project-b2aa4.appspot.com',
  messagingSenderId: '1031136765027',
  appId: '1:1031136765027:web:8b106f77f9f22ba7cc8456',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase
const db = getFirestore();

enableIndexedDbPersistence(db)
  .catch((err) => {
    console.log(err);
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
// Subsequent queries will use persistence, if it was enabled successfully

export const items = {};

const foo = async () => {
  // 'Elemental Gem', // TODO
  // 'Armor of Gleaming', // TODO
  // 'Potion of Giant Strength', // TODO Potions
  // 'Potion of Healing', // TODO Potions
  // 'Potion of Greater Healing', // TODO Potions

  // 'Essence of Rage', // TODO: Griffon's Saddlebag
  // 'Potion of Spell Recovery', // TODO: Griffon's Saddlebag
  // 'Eldritch Scarf', // TODO: Griffon's Saddlebag
  // 'Voltedge', // TODO: Griffon's Saddlebag

  // '4TJWHSjSMYGSNBRR4AE6' // Periapt of Wound Closure
  // '7rO6SxxGHl8BPmhfnpvy' // Bag of Holding
  // 'BP7mM9tSWRQt4afwF1I3' // Wand of Magic Missiles
  // 'KOTwxuKx1bNQft1EhLOl' // Oil of Slipperiness
  // 'MB0HmBqjLQ7alIBAcBDb' // Chime of Opening
  // 'MUoeUeUKwSrWsav7OUhh' // Portable Hole
  // 'VOH7jBRn6Hh5doa7Knio' // Chain Mail
  // 'XLVwUf55XJBS42eFraLT' // Gloves of Thievery
  // 'mM29YeiC8ACC4bqdmiA3' // Horn of Silent Alarm
  // 'nrDbqhD7mERZrFA4CQKL' // Alchemy Jug
  // 'vHaxJBDFChmWXFe5EaMT' // Dread Helm
  // 'DPR2AI0erDwlis6L1CJ6' // Helm of Comprehending Languages
  // 'XlO0F7dxWAD87Ae9flL6' // Potion of Poison
  // 'arq6UU5B0sMhIj7RDkIu' // Drow +1 Weapon
  // 'voOmb4PU8003cQKE23i3' // Ball Bearings (bag of 1,000)
  // 'xC2hysSw1DR5SEkrcT1B' // Eversmoking Bottle

  const itemsRef = collection(db, 'items');

  const q = query(itemsRef, where('image', '!=', null));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // @ts-ignore
    items[doc.id] = doc.data();
  });

  // async function wait(ms) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms);
  //   });
  // }

  // await wait(1000);

  // ItemsData.forEach((obj) => {
  //   if (obj.image != null) {
  //     items[uuidv4()] = obj;
  //   }
  // });

  dispatchMyEvent(window, 'ITEMS');
};

foo();

/* Bag of Holding */
// Alchemy Jug
// Potion of Frost Giant's Strength
// Dread Helm
// Chain Mail
// Essence of Rage
// Potion of Spell Recovery
// Potion of Healing
// Drow Short Sword
// Ball Bearings

/* Brae */
// Oil of Slipperiness
// Potion of Greater Healing
// Potion of Poision
// Henry Cavill's Bestiary -- custom
// Periapt of Wound Closure
// Chime of Opening
// Eldritch Scarf
// Gloves of Thievery
// Horn of Silent Alarm
// Eversmoke Bottle

/* Cyan */
// Potion of Greater Healing
// Elemental Gem, Blue Sapphire
// Wand of Magic Missiles
// Plate Armor of Gleaming
// Voltedge
// Helm of Comprehend Languages
// Portable Hole
