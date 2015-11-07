module.exports = function binarySearch(arr, query, min, max) {
  min = typeof min === 'undefined' ? 0 : min;
  max = typeof max === 'undefined' ? arr.length : max;
  if (min > max) return -1;
  var mid = Math.floor((min + max) / 2);
  var val = arr[mid];
  if (val === query) {
    return mid;
  } else if (val > query) {
    return binarySearch(arr, query, min, mid - 1);
  } else {
    return binarySearch(arr, query, mid + 1, max);
  }
}
