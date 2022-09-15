if (window.isCMS) {
  document.addEventListener('DOMContentLoaded', function () {
    var regions = document.querySelectorAll('.cms-editable')
    var i
    for (i = 0; i < regions.length; i++) {
      regions[i].addEventListener('ready', function () {
        Prism.highlightAllUnder(regions[i])
      })
      regions[i].addEventListener('render', function (event) {
        if (event.target.classList.contains('cms-code')) {
          Prism.highlightAllUnder(regions[i])
        }
      })
    }
  })
} else {
  Prism.highlightAll()
}
