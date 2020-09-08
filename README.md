# typescript testing framework

## interfaces
* iTestResultItem
```
export interface iTestResultItem
{
  // passFail and text are deprecated.  use simpler passText and failText.
  passFail?: PassFail,
  text?: string,

  passText?: string,
  failText?: string,

  method?: string  // name of function being tested.
}
```

## tester methods
* testResults_consoleLog( iTestResultItem[] )
* testResults_append( iTestResultItem[], passText, failText, method )
  * method argument can be object with method and aspect properties.
* testResults_append( results, { expected, testResult, method, aspect, desc, didFail })

* iTestResultItem[] = testResults_new( )

## publish instructions
* increment version number in package.json
* npm run build
* npm run test
* git add, commit, push to repo
* npm publish
* npm update in projects which use this package

## testing 
* npm run test
* or press F5, run task "run tester"
