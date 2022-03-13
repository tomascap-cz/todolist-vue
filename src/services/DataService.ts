import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import db from "../firebase";

import type { ListItem } from "../models/list-item.model";

export async function readData() {
  const db = ref(getDatabase());
  const snapshot = await get(child(db, "listitems"));
  if (snapshot.exists()) {
    return snapshot.val();
  }
}

export function writeData(item: ListItem) {
  set(ref(db, "listitems/" + item.id), {
    id: item.id,
    title: item.title,
    important: item.important,
    description: item.description,
  });
}

export function deleteData(id: string) {
  set(ref(db, "listitems/" + id), null);
}
