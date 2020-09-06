export default function AutoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    return {
        get() {
            return originalMethod.bind(this);
        },
    };
}
//# sourceMappingURL=AutoBind.js.map