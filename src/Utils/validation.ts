const isNaUN = <T>( obj: T ): obj is NonNullable<T> => {
  return obj !== null && obj !== undefined;
};

export {
  isNaUN,
};
