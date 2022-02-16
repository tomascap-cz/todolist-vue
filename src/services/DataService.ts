import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import db from "../firebase";

import type { ListItem } from "../models/list-item.model";

export function readData() {
  const db = getDatabase();
  const items = ref(db, "listitems/");
  onValue(items, (snapshot) => {
    const data = snapshot.val();
    console.log("Async call to DB by DataService finished, loaded data:");
    console.log(data);
    return data;
  });
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
