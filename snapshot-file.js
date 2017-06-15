import fs from 'fs';
import { resolve } from 'path';

import { stripIndent } from 'common-tags';

import Snapshot from './snapshot';
import { renderValue } from './utils';


const prelude = stripIndent`
  function trimOne(strings) {
    return strings[0].slice(1, -1);
  }
`;

const fromPath = new Map();

export default class SnapshotFile {
  static getOrCreate(path) {
    const absolutePath = resolve(path);
    return fromPath.has(absolutePath) ?
      fromPath.get(absolutePath) :
      SnapshotFile.createAndSave(absolutePath);
  }

  static createAndSave(path, ...args) {
    const absolutePath = resolve(path);
    const snapshotFile = new SnapshotFile(absolutePath, ...args);
    fromPath.set(absolutePath, snapshotFile);
    return snapshotFile;
  }

  static getAll() {
    return fromPath.values();
  }

  path;
  snapshots = new Set();

  constructor(absolutePath, existsOnFs = false) {
    this.path = absolutePath;
    if (existsOnFs) {
      this.loadFromFs();
    }
  }

  loadFromFs() {
    // eslint-disable-next-line global-require
    const savedSnapshots = require(this.path);
    for (const [snapshotName, value] of Object.entries(savedSnapshots)) {
      Snapshot.create(this, snapshotName, value);
    }
  }

  addSnapshot(snapshot) {
    this.snapshots.add(snapshot);
  }

  render(cleanup) {
    const snapshsotsToSave = Array.from(this.snapshots)
      .filter((snapshot) => !cleanup || snapshot.seen)
      .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

    if (snapshsotsToSave.length === 0) {
      return null;
    }

    return ''.concat(
      prelude,
      '\n\n',
      snapshsotsToSave
        .map((snapshot) => {
          const { name, value } = snapshot;
          const exportName = JSON.stringify(name);
          const exportValue = renderValue(value);
          return `exports[${exportName}] = ${exportValue};`
        })
        .join('\n\n'),
      '\n',
    );
  }

  save(cleanup = false) {
    const contents = this.render(cleanup);

    if (contents === null && cleanup) {
      fs.unlinkSync(this.path);
      return;
    }

    fs.writeFileSync(this.path, contents || '');
  }
}
