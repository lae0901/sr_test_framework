import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import {testResults_append, testResults_consoleLog, testResults_new } from './index';

const folderPath = '/c:/github/tester';
const fileName = 'app.vue';

// run main function that is declared as async. 
async_main( ) ;

// ------------------------------- async_main ---------------------------------
async function async_main( )
{
  // primitive file test. create a file, write some text to it, close, then read
  // entire contents and match against what was written.
  {
    const { results } = await primitive_file_test() ;
    testResults_consoleLog( results ) ;
  }
}

// ---------------------------------- primitive_file_test ----------------------------------
// test primitive file functions.  open, write, close.
async function primitive_file_test()
{
  let method = '';
  let errmsg = '' ;
  const tempTestDir = path.join(os.tmpdir(), 'sr_core_ts');
  const testTextFile = path.join(tempTestDir, 'primitive-textFile.txt');
  const results = testResults_new() ;

  method = 'primitive_file_test' ;
  testResults_append( results, `get temp dir ${tempTestDir}`, errmsg, method ) ;

  {
    const aspect = 'delete temp dir';
    testResults_append( results, `temp dir ${tempTestDir}`, errmsg, {method,aspect});
  }

  return { results };
}
