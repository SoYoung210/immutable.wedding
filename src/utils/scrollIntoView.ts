export function scrollIntoView<ElementType extends HTMLElement>(
  el: ElementType,
  { offset = 0 }: { offset?: number } = {}
) {
  window.scrollTo({
    top:
      el.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      offset,
  });
}
