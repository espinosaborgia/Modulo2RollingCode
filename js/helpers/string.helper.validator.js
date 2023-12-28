function validateIfIsEmpty(string) {
  if (string === "" || string === null || string === undefined) {
    return true;
  }

  return false;
}

export { validateIfIsEmpty };
