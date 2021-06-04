## Getting Started

Requirements:
- yarn
- NodeJS

## Testing

```
yarn test
```

or, for development:

```
yarn test:watch
```

## Files

- `total-words.json` -> this is a helper data to help us identify how many words in a specific verse. We can use quran.com api later for a production use case. This is just make things simple for now

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

## Approach

The code is mostly written in functional paradigm, although it is not 100% pure.

The benefits of this approach 
- is the code is very easy to test. 
  It's just `f(x) = y`. We give the `x` input and we check the `y` output.
- easy to modularize the code. Because the code is mostly pure and easy to move around
- easy to debug
- easy to understand and digest, no need to hold many variables in our head. 

The cons:
- Performance, writing the code in functional paradigm, could sometimes be slower, because sometimes the loop and executed multiples times,
- it could also take more memory, because it doesn't favor immutable instead of mutating the variable

There are some optimization for this in functional programming community, like caching, memoization, etc. 

If the performance in certain part of the backend / operation becomes very critical. It could be a good idea, to make it mutable or even use faster language like Golang
