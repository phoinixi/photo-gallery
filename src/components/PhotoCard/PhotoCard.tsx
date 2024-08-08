import { Image, makeStyles, mergeClasses, Title3, tokens } from '@fluentui/react-components';
import { useCallback, useState } from 'react';
import {
  PHOTO_BASE_URL,
  PHOTO_EDIT_HEIGHT,
  PHOTO_EDIT_WIDTH,
  PHOTO_GALLERY_WIDTH,
  PLACEHOLDER_URL
} from '../../constants';
import { PhotoInfo } from '../../models/PhotoInfo.Model';

const useStyles = makeStyles({
  card: {
    background: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium
  },

  cardGallery: {
    cursor: 'pointer'
  },

  cardEditor: {
    height: `calc(${PHOTO_EDIT_HEIGHT}px + 56px)`,
    width: `${PHOTO_EDIT_WIDTH}px`
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${tokens.spacingHorizontalM}`
  },

  cardContent: {
    height: 'calc(100% - 56px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  photoEditor: {
    maxHeight: `${PHOTO_EDIT_HEIGHT}px`,
    maxWidth: `${PHOTO_EDIT_WIDTH}px`
  }
});

type PhotoCardProps = {
  mode: 'gallery' | 'editor';
  photo: PhotoInfo;
};

export function PhotoCard({ photo, mode }: PhotoCardProps) {
  const classes = useStyles();
  const [photoSrc, setPhotoSrc] = useState(
    mode === 'gallery' ? `${PLACEHOLDER_URL}/${PHOTO_GALLERY_WIDTH}` : undefined
  );

  const handleOnLoad = useCallback(() => {
    setPhotoSrc(`${PHOTO_BASE_URL}/${photo.id}/${PHOTO_GALLERY_WIDTH}.webp`);
  }, [photo.id]);

  return (
    <div className={mergeClasses(classes.card, mode === 'gallery' ? classes.cardGallery : classes.cardEditor)}>
      <div className={classes.cardHeader}>
        <Title3>{photo.author}</Title3>
        <Title3>#{photo.id}</Title3>
      </div>
      <div className={classes.cardContent}>
        <Image
          className={mode === 'editor' ? classes.photoEditor : undefined}
          loading="lazy"
          src={mode === 'gallery' ? photoSrc : photo.download_url}
          onLoad={handleOnLoad}
          alt={photo.author}
        />
      </div>
    </div>
  );
}

export default PhotoCard;
