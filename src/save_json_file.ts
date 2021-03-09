export function saveJsonFile(filename: string, data: string) {
  const blob = new Blob([data], { type: 'text/json' });
  const elem = document.createElement('a');
  elem.href = URL.createObjectURL(blob);
  elem.download = filename;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}
