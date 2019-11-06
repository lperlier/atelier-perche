/**
 * Delay function.
 * @param {value} ms Millisecondes.
 * @param {int} max Max number.
 * @returns {function} function Delayed function.
 */
export function delay(ms) {
  let ctr;
  let rej;
  const p = new Promise((resolve, reject) => {
    ctr = setTimeout(resolve, ms);
    rej = reject;
  });

  p.cancel = () => {
    clearTimeout(ctr);
    rej(Error('Cancelled'));
  };

  return p;
}

/**
 * Random number.
 * @param {int} min Min number.
 * @param {int} max Max number.
 * @returns {int} Random between the two numbers.
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Normalize value.
 * @param {int} value Min number.
 * @param {int} min Max number.
 * @param {int} max Max number.
 * @returns {int} Normalize between the two numbers.
 */
export function normalize(value, min, max) {
  return (value - min) / (max - min);
}

/**
* Returns a number whose value is limited to the given range.
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 * @param {int} value value
 * @param {int} min Min range
 * @param {int} max Max range
 * @returns {int} A number in the range [min, max]
 */
export function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

/**
 * Lerp value.
 * @param {int} v0 value 1.
 * @param {int} v1 value 2.
 * @param {int} t Time.
 * @returns {int} Lerp between.
 */
export function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

/**
* getPosition form top.
* @param {dom} element Dom Element
* @returns {obj} an Object with positions [x, y]
 */
export function getPosition(element) {
  let el = element;
  let xPosition = 0;
  let yPosition = 0;

  while (el) {
    xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
    yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    el = el.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}
