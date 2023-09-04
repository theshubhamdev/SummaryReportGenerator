import { FileTypeEnum } from '@/Store/index.type';

const fileTypeFromMimeType = ( mimetype: string ): FileTypeEnum => {
  const FUNCTION_NAME = 'files.fileTypeFromMimeType';
  console.info( FUNCTION_NAME, 'BEGIN', mimetype );
  switch( mimetype ) {
    case 'image/bmp':
    case 'image/gif':
    case 'image/jpeg':
    case 'image/png':
    case 'image/tiff':
    case 'image/webp':
      return FileTypeEnum.Image;
    case 'application/vnd.google-apps.audio':
    case 'audio/mpeg':
    case 'audio/mpeg3':
    case 'audio/x-mpeg-3':
      return FileTypeEnum.Audio;
    case 'application/pdf':
    case 'application/vnd.google-apps.presentation':
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/mspowerpoint':
    case 'application/powerpoint':
    case 'application/x-mspowerpoint':
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.google-apps.document':
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return FileTypeEnum.Document;
    case 'application/zip':
    case 'application/vnd.rar':
      return FileTypeEnum.Other;
    case 'video/x-msvideo':
    case 'video/mpeg':
    case 'video/mp4':
    case 'video/ogg':
    case 'video/mp2t':
    case 'video/webm':
    case 'video/3gpp':
    case 'video/3gpp2':
      return FileTypeEnum.Video;
    default: {
      if( mimetype.indexOf( 'video' ) != -1 ) {
        return FileTypeEnum.Video;
      } else if( mimetype.indexOf( 'image' ) != -1 ) {
        return FileTypeEnum.Image;
      } else if( mimetype.indexOf( 'audio' ) != -1 ) {
        return FileTypeEnum.Audio;
      } else if( mimetype.indexOf( 'document' ) != -1 ) {
        return FileTypeEnum.Document;
      } else {
        console.warn( FUNCTION_NAME, mimetype );
        return FileTypeEnum.Other;
      }
    }
  }
};

const fileExtFromMimeType = ( mimetype: string ): string => {
  const FUNCTION_NAME = 'files.fileExtFromMimeType';
  console.info( FUNCTION_NAME, 'BEGIN', mimetype );
  switch( mimetype ) {
    case 'image/bmp':
      return 'bmp';
    case 'image/gif':
      return 'gif';
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/tiff':
      return 'tiff';
    case 'image/webp':
      return 'webp';
    case 'application/vnd.google-apps.audio':
    case 'audio/mpeg':
    case 'audio/mpeg3':
    case 'audio/x-mpeg-3':
      return 'mp3';
    case 'application/pdf':
      return 'pdf';
    case 'application/vnd.google-apps.presentation':
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/mspowerpoint':
    case 'application/powerpoint':
      return 'ppt';
    case 'application/x-mspowerpoint':
      return 'pptx';
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'xls';
    case 'application/vnd.google-apps.document':
    case 'application/vnd.google-apps.kix':
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'doc';
    case 'application/zip':
      return 'zip';
    case 'application/vnd.rar':
      return 'rar';
    case 'video/x-msvideo':
    case 'video/mpeg':
      return 'mpeg';
    case 'video/mp4':
      return 'mp4';
    case 'video/ogg':
      return 'ogg';
    case 'video/mp2t':
      return 'mp2t';
    case 'video/webm':
      return 'webm';
    case 'video/3gpp':
    case 'video/3gpp2':
      return '3gp';
    default:
      return 'bin';
  }
};

export {
  fileTypeFromMimeType,
  fileExtFromMimeType,
};
