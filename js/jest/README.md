```js
// jest stuff i can never remember...

describe("an async test", () => {
  // testing async happy path
  test('it works', async () => {
    const data = await getData();
    expect(data).toEqual("my data");
  });

  // async sad path
  test('it throws', async () => {
    expect.assertions(1);  // checks to make sure catch block was ran
    try {
      const data = await getData("bad");
    } catch (e) {
      // if the error was never thrown this will never run
      // so this is not enough to assert on existence of an error
      expect(e).toEqual("some error message")
    }
  });
});
```
