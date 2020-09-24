# typescript testing framework

## interfaces
* iTestResultItem
```
export interface iTestResultItem
{
  expected?: string,
  actual?: string,
  category?: string,
  method?: string,
  aspect?: string,
  desc?: string
}
```

## tester methods
* testResults_consoleLog( iTestResultItem[] )
* testResults_append( iTestResultItem[], passText, failText, method )
  * method argument can be object with method and aspect properties.
* testResults_append( results, { expected, results, method, aspect, desc, didFail })

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
