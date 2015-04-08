require("../../prepare-tests.js");

describe("PreprocessorToExecutorIntegrationTest", function() {
    var Preprocessor, Executor; 

    before(function(done) {
        requirejs(["mod_preprocessor/Preprocessor", "mod_executor/Executor"], function(preprocessor, executor) {
	    Preprocessor = preprocessor;
            Executor = executor;
            done();
        });
    });

    [
        {
            description: "assign and add to global and local scope",
            file: "global-local-scope.json",
            expected: 5

            /*
                int a;

                int main() {
                    int b;
                    a=2;
                    b=3;
                    return a+b;
                }
            */
        },
        {
            description: "call a function with 2 numbers",
            file: "adder.json",
            expected: 6

            /*
                int add(int a, int b) {
                    return a+b;
                }

                int main() {
                    return add(4, 2);
                }
            */
        },
	{
	    description: "calculate 10th fibonacci number using recursion",
	    file: "fibonacci10th.json",
	    expected: 55

            /*
                int fib(int n) {
                    if (n == 0)
                        return 0;
                    if (n == 1)
                        return 1;
                    return fib(n-1) + fib(n-2);
                }

                int main() {
                    return fib(10);
                }
            */
	}
    ]
    .map(function(testCase) {
        it (testCase.description, function() {
            var asset = require("./assets/" + testCase.file);
	    var astToCfg = Preprocessor.createAstToCfg(asset);
	    var cfgAndVars = astToCfg.convert();
            var proc = Executor.createProcess(cfgAndVars.global, cfgAndVars.functions, cfgAndVars.values);
            expect(Executor.finish(proc)).to.equal(testCase.expected);
        });
    }.bind(this));
});
