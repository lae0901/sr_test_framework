// ./sr_test_framework/src/index.ts

import { any_toString, iTestResultItem } from 'sr_core_ts';
import { openTextLinesInBrowser } from '@steverichter/sr_node_core';

// import { any_toString, arr_compareEqual, obj_compareEqual, obj_propertyMatch } from 'sr_core_ts';
// import { openTextLinesInBrowser } from '@steverichter/sr_node_core';

// type PassFail = 'pass' | 'fail';

// // -------------------------------- iTestResultItem --------------------------------
// export interface iTestResultItem
// {
//   // passFail and text are deprecated.  use simpler passText and failText.
//   passFail?: PassFail,
//   text?: string,

//   passText?: string,
//   failText?: string,

//   // values that follow, if specified, are used to construct passText and failText.
//   method?: string ; // name of function being tested.
//   aspect?: string ; // aspect of the method being tested.

//   desc?: string ;   // description of the test.
//   expected?: any ;  // expected result of test
//   actual?: any ;  // actual result of test
//   didFail?: boolean;     // test failed. true or false.

//   category?: string;  // category of the test. tests are grouped by category and summarized by category.

//   startTime?: Date;   // when test was run. 
//   endTime?: Date;     // time test ended. duration = endTime - startTime

//   errmsg?: string;    // errmsg of error that cause test to fail.
// }

// // -------------------------------- iTestResultComponents --------------------------------
// // values that are used to construct passText and failText.
// // new name: iTestInput
// // remove startTime, endTime, errmsg
// export interface iTestResultComponents
// {
//   method?: string; // name of function being tested.
//   aspect?: string; // aspect of the method being tested.

//   desc?: string;   // description of the test.
//   expected?: any;  // expected result of test
//   testResult?: any;  // actual result of test
//   actual?: any;  // actual result of test
//   didFail?: boolean;     // test failed. true or false.

//   category?: string;  // category of the test. tests are grouped by category and summarized by category.

//   startTime?: Date;   // when test was run. 
//   endTime?: Date;     // time test ended. duration = endTime - startTime

//   errmsg?: string;    // errmsg of error that cause test to fail.
// }

// // ----------------------------- testResults_append -----------------------------
// export function testResults_append(results_arr: iTestResultItem[],
//   components: iTestResultComponents | string, failText?: string, 
//   method?: string | {method:string, aspect:string})
// {
//   let item: iTestResultItem = {} ;

//   if ( typeof components == 'string')
//   {
//     item.passText = components;
//     item.failText = failText || '' ;
    
//     // name of method being tested. aspect of the method.
//     item.aspect = '' ;
//     if ( !method )
//       item.method = '' ;
//     else if ( typeof method == 'string')
//       item.method = method ;
//     else
//     {
//       item.method = method.method ;
//       item.aspect = method.aspect ;
//     }

//     testResultItem_ensurePassFail(item) ;
//     results_arr.push(item);
//   }
//   else
//   {
//     testResults_appendFromComponents( results_arr, components ) ;
//   }
// }

// // ------------------------ testResults_appendFromComponents ---------------------
// function testResults_appendFromComponents(
//                       results_arr: iTestResultItem[],
//                       components: iTestResultComponents )
// {
//   let item: iTestResultItem = {};
//   item.method = components.method || '' ;
//   item.aspect = components.aspect || '' ;
//   item.desc = components.desc || '' ;
//   item.text = item.desc ;
//   item.expected = components.expected ;
//   item.errmsg = components.errmsg || '' ;

//   item.actual = components.testResult;
//   if ( components.actual != undefined )
//     item.actual = components.actual ;

//   item.didFail = components.didFail || false ;
//   item.category = components.category || '' ;
//   item.startTime = components.startTime || new Date( ) ;
//   item.endTime = components.endTime || new Date( ) ;

//   // an errmsg of an error.  test did fail.
//   if ( !item.didFail && item.errmsg )
//   {
//     item.didFail = true ;
//   }

//   // set didFail flag based on test result.
//   if ( !item.didFail && item.expected != undefined && item.actual != undefined )
//   {
//     // expected and actual are arrays. compare arrays for equality.
//     if ( Array.isArray(item.expected) && Array.isArray(item.actual))
//     {
//       item.didFail = !(arr_compareEqual(item.expected, item.actual));
//     }

//     // expected and actual are objects. compare each property.
//     else if ( typeof item.expected == 'object' && typeof item.actual == 'object')
//     {
//       item.didFail = !(obj_propertyMatch(item.expected, item.actual));
//     }

//     else
//     {
//       item.didFail = !(item.expected == item.actual ) ;
//     }
//   }

//   if ( item.didFail )
//     item.passFail = 'fail' ;
//   else
//     item.passFail = 'pass' ;

//   results_arr.push(item);
// }

// --------------------------- testResults_consoleLog ---------------------------
export async function testResults_consoleLog(results_arr: iTestResultItem[])
{
  let passCount = 0;
  let failCount = 0;

  let reportLines: string[] = [];

  for (const item of results_arr)
  {
    const message = testResultItem_resultMessage(item);
    console.log(`${message}`);
    reportLines.push(message);

    // update count of total passed and total failed.
    if (item.didFail)
      failCount += 1;
    else
      passCount += 1;
  }

  // write out pass/fail summary
  let summaryLine = '';
  if (failCount > 0)
  {
    summaryLine = `test summary. ${failCount} failed. ${passCount} passed.`;
  }
  else if (passCount > 0)
    summaryLine = `test summary. All passed. ${passCount} tests passed.`;

  console.log(summaryLine);
  reportLines.push(summaryLine);

  await openTextLinesInBrowser(reportLines.join('\n'), 'test results', false);
}


// // --------------------------- testResults_consoleLog ---------------------------
// export async function testResults_consoleLog(results_arr: iTestResultItem[])
// {
//   let passCount = 0 ;
//   let failCount = 0 ;

//   let reportLines: string[] = [] ;

//   for (const item of results_arr)
//   {
//     const message = testResultItem_resultMessage(item) ;
//     console.log(`${message}`);
//     reportLines.push( message ) ;

//     // update count of total passed and total failed.
//     if ( item.passFail == 'fail')
//       failCount += 1 ;
//     else if ( item.passFail == 'pass')
//       passCount += 1 ;
//   }

//   // write out pass/fail summary
//   let summaryLine = '' ;
//   if ( failCount > 0 )
//   {
//     summaryLine = `test summary. ${failCount} failed. ${passCount} passed.`;
//   }
//   else if ( passCount > 0)
//     summaryLine = `test summary. All passed. ${passCount} tests passed.`;

//   console.log( summaryLine ) ;
//   reportLines.push( summaryLine ) ;

//   await openTextLinesInBrowser( reportLines.join('\n'), 'test results', false ) ;
// }

// ------------------------------- testResults_new -------------------------------
export function testResults_new(): iTestResultItem[]
{
  const results_arr: iTestResultItem[] = [];
  return results_arr;
}

// // -------------------------- testResultItem_ensurePassFail -----------------------
// function testResultItem_ensurePassFail( item: iTestResultItem )
// {
//   if ( !item.passFail)
//   {
//     if (item.failText)
//     {
//       item.passFail = 'fail' ;
//       item.text = item.failText ;
//     }
//     else if ( item.passText)
//     {
//       item.passFail = 'pass';
//       item.text = item.passText;
//     }
//     else 
//     {
//       const actualText = any_toString(item.actual);
//       const expectedText = any_toString(item.expected);
//       if ( actualText == expectedText )
//       {
//         item.passFail = 'pass' ;
//       }
//       else 
//         item.passFail = 'fail' ;
//     }
//   }
// }

// --------------------------- testResultItem_resultMessage -----------------------
export function testResultItem_resultMessage(item: iTestResultItem)
{
  // testResultItem_ensurePassFail(item);
  let method = (item.method) ? item.method + ' ' : '';
  const categoryText = item.category ? `${item.category} ` : '';
  const aspectText = item.aspect ? ` ${item.aspect}. ` : '';
  if (method && !aspectText)
    method = method.trimEnd() + '. ';

  let expectedText = '';
  if (item.didFail && item.expected)
  {
    expectedText = ` Result:${any_toString(item.actual)} Expected:${any_toString(item.expected)}`;
  }
  else if (!item.didFail && item.expected)
  {
    expectedText = `correct result: ${any_toString(item.expected)}`;
  }

  item.didFail = item.didFail == undefined ? true : item.didFail;

  const errmsg = item.errmsg ? item.errmsg.trimEnd() + ' ' : '';
  const message = `${item.didFail ? 'fail' : 'pass'} ${categoryText}${method}${aspectText}${errmsg}${expectedText}`;
  return message;
}


// // --------------------------- testResultItem_resultMessage -----------------------
// export function testResultItem_resultMessage( item: iTestResultItem )
// {
//   testResultItem_ensurePassFail(item);
//   let method = (item.method) ? item.method + ' ' : '';
//   const categoryText = item.category ? `${item.category} ` : '';
//   const aspectText = item.aspect ? ` ${item.aspect}. ` : '';
//   if (method && !aspectText)
//     method = method.trimEnd() + '. ';

//   let expectedText = '';
//   if (item.didFail && item.expected)
//   {
//     expectedText = ` Result:${any_toString(item.actual)} Expected:${any_toString(item.expected)}`;
//   }
//   else if ( !item.didFail && item.expected )
//   {
//     expectedText = `correct result: ${any_toString(item.expected)}`;
//   }

//   const errmsg = item.errmsg ? item.errmsg.trimEnd() + ' ' : '';
//   const message = `${item.passFail} ${categoryText}${method}${aspectText}${errmsg}${expectedText}`;
//   return message ;
// }
