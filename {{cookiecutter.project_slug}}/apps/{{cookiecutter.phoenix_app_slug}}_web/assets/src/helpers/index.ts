/* tslint:disable */
export const normalizeArrayData = function(array: any, idProperty = "id") {
  return array.reduce((map: any, obj: any) => {
    map[idProperty] = { ...obj } // eslint-disable-line no-param-reassign
    return map
  }, {})
}
/* tslint:enable */
