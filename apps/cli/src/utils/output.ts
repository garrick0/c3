/**
 * Formatted output utilities
 */

export function formatTable(data: Array<Record<string, any>>): void {
  if (data.length === 0) {
    console.log('No data to display');
    return;
  }

  // Stub: Simple table formatting
  const keys = Object.keys(data[0]);
  console.log(keys.join(' | '));
  console.log(keys.map(() => '---').join(' | '));

  data.forEach(row => {
    console.log(keys.map(k => row[k]).join(' | '));
  });
}

export function formatList(items: string[]): void {
  items.forEach(item => console.log(`  - ${item}`));
}

export function formatJson(data: any, pretty: boolean = true): void {
  console.log(JSON.stringify(data, null, pretty ? 2 : 0));
}
