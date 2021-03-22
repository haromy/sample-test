function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

const limit = 2097152 // 2MB;

const randomGenerate = async () => {
  let array = '';
  let start = 0;
  while (start < limit) {
    let length = 0;
    let char = '';
    let int = Math.floor(Math.random() * 4);
    if (start < (limit - 10)) {
      length = Math.floor(Math.random() * (20 - 5 + 1) + 5);
    }
    else if (start > (limit - 10) && start < limit) {
      length = (limit - start);
      int = Math.floor(Math.random() * 3);
    }
    switch (int) {
      case 0: {
        char = randomString(length, 'abcdefghijklmnopqrstuvwxyz');
        break;
      }
      case 1: {
        char = Number(randomString(length, '1234567890'));
        break;
      }
      case 2: {
        // array.push();
        char = randomString(length, '1234567890abcdefghijklmnopqrstuvwxyz');
        break;
      }
      case 3: {
        const dividen = Math.pow(10, Math.floor(Math.random() * length + 1));
        char = Number(randomString(length, '1234567890')) / dividen;
        // array.push(num);
        break;
      }
      default: {
        break;
      }
    }
    const insert = `${char},`;
    array += insert;
    start += (insert.length);
  }
  return array;
}

module.exports = {
  randomGenerate
};