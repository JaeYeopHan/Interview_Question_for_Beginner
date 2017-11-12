/* global hljs */
window.addEventListener('load', () => {
  document.querySelectorAll('pre>code').forEach(block => {
    hljs.highlightBlock(block)
  })

  const aside = document.querySelector('aside')
  document.querySelector('.more').addEventListener('click', () => {
    const display = aside.style.display

    aside.style.display = display !== 'inline-block' ? 'inline-block' : 'none'
  })
})
