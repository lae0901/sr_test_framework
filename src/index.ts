// ./sr_test_framework/src/index.ts

type PassFail = 'pass' | 'fail';

export interface iTestResultItem
{
  // passFail and text are deprecated.  use simpler passText and failText.
  passFail?: PassFail,
  text?: string,

  passText?: string,
  failText?: string,

  method?: string  // name of function being tested.
}

// ----------------------------- testResults_append -----------------------------
export function testResults_append(results_arr: iTestResultItem[],
  passText: string, failText: string, method: string = '')
{
  let item: iTestResultItem;
  if (failText)
  {
    item = { passFail: 'fail', text: failText };
  }
  else
  {
    item = { passFail: 'pass', text: passText };
  }
  item.passText = passText;
  item.failText = failText;
  results_arr.push(item);
}

// --------------------------- testResults_consoleLog ---------------------------
export function testResults_consoleLog(results_arr: iTestResultItem[])
{
  for (const item of results_arr)
  {
    const method = (item.method) ? item.method + ' ' : '';
    console.log(`${item.passFail} ${method}${item.text}`);
  }
}

// ------------------------------- testResults_new -------------------------------
export function testResults_new(): iTestResultItem[]
{
  const results_arr: iTestResultItem[] = [];
  return results_arr;
}
