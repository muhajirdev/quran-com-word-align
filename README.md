# Files

- total-words.json -> this is a helper file to help us identify how many words in a specific verse. We can use quran.com api later for a production use case. This is just make things simple for now

## How it works

1. We get all the keys (surah:ayah)
2. For each key, we find their pageNumber and their word position

### Each ayah is devided into 2 category:

- Explicit Ayah => This is the ayah that's explicitly mentioned in the lines for example [1,5,0] => This means surah `1` and ayah `5` is explicitly mentioned in `page-ayah.json`
- Implicit Ayah => This is like `1:4` surah 1 ayah 4, it's not mentioned, it's skipped in `page-ayah.json`. The ayah is there, but implicit

Implicit ayah is usually a short ayah. So it never made it to the beginning of the line


### Explicit Ayah

If the ayah, is explicit ayah:
We just loop the lines and look for 3 things
- the ayah found in this line, but start at previous line
- the ayah found in this line, and still continue till the end of this line
- the ayah found in this line, and stopped in this line

Combine that information with `total-words.json`, we can get the words position for each ayah

### Implicit Ayah

For this one basicly, we just try to find if this ayah is found between current line and next line
If it's found. We just record their positions and their total words in the current line