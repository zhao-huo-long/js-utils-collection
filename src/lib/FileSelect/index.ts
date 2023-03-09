export function fileSelect(accept: HTMLInputElement["accept"]) {
  let input = document.querySelector<HTMLInputElement>(
    "#utils-collection-file-select"
  );
  if (!input) {
    input = document.createElement("input");
    input.accept = accept;
  }
}
