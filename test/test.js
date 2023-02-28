const hangulTyping = require('../hangulTypingEffect');

test('split english text', () => {
  const english = 'abcde';
  const received = hangulTyping.split(english);
  const expected = ['a', 'b', 'c', 'd', 'e'];

  expect(received).toStrictEqual(expected);
});

test('split hangul text', () => {
  const hangul = '안녕하세요';
  const received = hangulTyping.split(hangul);
  const expected = [
    ['ㅇ', '아', '안'],
    ['ㄴ', '녀', '녕'],
    ['ㅎ', '하', ''],
    ['ㅅ', '세', ''],
    ['ㅇ', '요', ''],
  ];

  expect(received).toStrictEqual(expected);
});

test('split other text', () => {
  const other = '123!@#';
  const received = hangulTyping.split(other);
  const expected = ['1', '2', '3', '!', '@', '#'];

  expect(received).toStrictEqual(expected);
});

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

  expect(received).toStrictEqual(expected);
});
