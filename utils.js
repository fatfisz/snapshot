import path from 'path';


export function getSnapshotPath(testPath) {
  const absolutePath = path.resolve(testPath);
  const lastSeparator = absolutePath.lastIndexOf(path.sep);
  const firstExtension = absolutePath.indexOf('.', lastSeparator);
  return `${absolutePath.slice(0, firstExtension)}.snapshot.js`;
}

export function getSnapshotName(testName, name) {
  return `${testName} ${name}`.trim();
}

export function renderValue(rawValue) {
  if (typeof rawValue !== 'string') {
    return JSON.stringify(rawValue, null, 2);
  }

  const escapedString = rawValue
    .replace(/\\/g, '\\\\')
    .replace(/\${/g, '$\\{');

  return `trimOne\`\n${escapedString}\n\``;
}
