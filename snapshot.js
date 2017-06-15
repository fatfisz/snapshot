import { stripIndent } from 'common-tags';


const fromName = new Map();

export default class Snapshot {
  static create(file, name, value) {
    if (fromName.has(name)) {
      console.warn(stripIndent`
        Snapshot found multiple times: "${name}"
          • ${fromName.get(name).file.path}
          • ${file.path}
      `);
    }
    const snapshot = new Snapshot(file, name, value);
    fromName.set(name, snapshot);
    file.addSnapshot(snapshot);
    return snapshot;
  }

  static fromName(name) {
    return fromName.get(name);
  }

  file;
  name;
  value;
  seen = false;

  constructor(file, name, value) {
    this.file = file;
    this.name = name;
    this.value = value;
  }

  updateValue(value) {
    this.value = value;
  }

  markAsSeen() {
    this.seen = true;
  }
}
