export default function classNames(...cssClasses: string[]) {
  return { className: cssClasses.join(" ") };
}
