/**
 * FixType - Types of fixes that can be applied
 */

export enum FixType {
  RENAME = 'rename',
  MOVE = 'move',
  REFACTOR = 'refactor',
  ADD_IMPORT = 'add_import',
  REMOVE_IMPORT = 'remove_import',
  MODIFY_CODE = 'modify_code'
}
