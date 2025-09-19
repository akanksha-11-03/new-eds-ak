import tabeldata from '../table/table.js';

export default function decorate(block) {
  const blockcontent = block.textContent.trim();
  console.log(blockcontent);
  tabeldata(blockcontent);
}
