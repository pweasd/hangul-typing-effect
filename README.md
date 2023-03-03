# hangul-typing-effect

![typing-effect](https://user-images.githubusercontent.com/36907203/222650128-c779245a-5791-4a5f-8cd4-de1d11e53400.gif)

hangul-typing-effect는 한글이 포함된 문자열을 분리하여 타이핑 하듯이 출력하는 javascript library 입니다.

## Use case

자바스크립트 코드에서 전역에 노출된 HangulTyping 객체를 통해 접근 할 수 있습니다.

```javascript
HangulTyping; // window.HangulTyping
```

### HangulTyping.split(text: string)

`HangulTyping.split`은 한글이 포함된 문자열을 각각 분리하고 합친 문자들의 배열로 반환합니다. 이 때 한글이 아닌 문자는 그대로 반환됩니다.

```javascript
test('split hangul + english sentence', () => {
  const sentence = `인생은 'B'와 'D'사이의 'C'이다.`;
  const received = hangulTyping.split(sentence);
  const expected = [
    ['ㅇ', '이', '인'],
    ['ㅅ', '새', '생'],
    ['ㅇ', '으', '은'],
    ' ',
    "'",
    'B',
    "'",
    ['ㅇ', '와', ''],
    ' ',
    "'",
    'D',
    "'",
    ['ㅅ', '사', ''],
    ['ㅇ', '이', ''],
    ['ㅇ', '의', ''],
    ' ',
    "'",
    'C',
    "'",
    ['ㅇ', '이', ''],
    ['ㄷ', '다', ''],
    '.',
  ];

  expect(received).toStrictEqual(expected); // True
});
```

### HangulTyping.typing(element: HTML element, text: string, speed: number)

`HangulTyping.typing`은 입력받은 문자열(text)을, 인수로 받은 element에 타이핑 하듯이 출력합니다. speed는 타이핑 하는 속도로써 `ms`단위 입니다.

Demo Link: https://pweasd.github.io/hangul-typing-effect
