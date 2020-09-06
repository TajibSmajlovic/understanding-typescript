export default function AutoBind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  return {
    get() {
      return originalMethod.bind(this);
    },
  };
}
