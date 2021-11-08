const utilities = {
  checkEquality: (arr, obj) => {
    for (const e of arr) {
      if (e.id === obj.id) {
        return true;
      }
    }
  },
  unique: (arr, contentType, favMovies, favSeries) => {
    const array = Array.from(arr);
    const ids = [];

    const favArray = Array.from(contentType ? favMovies : favSeries);
    const favIds = favArray.map((x) => x.id);

    const noDuplicates = array.map((x) => {
      if (x && !ids.includes(x.id) && !favIds.includes(x.id)) {
        ids.push(x.id);
        return x;
      }
    });
    const noUndefined = noDuplicates.filter((x) => x != undefined);

    return noUndefined;
  },
  shuffle: (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  },
  timeConvert: (n) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    if (!rhours) {
      return `${rminutes}min`;
    } else {
      return `${rhours}h ${rminutes}min`;
    }
  },
};

export default utilities;
