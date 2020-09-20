// ./sr_test_framework/src/index.ts

type PassFail = 'pass' | 'fail';

// -------------------------------- iTestResultItem --------------------------------
export interface iTestResultItem
{
  // passFail and text are deprecated.  use simpler passText and failText.
  passFail?: PassFail,
  text?: string,

  passText?: string,
  failText?: string,

  // values that follow, if specified, are used to construct passText and failText.
  method?: string ; // name of function being tested.
  aspect?: string ; // aspect of the method being tested.

  desc?: string ;   // description of the test.
  expected?: any ;  // expected result of test
  testResult?: any ;  // actual result of test
  didFail?: boolean;     // test failed. true or false.

  category?: string;  // category of the test. tests are grouped by category and summarized by category.

  startTime?: Date;   // when test was run. 
  endTime?: Date;     // time test ended. duration = endTime - startTime
}

// -------------------------------- iTestResultComponents --------------------------------
// values that are used to construct passText and failText.
export interface iTestResultComponents
{
  method?: string; // name of function being tested.
  aspect?: string; // aspect of the method being tested.

  desc?: string;   // description of the test.
  expected?: any;  // expected result of test
  testResult?: any;  // actual result of test
  didFail?: boolean;     // test failed. true or false.

  category?: string;  // category of the test. tests are grouped by category and summarized by category.

  startTime?: Date;   // when test was run. 
  endTime?: Date;     // time test ended. duration = endTime - startTime
}

// ----------------------------- testResults_append -----------------------------
export function testResults_append(results_arr: iTestResultItem[],
  components: iTestResultComponents | string, failText?: string, 
  method?: string | {method:string, aspect:string})
{
  let item: iTestResultItem = {} ;

  if ( typeof components == 'string')
  {
    item.passText = components;
    item.failText = failText || '' ;
    
    // name of method being tested. aspect of the method.
    item.aspect = '' ;
    if ( !method )
      item.method = '' ;
    else if ( typeof method == 'string')
      item.method = method ;
    else
    {
      item.method = method.method ;
      item.aspect = method.aspect ;
    }

    testResultItem_ensurePassFail(item) ;
    results_arr.push(item);
  }
  else
  {
    testResults_appendFromComponents( results_arr, components ) ;
  }
}

// ------------------------ testResults_appendFromComponents ---------------------
function testResults_appendFromComponents(results_arr: iTestResultItem[],
  components: iTestResultComponents )
{
  let item: iTestResultItem = {};
  item.method = components.method || '' ;
  item.aspect = components.aspect || '' ;
  item.desc = components.desc || '' ;
  item.text = item.desc ;
  item.expected = components.expected ;
  item.testResult = components.testResult;
  item.didFail = components.didFail || false ;
  item.category = components.category || '' ;
  item.startTime = components.startTime || new Date( ) ;
  item.endTime = components.endTime || new Date( ) ;

  // set didFail flag based on test result.
  if ( item.expected != undefined && item.testResult != undefined )
  {
    item.didFail = !(item.expected == item.testResult ) ;
  }

  if ( item.didFail )
    item.passFail = 'fail' ;
  else
    item.passFail = 'pass' ;

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
    let method = (item.method) ? item.method + ' ' : '';
    const categoryText = item.category ? ` ${item.category}` : '' ;
    const aspectText = item.aspect ? ` ${item.aspect}. ` : '' ;
    if ( method && !aspectText )
      method = method.trimEnd( ) + '. ' ;

    let expectedText = '' ;
    if ( item.didFail && item.expected )
    {
      expectedText = ` Result:${item.testResult} Expected:${item.expected}`;
    }

    console.log(`${item.passFail} ${categoryText}${method}${aspectText}${item.text}.${expectedText}`);

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
