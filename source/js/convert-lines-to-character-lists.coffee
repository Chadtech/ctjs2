module.exports = (lines) ->
  lineIndex = 0
  while lineIndex < lines.length
    thisLine = []
    for word in lines[ lineIndex ]
      for character in word
        thisLine.push character
    lines[ lineIndex ] = thisLine
    lineIndex++

  lines