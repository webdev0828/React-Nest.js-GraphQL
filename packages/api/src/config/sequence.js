const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    // Test structure information
    // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => {
      // Use [x].test.ts as order for test
      const regex = /\d/;
      const orderA = regex.exec(testA.path) ? regex.exec(testA.path)[0] : null;
      const orderB = regex.exec(testB.path) ? regex.exec(testB.path)[0] : null;

      // If no order indicated, move to the end
      if (!orderA) return 1;

      return (orderA > orderB ? 1 : -1);
    });
  }
}

module.exports = CustomSequencer;
