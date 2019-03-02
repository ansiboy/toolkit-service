export let errors = {
    arugmentNull(name: string) {
        let msg = `Argument ${name} cannt be null or empty.`
        return new Error(msg)
    },
    argumentTypeError(name: string, exepectedType: string, actualType: string) {
        let msg = `Argument ${name} expected ${exepectedType} type, actual is ${actualType} type.`
    }
}