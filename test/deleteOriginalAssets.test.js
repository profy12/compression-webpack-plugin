import Plugin from '../src/index';

import {
  compile,
  getAssetsNameAndSize,
  getCompiler,
  getErrors,
  getWarnings,
} from './helpers/index';

describe('"deleteOriginalAssets" option', () => {
  let compiler;

  beforeEach(() => {
    compiler = getCompiler('./entry.js');
  });

  it('matches snapshot for `true` value ({Boolean})', async () => {
    new Plugin({
      minRatio: 1,
      deleteOriginalAssets: true,
    }).apply(compiler);

    const stats = await compile(compiler);

    expect(getAssetsNameAndSize(stats)).toMatchSnapshot('assets');
    expect(getWarnings(stats)).toMatchSnapshot('errors');
    expect(getErrors(stats)).toMatchSnapshot('warnings');
  });

  it('matches snapshot for `false` value ({Boolean})', async () => {
    new Plugin({
      minRatio: 1,
      deleteOriginalAssets: false,
    }).apply(compiler);

    const stats = await compile(compiler);

    expect(getAssetsNameAndSize(stats)).toMatchSnapshot('assets');
    expect(getWarnings(stats)).toMatchSnapshot('errors');
    expect(getErrors(stats)).toMatchSnapshot('warnings');
  });
});
