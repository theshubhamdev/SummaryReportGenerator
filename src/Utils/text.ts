interface IPersonDetail {
  firstName: string,
  middleName?: string,
  lastName?: string,
}

interface ICountryPhNum {
  phNum: string,
  code: string,
}

const SCALE_F = 1.08;
const SCALE_C = 1.75;

const figmaDimenToRN = ( dimen: number ) => {
  return dimen * SCALE_F;
};

const canvaDimenToRN = ( dimen: number ) => {
  return dimen * SCALE_C;
};

const wordIntial = ( text: string ): string => {
  return text?.toUpperCase().charAt( 0 );
};

const wordIntials = ( text: string ): string => {
  return text?.toUpperCase().split( ' ' ).reduce( ( prevInitial, currInitial ) => prevInitial + currInitial.length ? currInitial.charAt( 0 ) : '', '' );
};

const capitalizeFirstLetter = ( str: string ): string => {
  str = str.toLowerCase();
  const words = str.split( ' ' );
  const capitalizedWords = words.map( word => {
    return word.charAt( 0 ).toUpperCase() + word.slice( 1 );
  } );
  return capitalizedWords.join( ' ' );
};

const convertNumToAlphabet = ( num: number ): string => {
  return String.fromCharCode( 65 + ( num % 26 ) );
};

const getName = ( person: IPersonDetail | string | undefined ): string => {
  if( !person ) {
    return person || '';
  }
  if( typeof person === 'string' ) {
    return person;
  }
  const { firstName, middleName, lastName } = person;
  const name = [ firstName, middleName || '', lastName || '' ].map( pName => pName?.trim().toLowerCase() ).filter( personName => !!personName ).map( pName => pName.charAt( 0 ).toUpperCase() + pName.slice( 1, pName.length ) ).join( ' ' );
  return name;
};

const getFirstLastName = ( person: IPersonDetail | undefined ): string => {
  if( !person ) {
    return person || '';
  }
  const { firstName, lastName } = person;
  const name = [ firstName, lastName || '' ].map( pName => pName?.trim().toLowerCase() ).filter( personName => !!personName ).map( pName => pName.charAt( 0 ).toUpperCase() + pName.slice( 1, pName.length ) ).join( ' ' );
  return name;
};

const explodeName = ( name: string ): IPersonDetail => {
  const nameTokens = name.split( ' ' );

  while( nameTokens.length < 3 ) {
    // Add blank tokens.
    nameTokens.push( '' );
  }

  const user: IPersonDetail = {
    firstName: nameTokens[ 0 ],
    middleName: nameTokens.slice( 1, -1 ).join( ' ' ),
    lastName: nameTokens[ nameTokens.length - 1 ],
  };

  return user;
};

const customSplit = ( str: string, maxLength: number ) => {
  if( str.length <= maxLength ) {
    return str;
  }
  const reg = new RegExp( '.{1,' + maxLength + '}', 'g' );
  const parts = str.match( reg );
  if( parts ) {
    return parts.join( '\n' );
  } else {
    return str;
  }
};

/**
 *
 * @param phNumInfo phone number info
 * @returns formatted phone number as "+91 9876543210"
 */
const formatPhNum = ( phNumInfo?: string | ICountryPhNum ): string => {
  if( !phNumInfo ) {
    return '';
  }
  if( typeof phNumInfo === 'string' ) {
    phNumInfo = decodeCountryCodeFromPhNum( phNumInfo );
  }
  if( phNumInfo.code ) {
    return `${phNumInfo.code} ${phNumInfo.phNum}`;
  }
  return phNumInfo.phNum;
};

const encodeCountryCodeInPhNum = ( countryPhNum?: ICountryPhNum ): string => {
  if( !countryPhNum ) {
    return '';
  }
  return `${countryPhNum.code}${countryPhNum.phNum}`;
};

const decodeCountryCodeFromPhNum = ( phNum?: string ): ICountryPhNum => {
  const countryPhNum: ICountryPhNum = {
    phNum: '',
    code: '',
  };
  if( !phNum ) {
    return countryPhNum;
  }
  if( phNum.indexOf( '+' ) !== -1 ) {
    if( phNum.startsWith( '+91' ) ) {
      // India.
      countryPhNum.phNum = phNum.replace( '+91', '' );
      countryPhNum.code = '+91';
    }
    // Other codes are unsupported at the moment.
  } else {
    // Without country code.
    countryPhNum.phNum = phNum;
    // Fallback to India code.
    countryPhNum.code = '+91';
  }
  return countryPhNum;
};

const amountToString = ( num: number ) => {
  const formatter = new Intl.NumberFormat( 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumSignificantDigits: 5,
  } );
  return formatter.format( num );
};

const getYouTubeVideoIdByUrl = ( url: string ): string | null => {
  const reg = /^(https?:)?(\/\/)?((www\.|m\.)?youtube(-nocookie)?\.com\/((watch)?\?(feature=\w*&)?vi?=|embed\/|vi?\/|e\/)|youtu.be\/)([\w\-]{10,20})/i;
  const match = url.match( reg );
  if( match ) {
    return match[ 9 ];
  } else {
    return null;
  }
};

export {
  figmaDimenToRN,
  formatPhNum,
  explodeName,
  capitalizeFirstLetter,
  canvaDimenToRN,
  convertNumToAlphabet,
  customSplit,
  getName,
  getFirstLastName,
  decodeCountryCodeFromPhNum,
  encodeCountryCodeInPhNum,
  wordIntial,
  wordIntials,
  amountToString,
  getYouTubeVideoIdByUrl,
};

