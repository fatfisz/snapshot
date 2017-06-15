function trimOne(strings) {
  return strings[0].slice(1, -1);
}

exports["Snapshots basic functionality should handle a named and an unnamed snapshots"] = trimOne`
test
`;

exports["Snapshots basic functionality should handle a named and an unnamed snapshots same"] = trimOne`
test2
`;

exports["Snapshots basic functionality should handle a string snapshot"] = trimOne`
test
`;

exports["Snapshots basic functionality should handle an object snapshot"] = {
  "object": [
    "array"
  ]
};

exports["Snapshots basic functionality should handle multiline strings"] = trimOne`
test
test2
test3
`;

exports["Snapshots basic functionality should handle multiple named snapshots first"] = trimOne`
test
`;

exports["Snapshots basic functionality should handle multiple named snapshots second"] = trimOne`
test2
`;

exports["Snapshots basic functionality should handle multiple named snapshots third"] = trimOne`
test3
`;

exports["Snapshots basic functionality should handle multiple snapshots with the same name but different values same"] = trimOne`
test
`;

exports["Snapshots basic functionality should handle multiple snapshots with the same name same"] = trimOne`
test
`;

exports["Snapshots basic functionality should handle special template literal characters"] = trimOne`
$\{value} $\{4 + 2} \\u00A9 \\u{2F804} \\xA9 \\251
`;

exports["Snapshots basic functionality should throw for multiple unnamed snapshots"] = trimOne`
test
`;

exports["Snapshots pre-existing snapshots should throw if there's a mismatch with a pre-existing named snapshot named"] = trimOne`
pre-existing second
`;

exports["Snapshots pre-existing snapshots should throw if there's a mismatch with a pre-existing snapshot"] = trimOne`
pre-existing first
`;
