/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { toPairs } from 'lodash';
import { prop, equals, compose, pipe, allPass, filter, values, length, gte, __, not, all, count, countBy, identity } from 'ramda';

// get properties
const getStar = prop('star')
const getSquare = prop('square')
const getCircle = prop('circle')
const getTriangle = prop('triangle')

// compare to color
const isRed = equals('red')
const isBlue = equals('blue')
const isWhite = equals('white')
const isGreen = equals('green')
const isOrange = equals('orange')

const checkAllGreen = all(isGreen) 
const checkAllOrange = all(isOrange)

// shapes with color
const isStarRed = compose(isRed, getStar);
const isStarNotRed = compose(not, isStarRed);
const isStarNotWhite = compose(not, isWhite, getStar);

const isCircleBlue = compose(isBlue, getCircle);
const isCircleWhite = compose(isWhite, getCircle);

const isSquareGreen = compose(isGreen, getSquare);
const isSquareOrange = compose(isOrange, getSquare);

const isTriangleGreen = compose(isGreen, getTriangle); 
const isTriangleWhite = compose(isWhite, getTriangle);
const isTriangleNotWhite = compose(not, isTriangleWhite);

// filters 
const filterGreens = filter(isGreen);
const filterGreenValues = pipe(values, filterGreens);

// counters
const countGreens = pipe(filterGreenValues, length)
const countColors = pipe(values, countBy(identity));

const isAnyRed = compose(gte(__, 1), count(isRed), values)
const isTwoGreen = compose(equals(2), count(isGreen), values)

// helpers
const isRedBlueSameAmount = ({blue, red}) => blue === red;
const isTriangleAndSquareSame = ({triangle, square}) => triangle === square;
const filterNotWhiteAndGreaterThree = ([color, amount]) => color !== 'white' && amount >= 3

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([isTriangleWhite, isCircleWhite, isStarRed, isSquareGreen])      

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(countGreens,  gte(__, 2))     

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(isRedBlueSameAmount, countColors)

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isCircleBlue, isStarRed, isSquareOrange]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = pipe(countColors, toPairs, filter(filterNotWhiteAndGreaterThree), length, equals(1))

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. 
// Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isTriangleGreen, isTwoGreen, isAnyRed])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(checkAllOrange, values)

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isStarNotRed, isStarNotWhite])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(checkAllGreen, values)

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isTriangleNotWhite, isTriangleAndSquareSame])



