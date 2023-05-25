import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { testResults_append, iTestResultItem } from 'sr_core_ts';
import { testResults_consoleLog, testResultItem_resultMessage } from './index.js';

const folderPath = '/c:/github/tester';
const fileName = 'app.vue';

// run main function that is declared as async. 
async_main();

// ------------------------------- async_main ---------------------------------
async function async_main()
{
  const results: iTestResultItem[] = [];

  resultItem_test(results);

  await testResults_consoleLog(results);
}

function resultItem_test(results: iTestResultItem[])
{
  {
    const dummy: iTestResultItem[] = [];
    testResults_append(dummy, { expected: '35', actual: '35', method: 'framework', })
    const result_item = dummy[0];
    const actual = testResultItem_resultMessage(result_item);
    const expected = 'pass framework. correct result: 35';
    const method = 'testResultItem_resultMessage';
    const aspect = 'show expected value when test passes.';
    testResults_append(results, { expected, actual, method, aspect });
  }
}

