export default function module<T, Key extends keyof T>(arg: T, key: Key): void {
  console.log(arg[key]);
}
