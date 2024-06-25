export async function resolve(specifier, context, next) {
  const nextResult = await next(specifier, context);
  if (!specifier.endsWith('.scss')) return nextResult;

  return {
    format: 'scss',
    shortCircuit: true,
    url: nextResult.url,
  };
}

export async function load(url, context, next) {
  const nextResult = await next(url, context);
  if (context.format !== 'scss') return nextResult;

  return {
    format: 'module',
    shortCircuit: true,
    url: '',
  };
}
