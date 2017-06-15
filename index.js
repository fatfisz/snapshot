import glob from 'glob';

import Snapshot from './snapshot';
import SnapshotFile from './snapshot-file';
import { getSnapshotName, getSnapshotPath } from './utils';


export function loadAll() {
  glob.sync('**/*.snapshot.js').forEach((filename) => {
    SnapshotFile.createAndSave(filename, true);
  });
}

export function saveAll(cleanup) {
  for (const file of SnapshotFile.getAll()) {
    file.save(cleanup);
  }
}

export function getValueForAssertion({ expected, name, testName, testPath, update }) {
  const snapshotName = getSnapshotName(testName, name);
  let snapshot = Snapshot.fromName(snapshotName);

  if (!snapshot) {
    const snapshotPath = getSnapshotPath(testPath);
    const snapshotFile = SnapshotFile.getOrCreate(snapshotPath);
    snapshot = Snapshot.create(snapshotFile, snapshotName, expected);
  } else if (snapshot.seen && !name) {
    throw new Error('Cannot have more than one unnamed snapshot per test case. Please provide names for snapshots instead.');
  } else if (!snapshot.seen && update) {
    snapshot.updateValue(expected);
  }

  snapshot.markAsSeen();
  return snapshot.value;
}
