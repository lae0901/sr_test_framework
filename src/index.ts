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
  let item: iTestResultItem = {} ;
  item.passText = passText;
  item.failText = failText;
  item.method = method ;
  testResultItem_ensurePassFail(item) ;
  results_arr.push(item);
}

// --------------------------- testResults_consoleLog ---------------------------
export function testResults_consoleLog(results_arr: iTestResultItem[])
{
  let passCount = 0 ;
  let failCount = 0 ;
  for (const item of results_arr)
  {
    testResultItem_ensurePassFail(item) ;
    const method = (item.method) ? item.method + ' ' : '';
    console.log(`${item.passFail} ${method}${item.text}`);

    // update count of total passed and total failed.
    if ( item.passFail == 'fail')
      failCount += 1 ;
    else if ( item.passFail == 'pass')
      passCount += 1 ;
  }

  // write out pass/fail summary
  if ( failCount > 0 )
    console.log(`test summary. ${failCount} failed. ${passCount} passed.`);
  else if ( passCount > 0)
    console.log(`test summary. All passed. ${passCount} tests passed.`);
}

// ------------------------------- testResults_new -------------------------------
export function testResults_new(): iTestResultItem[]
{
  const results_arr: iTestResultItem[] = [];
  return results_arr;
}

// -------------------------- testResultItem_ensurePassFail -----------------------
function testResultItem_ensurePassFail( item: iTestResultItem )
{
  if ( !item.passFail)
  {
    if (item.failText)
    {
      item.passFail = 'fail' ;
      item.text = item.failText ;
    }
    else if ( item.passText)
    {
      item.passFail = 'pass';
      item.text = item.passText;
    }
  }
}
