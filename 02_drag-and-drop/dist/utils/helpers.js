export function validate(input) {
    switch (typeof input.value) {
        case "string":
            if (input.required && !input.value.trim().length)
                return false;
            if (!input.required && input.value) {
                if (input.minLength && input.minLength > input.value.trim().length)
                    return false;
                if (input.maxLength && input.maxLength < input.value.trim().length)
                    return false;
            }
            return true;
        case "number":
            if (!input.required)
                return true;
            if (input.required && !input.value)
                return false;
            if (input.min && input.min > input.value)
                return false;
            if (input.max && input.max < input.value)
                return false;
            return true;
        default:
            return true;
    }
}
//# sourceMappingURL=helpers.js.map