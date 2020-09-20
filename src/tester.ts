import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import {testResults_append, testResults_consoleLog, testResults_new, iTestResultItem } from './index';

const folderPath = '/c:/github/tester';
const fileName = 'app.vue';

// run main function that is declared as async. 
async_main( ) ;

// ------------------------------- async_main ---------------------------------
async function async_main( )
{
  const results = testResults_new();

  // primitive file test. create a file, write some text to it, close, then read
  // entire contents and match against what was written.
  {
    await primitive_file_test( results ) ;
  }

  components_test( results ) ;

  array_test( results ) ;

  testResults_consoleLog(results);
}

// ---------------------------------- primitive_file_test ----------------------------------
// test primitive file functions.  open, write, close.
async function primitive_file_test( results: iTestResultItem[] )
{
  let method = '';
  let errmsg = '' ;
  const tempTestDir = path.join(os.tmpdir(), 'sr_core_ts');
  const testTextFile = path.join(tempTestDir, 'primitive-textFile.txt');

  method = 'primitive_file_test' ;
  testResults_append( results, `get temp dir ${tempTestDir}`, errmsg, method ) ;

  {
    const aspect = 'delete temp dir';
    testResults_append( results, `temp dir ${tempTestDir}`, errmsg, {method,aspect});
  }
}

// -------------------------------- components_test --------------------------------
function components_test( results: iTestResultItem[] )
{
  testResults_append( results, { expected:'25', method:'framework', aspect:'startup', desc:'debug framework' })

  {
    const dummy = testResults_new();
    testResults_append( dummy, { expected:'25', testResult:'35', method:'framework', aspect:'didFailFlag', desc:'set did fail flag' })
    const result_item = dummy[0] ;
    const expected = 'Y' ;
    const testResult = result_item.didFail ? 'Y' : 'N' ;
    const method = 'testResults' ;
    const desc = 'auto set from expected and testResult' ;
    const aspect = 'expected';
    testResults_append(results, { expected, testResult, method, aspect, desc });
  }
}

// -------------------------------- array_test --------------------------------
// test where expected and testResult values are stored in arrays.
function array_test(results: iTestResultItem[])
{
  const dummy = testResults_new();

  // run test against arrays that should pass.
  {
    const expected = ['national', 25, 'framework'];
    const testResult = ['national', 25, 'framework'];
    const method = 'array_test' ;
    testResults_append( dummy,
      {
        expected, method, aspect: 'pass result',
        desc: 'test that passes'
      });
    }
    
  // read back from testResults array. 
  {
    const expected = 'pass' ;
    const category = 'array' ;
    const testResult = dummy[0].passFail;
    const method = 'testResults_append' ;
    testResults_append(results, 
            { category, expected, method, aspect: 'pass result', 
              desc: 'test that array test passes' });
  }

  // run test against arrays that should fail.
  {
    const expected = ['national', 25, 'framework'];
    const testResult = ['national', 25, true];
    const method = 'array_test';
    testResults_append(dummy,
      {
        expected, method, aspect: 'fail result',
        desc: 'test that should fail'
      });
  }

  // read back from testResults array. 
  {
    const expected = 'fail';
    const category = 'array';
    const testResult = dummy[1].passFail;
    const method = 'testResults_append';
    testResults_append(results,
    {
      category, expected, method, aspect: 'fail result',
      desc: 'test that array test fails'
    });
  }
}
