function eulerApprox(initialX, initialY, finalX, stepSize, dydx, complexArray) {
  let newY = initialY;
  let newX = initialX;
  for (let i = 0; i < (finalX - initialX) / stepSize; i++) {
    newX += stepSize;
    newY += dydx(newX, newY, complexArray) * stepSize;
  }
  return newY;
}
function complexDerivative(ogFunction, complexArray, dz) {
	return divide(add(ogFunction(add(complexArray, dz)), multiply([-1, 0], ogFunction(complexArray))), dz);
}
function divide(numeratorArray, denominatorArray) {
  return [(numeratorArray[0] * denominatorArray[0] + numeratorArray[1] * denominatorArray[1]) / (denominatorArray[0] ** 2 + denominatorArray[1] ** 2), (numeratorArray[1] * denominatorArray[0] - numeratorArray[0] * denominatorArray[1]) / (denominatorArray[0] ** 2 + denominatorArray[1] ** 2)];
}
function multiply(firstArray, secondArray) {
  return [firstArray[0] * secondArray[0] - firstArray[1] * secondArray[1], firstArray[0] * secondArray[1] + firstArray[1] * secondArray[0]];
}
function reciprocal(complexArray) {
  return [complexArray[0] / (complexArray[0] ** 2 + complexArray[1] ** 2), -1 * complexArray[1] / (complexArray[0] ** 2 + complexArray[1] ** 2)];
}
function add(firstArray, secondArray) {
  return [firstArray[0] + secondArray[0], firstArray[1] + secondArray[1]];
}
function complexExp(complexArray) {
  return [Math.exp(complexArray[0]) * Math.cos(complexArray[1]), Math.exp(complexArray[0]) * Math.sin(complexArray[1])];
}
function complexLog(complexArray) {
  if (complexArray[0] < 0) {
    if (complexArray[1] < 0) {
      return [Math.log(getMagnitude(complexArray)), Math.atan(complexArray[1] / complexArray[0]) - Math.PI];
    }
    return [Math.log(getMagnitude(complexArray)), Math.atan(complexArray[1] / complexArray[0]) + Math.PI];
  }
  return [Math.log(getMagnitude(complexArray)), Math.atan(complexArray[1] / complexArray[0])];
}
function complexPower(complexArray, expArray) {
  return complexExp(multiply(expArray, complexLog(complexArray)));
}
/*function complexTetration(baseArray, tet) {
  if (tet == 0) return [1, 0];
  let total = baseArray;
  for(let i = 1; i < tet; i++) {
    total = complexPower(baseArray, total);
  }
  return total;
}
*/

//the following is the complex definition of all the trig and hyperbolig trig functions
function complexSin(complexArray) {
  return [(Math.exp(-1 * complexArray[1]) * Math.sin(complexArray[0]) + Math.exp(complexArray[1]) * Math.sin(complexArray[0])) / 2, (Math.exp(complexArray[1]) * Math.cos(complexArray[0]) - Math.exp(-1 * complexArray[1]) * Math.cos(complexArray[0])) / 2];
}
function complexCos(complexArray) {
  return [(Math.exp(-1 * complexArray[1]) * Math.cos(complexArray[0]) + Math.exp(complexArray[1]) * Math.cos(complexArray[0])) / 2, (Math.exp(-1 * complexArray[1]) * Math.sin(complexArray[0]) - Math.exp(complexArray[1]) * Math.sin(complexArray[0])) / 2];
}
function complexTan(complexArray) {
  return divide(complexSin(complexArray), complexCos(complexArray));
}
function complexCsc(complexArray) {
  return reciprocal(complexSin(complexArray));
}
function complexSec(complexArray) {
  return reciprocal(complexCos(complexArray));
}
function complexCot(complexArray) {
  return reciprocal(complexTan(complexArray));
}
function complexSinh(complexArray) {
  let noIArray = complexSin([complexArray[1], -1 * complexArray[0]]);
  return [-1 * noIArray[1], noIArray[0]];
}
function complexCosh(complexArray) {
  return complexCos([complexArray[1], -1 * complexArray[0]]);
}
function complexTanh(complexArray) {
  return divide(complexSinh(complexArray), complexCosh(complexArray));
}
function complexCsch(complexArray) {
  return reciprocal(complexSinh(complexArray));
}
function complexSech(complexArray) {
  return reciprocal(complexCosh(complexArray));
}
function complexCoth(complexArray) {
  return reciprocal(complexTanh(complexArray));
}
function complexArcSin(complexArray) {
  let cd = complexPower(add([1, 0], multiply([-1, 0], complexPower(complexArray, [2, 0]))), [0.5, 0]);
  let log = complexLog(add([-1 * complexArray[1], complexArray[0]], cd));
  return [log[1], -1 * log[0]];
}
function complexArcCos(complexArray) {
  let cd = complexPower(add(complexPower(complexArray, [2, 0]), [-1, 0]), [0.5, 0]);
  let log = complexLog(add(complexArray, cd));
  return [log[1], -1 * log[0]];
}
function complexArcTan(complexArray) {
  return complexArcSin(divide(complexArray, complexPower(add(complexPower(complexArray, [2, 0]), [1, 0]), [0.5, 0])));
}
function complexArcCsc(complexArray) {
  return complexArcSin(reciprocal(complexArray));
}
function complexArcSec(complexArray) {
  return complexArcCos(reciprocal(complexArray));
}
function complexArcCot(complexArray) {
  return add(multiply([-1, 0], complexArcTan(complexArray)), [Math.PI / 2, 0]);
}
function complexArcSinh(complexArray) {
  return complexLog(add(complexArray, complexPower(add(complexPower(complexArray, [2, 0]), [1, 0]), [0.5, 0])));
}
function complexArcCosh(complexArray) {
  return complexLog(add(complexArray, complexPower(add(complexPower(complexArray, [2, 0]), [-1, 0]), [0.5, 0])));
}
function complexArcTanh(complexArray) {
  return multiply([0.5, 0], add(complexLog(add([1, 0], complexArray)), multiply([-1, 0], complexLog(add([1, 0], multiply([-1, 0], complexArray))))));
}
function complexArcCsch(complexArray) {
  return complexArcSinh(reciprocal(complexArray));
}
function complexArcSech(complexArray) {
  return complexArcCosh(reciprocal(complexArray));
}
function complexArcCoth(complexArray) {
  return complexArcTan(reciprocal(complexArray));
}
//end of trig and hyperbolic trig functions

function realPartOfFactorial(x, y, complexArray) {
  return Math.exp(complexArray[0] * Math.log(x) - x) * Math.cos(complexArray[1] * Math.log(x));
}
function imaginaryPartOfFactorial(x, y, complexArray) {
  return Math.exp(complexArray[0] * Math.log(x) - x) * Math.sin(complexArray[1] * Math.log(x));
}
function complexFactorial(complexArray) {
  return [eulerApprox(0, 0, 20, 0.1, realPartOfFactorial, complexArray), eulerApprox(0, 0, 20, 0.1, imaginaryPartOfFactorial, complexArray)];
}
function complexAbs(complexArray) {
  return [Math.abs(complexArray[0]), Math.abs(complexArray[1])];
}
function complexRectMod(complexArray, modArray) {
  return [complexArray[0] % modArray[0], complexArray[1] % modArray[1]];
}
function complexRadialMod(complexArray, radialMod) {
  return createComplexArray(getMagnitude(complexArray) % radialMod, getAngle(complexArray));
}
function complexAngularMod(complexArray, angularMod, isDegree = true) {
  let d = isDegree ? 1 : Math.PI / 180;
  return createComplexArray(getMagnitude(complexArray), (getAngle(complexArray) * d) % angularMod, isDegree);
}
function realConj(complexArray) {
  return [complexArray[0], -1 * complexArray[1]];
}
function imConj(complexArray) {
  return [complexArray[1], complexArray[0]];
}
function iterative(xArray, aArray) {
  return add(xArray, divide(add(multiply(aArray, complexExp(multiply([-1, 0], xArray))), multiply([-1, 0], xArray)), add([1, 0], xArray))); //x + ((a * Math.exp(-1 * x) - x) / (1 + x));
}
function complexLambertW(aArray, iterations) {
  let xOneArray = [0, 0];
  for (let i = 0; i < iterations; i++) {
    xOneArray = iterative(xOneArray, aArray);
  }
  return xOneArray;
}
function complexInvLambertW(complexArray) {
  return multiply(complexArray, complexExp(complexArray));
}
function createComplexArray(radius, angle, isDegree = true) {
  let complexArray = isDegree ? [radius * Math.cos(angle * Math.PI / 180), radius * Math.sin(angle * Math.PI / 180)] : [radius * Math.cos(angle), radius * Math.sin(angle)];
  return complexArray;
}
function getAngle(complexArray) {
  let angle = Math.atan(complexArray[1] / complexArray[0]) * 180 / Math.PI;
  if (complexArray[0] < 0) angle += 180;
  if (angle < 0) angle += 360;
  return angle;
}
function getRad(complexArray) {
  let angle = Math.asin(complexArray[1] / getMagnitude(complexArray));
  if (complexArray[0] < 0) angle += Math.PI - 2 * angle;
  return angle;
}
function getMagnitude(complexArray) {
  return Math.sqrt(complexArray[0] ** 2 + complexArray[1] ** 2);
}
var goldenRatio = [(1 + Math.sqrt(5)) / 2, 0]

//ignores magnitude and gives every point the brightness of ignoreCap
let ignoreMagnitude = false;
let ignoreCap = 100;
//limits magnitude to limitCap
let limitMagnitude = true;
let limitCap = 100;

function eq(complexArray) {
  //return complexLambertW(complexArray, 20);
  return complexDerivative((x) => {return complexTanh(complexTan(x));}, complexArray, [0.01, 0]);
}
/*
Favorite Functions:
complexTanh(complexTan(complexArray));
complexTanh(multiply(complexTanh(complexArray),complexTan(complexArray)));
add(complexTan(complexArray), complexCos(complexArray));
complexTanh(complexExp(complexTan(complexArray)));
complexTanh(reciprocal(complexCos(multiply(complexArray, complexTan(complexArray)))));
complexTanh(complexSin(multiply(complexArray, complexCos(complexArray))));
complexTanh(complexSin(complexCosh(complexTan(complexSinh(complexCos(complexArray))))));
complexTanh(complexSin(complexArcCos(complexTan(complexArcSin(complexCosh(complexArcTan(complexSinh(complexCos(complexArray)))))))));
complexTanh(complexSin(complexArcCos(complexArcTanh(complexSinh(complexCos(complexArcTan(complexArcSinh(complexCosh(complexTan(complexArcSin(complexArcSinh(complexArray))))))))))));
complexSin(divide([1, 0], complexSin(divide([1, 0], complexSin(divide([1, 0], complexSin(divide([1, 0], complexSin(divide([1, 0], complexSin(divide([1, 0], complexSin(divide([1, 0], complexSin(divide([1, 0], complexArray))))))))))))))));
complexCos(divide([1, 0], complexCos(divide([1, 0], complexCos(divide([1, 0], complexCos(divide([1, 0], complexCos(divide([1, 0], complexCos(divide([1, 0], complexCos(divide([1, 0], complexCos(divide([1, 0], complexArray))))))))))))))));
divide([1, 0], complexTanh(divide([1, 0], complexSin(divide([1, 0], complexArcCos(divide([1, 0], complexArcTanh(divide([1, 0], complexSinh(divide([1, 0], complexCos(divide([1, 0], complexArcTan(divide([1, 0], complexArcSinh(divide([1, 0], complexCosh(divide([1, 0], complexTan(divide([1, 0], complexArcSin(divide([1, 0], complexArcCosh(complexArray))))))))))))))))))))))));
complexRectMod(complexArray, complexPower(complexArray, [0.5, 0]));
complexRectMod(complexArray, complexLog(complexArray));
complexRectMod(complexSinh(complexArray), complexArray);
complexRectMod(reciprocal(complexSin(complexArray)), complexArray);
complexRectMod(complexPower(complexArray, [100, 0]), complexArray);
complexRectMod(complexRectMod(complexPower(complexArray, [2, 0]), complexArray), complexPower(complexArray, [0.5, 0]));
complexRectMod(complexPower(complexSin(complexArray), [2, 0]), complexSin(complexArray));
complexRectMod([complexArray[1], complexArray[0]], complexArray);
complexRadialMod(complexArray, getMagnitude(complexLog(complexArray)));
complexRadialMod(divide(multiply(add(complexArray, [-1, 0]), complexPower(add(complexArray, [-2, -1]), [2, 0])), add(complexPower(complexArray, [2, 0]), [2, 2])), 3);
complexDerivative((x) => {return complexLambertW(x, 20);}, complexArray, [0.01, 0]);
*/
let precision = 0.01;
let luminosity = 1;
let leftBound = -3 * Math.PI;
let rightBound = 3 * Math.PI;
let lowerBound = -3 * Math.PI;
let upperBound = 3 * Math.PI;
const ctx = canvas.getContext("2d");
function scale(width, height = 0) {
  height = height ? height : width
  canvas.style.width = width * 1000 + "%";
  canvas.style.height = height * 1000 + "%";
  ctx.scale(width, height);
}

function createPixel(x, y, hue, brightness) {
  ctx.fillStyle = "hsl(" + hue + ", 100%, " + brightness + "%)";
  ctx.fillRect(x, y, 1, 1);
}

//scale(0.4); //honestly better without it for now
for (let i = 0; i * precision <= rightBound - leftBound; i++) {
  for (let j = 0; j * precision <= upperBound - lowerBound; j++) {
    let array = eq([leftBound + i * precision, lowerBound + j * precision]);
    createPixel(i, upperBound / precision - lowerBound / precision - j, getAngle(array), (ignoreMagnitude) ? ignoreCap / 2 : (limitMagnitude) ? limitCap * Math.atan(luminosity * getMagnitude(array)) / Math.PI : getMagnitude(array) * luminosity);
  }
}

function testNum() {
  let a = parseFloat(document.getElementById("aInput").value);
  let b = parseFloat(document.getElementById("bInput").value);
  let answer = document.getElementById("answer");
  let ans = eq([a, b]);
  console.log(ans);
  answer.innerHTML = "Answer: " + ans[0] + " + " + ans[1] + "i";
}
