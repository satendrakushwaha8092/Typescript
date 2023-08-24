function check(n) {
  if (n == 1) return n;
  return n * check(n - 1);
}
console.log(check(5));
