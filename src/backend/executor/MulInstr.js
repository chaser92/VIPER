define(["./TypeCheck"], function(tc) {

    function MulInstr() {

    }

    MulInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a1 * a2);
    };

    MulInstr.prototype.toString = function toString() {
        return "MUL";
    };

    return MulInstr;
    
});
