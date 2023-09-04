import clonedeep from 'lodash.clonedeep';
import { ValueType } from 'react-native-dropdown-picker';

import { RoleEnum } from '@/Store/Management/index.type';

const isNaUN = <T>( obj: T ): obj is NonNullable<T> => {
  return obj !== null && obj !== undefined;
};

const isDummyUuid = ( uuid?: string ): boolean => {
  if( !uuid ) {
    return true;
  }
  return uuid.indexOf( 'dummy-uuid-' ) !== -1;
};

const isArrayEqual = <T extends ValueType>( arr1: T[] | null, arr2: T[] | null ): boolean => {
  if( arr1 === arr2 ) {
    return true;
  }
  if( arr1 === null || arr2 === null ) {
    return false;
  }
  if( arr1.length !== arr2.length ) {
    return false;
  }

  // Sort the array and then check.
  arr1 = clonedeep( arr1 ).sort();
  arr2 = clonedeep( arr2 ).sort();

  for( let arrIdx = 0; arrIdx < arr1.length; ++arrIdx ) {
    if( arr1[ arrIdx ] !== arr2[ arrIdx ] ) {
      return false;
    }
  }
  return true;
};

const isStaff = ( role: RoleEnum | undefined | null ): boolean => {
  return !!role && [ RoleEnum.OWNER, RoleEnum.SUPERADMIN, RoleEnum.SCHOOLMANAGEMENT, RoleEnum.BRANCHSUPERADMIN, RoleEnum.PRINCIPAL, RoleEnum.BRANCHADMIN, RoleEnum.BRANCHMANAGEMENT, RoleEnum.TEACHER ].includes( role );
};

const isBranchStaff = ( role: RoleEnum | undefined | null ): boolean => {
  return !!role && [ RoleEnum.BRANCHSUPERADMIN, RoleEnum.PRINCIPAL, RoleEnum.BRANCHADMIN, RoleEnum.BRANCHMANAGEMENT, RoleEnum.TEACHER ].includes( role );
};

const isNonTeachingStaff = ( role: RoleEnum | undefined | null ): boolean => {
  return !!role && [ RoleEnum.OWNER, RoleEnum.SUPERADMIN, RoleEnum.SCHOOLMANAGEMENT, RoleEnum.BRANCHSUPERADMIN, RoleEnum.PRINCIPAL, RoleEnum.BRANCHADMIN, RoleEnum.BRANCHMANAGEMENT ].includes( role );
};

const isTeacher = ( role: RoleEnum | undefined | null ): boolean => {
  return !!role && [ RoleEnum.TEACHER ].includes( role );
};

const isParent = ( role: RoleEnum | undefined | null ): boolean => {
  return !!role && [ RoleEnum.PARENT, RoleEnum.STUDENT ].includes( role );
};

export {
  isNaUN,
  isDummyUuid,
  isArrayEqual,
  isStaff,
  isBranchStaff,
  isNonTeachingStaff,
  isTeacher,
  isParent,
};
