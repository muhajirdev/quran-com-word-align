var buildPage = function (pageId) {
  pageId = Number(pageId)
  var page = Surah.data.pages[pageId]
  var lines = page[0]
  var currentSurah = 0
  var charIndex = 0
  var content =
    '<div id="page-' + pageId + '" class="page" data-id="' + pageId + '">'

  lines.forEach(function (line, index) {
    // skip last virtual line
    if (index === lines.length - 1) {
      return
    }

    // if not current surah => add new page-surah container
    if (currentSurah !== line[0]) {
      if (currentSurah !== 0) {
        content += '</div>'
      }
      currentSurah = line[0]
      content +=
        '<div class="page-surah page-surah-' +
        currentSurah +
        ' ' +
        (Surah.id === currentSurah ? 'page-surah-active' : 'page-surah-other') +
        '" data-id="' +
        currentSurah +
        '">'
    }

    var lineHtml = '<div class="line line-' + pageId + '-' + index + '">'
    if (line.length === 1) {
      // surah name
      lineHtml +=
        '<img class="line-surah-name-bg" src="' +
        window.appData.assetsPath +
        'images/surah-name-background.png" alt="surah name background">'
      lineHtml +=
        '<div class="line-surah-name-text">سُورَةُ ' +
        QuranMetadata.SurahArabicName[line[0]] +
        '</div>'
    } else if (line[1] === 0) {
      // basmala
      var dataTrackIndexTag = line[0] === Surah.id ? 'data-track-index="0"' : ''
      lineHtml += '<div class="text-center h-100">'
      lineHtml +=
        '<div class="' +
        (line[0] === Surah.id ? 'ayah' : '') +
        ' line-basmala" ' +
        dataTrackIndexTag +
        '>'
      lineHtml +=
        '<img class="line-basmala-regular" src="' +
        window.appData.assetsPath +
        'images/basmala.svg" alt="basmala">'
      lineHtml +=
        '<img class="line-basmala-night" src="' +
        window.appData.assetsPath +
        'images/basmala-night.svg" alt="basmala">'
      lineHtml += '</div>'
      lineHtml += '</div>'
    } else {
      // quran text line
      var lineTextHtml = '<div class="line-text">'
      var lineFontHtml = '<div class="line-font" style="display:none;">'
      var text =
        line[0] === Surah.id
          ? Surah.data.text
          : Surah.data.other_text[line[0].toString()]
      var nextLine = lines[index + 1] // can be virtual(last) line
      // if next line in not in the same surah => modify the virtual line to be virtual also but for this surah

      if (line[0] !== nextLine[0]) {
        nextLine = [line[0], getTextLastAyah(text) + 1, 0]
      }

      // ayahs on the current line
      for (var ayahId = line[1]; ayahId <= nextLine[1]; ayahId++) {
        // if this ayah starts on the next line
        if (ayahId === nextLine[1] && nextLine[2] === 0) {
          break
        }

        var words = text[ayahId - 1].split(' ')

        // first and last words of this ayah on this line
        var firstWord = ayahId === line[1] ? line[2] : 0
        var lastWord = ayahId === nextLine[1] ? nextLine[2] - 1 : words.length
        var attrs = ''

        // if this line is on current surah => add track info
        if (line[0] === Surah.id) {
          attrs =
            'class="ayah" data-track-index="' +
            Utils.toTrackIndex(Surah.id, ayahId) +
            '" data-ayah-id="' +
            ayahId +
            '"'
        }

        lineTextHtml += '<span ' + attrs + '>'
        lineFontHtml += '<span ' + attrs + '>'
        for (var j = firstWord; j <= lastWord; j++) {
          if (j !== words.length) {
            var attrs2 =
              line[0] === Surah.id
                ? 'class="word-' + ayahId + '-' + j + '"'
                : ''
            // text
            lineTextHtml += '<span ' + attrs2 + '>' + words[j] + '</span> '
            // font:
            // check for not words
            while (page[2].includes(charIndex)) {
              lineFontHtml +=
                '<span class="mushaf-sign">' +
                String.fromCharCode(64577 + charIndex) +
                '&#x2006;</span><span class="line-font-whitespace"> </span>'
              charIndex++
            }
            // main word
            lineFontHtml +=
              '<span ' +
              attrs2 +
              '>' +
              String.fromCharCode(64577 + charIndex) +
              '</span><span class="line-font-whitespace"> </span>'
            charIndex++
            // check for combined words
            while (page[3].includes(charIndex)) {
              lineFontHtml +=
                '<span ' +
                attrs2 +
                '>' +
                String.fromCharCode(64577 + charIndex) +
                '</span><span class="line-font-whitespace"> </span>'
              charIndex++
            }
            // check for not words
            while (page[2].includes(charIndex)) {
              lineFontHtml +=
                '<span class="mushaf-sign">' +
                String.fromCharCode(64577 + charIndex) +
                '&#x2006;</span><span class="line-font-whitespace"> </span>'
              charIndex++
            }
          } else {
            // text
            lineTextHtml += Surah.getAyahNumber(ayahId)
            // font
            lineFontHtml +=
              '<span class="ayah-number">' +
              String.fromCharCode(64577 + charIndex) +
              '</span>'
            charIndex++
          }
        }
        lineTextHtml += '</span>'
        lineFontHtml += '</span>'
        // if last word on the ayah & there is another ayahs on this line => add a space
        if (
          lastWord === words.length &&
          !(ayahId + 1 === nextLine[1] && nextLine[2] === 0)
        ) {
          lineTextHtml += '<span> </span>'
          lineFontHtml += '<span class="line-font-whitespace"> </span>'
        }
      }
      lineTextHtml += '</div>'
      lineFontHtml += '</div>'
      lineHtml += lineTextHtml + lineFontHtml
    }
    lineHtml += '</div>'
    content += lineHtml
  })
  content += '</div>' // .page-surah
  content += '<div class="page-number pt-2 text-center">'
  content +=
    '<button type="button" class="page-nav-prev btn btn-sm btn-light text-primary-dark border">' +
    SVG_ICONS.fas['arrow-right'] +
    '</button>'
  content += '<span class="text-danger-dark mx-2">' + pageId + '</span>'
  content +=
    '<button type="button" class="page-nav-next btn btn-sm btn-light text-primary-dark border">' +
    SVG_ICONS.fas['arrow-left'] +
    '</button>'
  content += '</div>' // .page
  return content
}
