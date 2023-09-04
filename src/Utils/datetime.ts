interface ISODate {
  year: string,
  month: string,
  day: string,
}

const formatTimeMMSS = ( seconds: number ) => {
  const secs = ( seconds % 60 ).toString().padStart( 2, '0' );
  const mins = Math.floor( seconds / 60 ).toString().padStart( 2, '0' );
  return `${mins} : ${secs}`;
};

const normalizeDate = ( num: number, type: 'year' | 'month' | 'day' ) => {
  const padLength = [ 'month', 'day' ].includes( type ) ? 2 : 4;
  return num.toString().padStart( padLength, '0' );
};

const getISODate = ( date?: Date | string ): ISODate => {
  if( !date ) {
    date = new Date();
  } else if( typeof date === 'string' ) {
    date = new Date( date );
  }
  return {
    year: date.getUTCFullYear().toString().padStart( 4, '0' ),
    month: ( date.getUTCMonth() + 1 ).toString().padStart( 2, '0' ),
    day: date.getUTCDate().toString().padStart( 2, '0' ),
  };
};

const getISODateStr = ( date?: Date | string ) => {
  const dt = getISODate( date );
  return `${dt.year}-${dt.month}-${dt.day}`;
};

/**
 *
 * @param date Date to extrace for
 * @returns The date portion of ISO string i.e. "2022-07-29T23:32:04.988Z" to "2022-07-29"
 */
const extractDate = ( date: Date | string ) => {
  if( typeof date === 'string' ) {
    date = new Date( date );
  }
  return date.toISOString().substring( 0, 10 );
};

const getLocalISODate = ( date?: Date | string ) => {
  if( !date ) {
    date = new Date();
  } else if( typeof date === 'string' ) {
    date = new Date( date );
  }
  return {
    year: date.getFullYear().toString().padStart( 4, '0' ),
    month: ( date.getMonth() + 1 ).toString().padStart( 2, '0' ),
    day: date.getDate().toString().padStart( 2, '0' ),
  };
};

const getLocalISODateStr = ( date?: Date | string ) => {
  const dt = getLocalISODate( date );
  return `${dt.year}-${dt.month}-${dt.day}`;
};

export type dateDDMonthYYYY = string;
// Date to 21 May 2021
const convertDateTimeToDDMonthYYYY = ( date: Date ): dateDDMonthYYYY => {
  const day = date.getDate();
  const month = date.toLocaleString( 'default', { month: 'short' } );
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export type dateDDMonthYY = string;
// Date to 21 May'21
const convertDateTimeToDDMonthYY = ( date: Date ):dateDDMonthYY => {
  const day = date.getDate();
  const month = date.toLocaleString( 'default', { month: 'short' } );
  const year = date.getFullYear().toString().substring( 2 );
  return `${day} ${month}'${year}`;
};

// Date to 21-05-2021
const convertDateTimeToDDDashMMDashYYYY = ( date: Date ) => {
  const day = date.toLocaleString( 'default', { day: '2-digit' } );
  const month = date.toLocaleString( 'default', { month: '2-digit' } );
  const year = date.toLocaleString( 'default', { year: 'numeric' } );
  return `${day}-${month}-${year}`;
};

// Date to 21/5/2021
const convertDateTimeToDDSlashMMSlashYY = ( date: Date ) => {
  const day = date.toLocaleString( 'default', { day: '2-digit' } );
  const month = date.toLocaleString( 'default', { month: '2-digit' } );
  const year = date.toLocaleString( 'default', { year: '2-digit' } );
  return `${day}/${month}/${year}`;
};

// Date to 21 May
const convertDateTimeToDDMonth = ( date: Date ) => {
  const day = date.getDate();
  const month = date.toLocaleString( 'default', { month: 'short' } );
  return `${day} ${month}`;
};

// Date to 12:34 PM
const convertDateTimeToTimeMeridiem = ( date: Date ) => {
  const meridiem = date.getHours() >= 12 ? 'PM' : 'AM';
  const hour = ( date.getHours() % 12 ).toString().padStart( 2, '0' );
  const minutes = date.getMinutes().toString().padStart( 2, '0' );
  return `${hour}:${minutes} ${meridiem}`;
};

// Datetime to local date 2022-03-22
const convertDateTimeToDate = ( date?: Date | null ) => {
  date = date || new Date();
  const day = date.toLocaleString( 'default', { day: '2-digit' } );
  const month = date.toLocaleString( 'default', { month: '2-digit' } );
  const year = date.toLocaleString( 'default', { year: 'numeric' } );
  return `${year}-${month}-${day}`;
};

export {
  extractDate,
  convertDateTimeToTimeMeridiem,
  convertDateTimeToDate,
  convertDateTimeToDDMonth,
  convertDateTimeToDDMonthYYYY,
  convertDateTimeToDDMonthYY,
  convertDateTimeToDDSlashMMSlashYY,
  convertDateTimeToDDDashMMDashYYYY,
  getISODate,
  getISODateStr,
  getLocalISODate,
  getLocalISODateStr,
  formatTimeMMSS,
  normalizeDate,
};
